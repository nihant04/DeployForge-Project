import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";
import { cookies } from "next/headers";
import { verifyToken, getSessionSecret } from "@/lib/auth";

const LOCAL_DB_PATH = path.join(process.cwd(), "src", "data", "contacts.json");

export async function GET(request: Request) {
  try {
    // Cryptographic Session Verification
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json(
        { success: false, error: "Access Denied: Session cookie missing." },
        { status: 401 }
      );
    }

    const payload = await verifyToken(sessionCookie.value, getSessionSecret());

    if (!payload || payload.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Access Denied: Invalid cryptographic session." },
        { status: 401 }
      );
    }

    // 1. Production Mode: MongoDB retrieval
    if (process.env.MONGODB_URI) {
      try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db("deployforge");
        const collection = db.collection("contacts");
        const contacts = await collection.find({}).sort({ createdAt: -1 }).toArray();
        await client.close();

        return NextResponse.json({
          success: true,
          source: "MongoDB Primary",
          count: contacts.length,
          contacts,
        });
      } catch (dbError: any) {
        console.error("MongoDB Retrieval Failed:", dbError);
        return NextResponse.json(
          { success: false, error: `MongoDB Retrieval Failed: ${dbError.message || "Unknown database error"}` },
          { status: 500 }
        );
      }
    }

    // 2. Production Mode: Vercel KV / Upstash Redis (REST API) retrieval
    const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    if (kvUrl && kvToken) {
      try {
        // Sanitize credentials to handle any accidental copy-paste quotes or whitespace
        const cleanKvUrl = kvUrl.trim().replace(/^"|"$/g, "");
        const cleanKvToken = kvToken.trim().replace(/^"|"$/g, "");

        const kvResponse = await fetch(cleanKvUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cleanKvToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(["LRANGE", "deployforge_contacts", "0", "-1"]),
        });

        if (kvResponse.ok) {
          const result = await kvResponse.json();
          const rawContacts = result.result || [];
          const contacts = rawContacts.map((c: string) => JSON.parse(c));

          return NextResponse.json({
            success: true,
            source: "Vercel KV Storage",
            count: contacts.length,
            contacts,
          });
        } else {
          const errText = await kvResponse.text();
          console.error("Upstash Redis Retrieve REST Error:", kvResponse.status, errText);
          return NextResponse.json(
            { 
              success: false, 
              error: `Upstash Redis Retrieve REST Error [${kvResponse.status}]: ${errText || "Invalid token or URL"}`,
              debug: {
                rawUrlLength: kvUrl?.length,
                rawUrlStart: kvUrl?.substring(0, 15),
                rawUrlEnd: kvUrl ? kvUrl.substring(kvUrl.length - 5) : "",
                rawTokenLength: kvToken?.length,
                rawTokenStart: kvToken?.substring(0, 6),
                rawTokenEnd: kvToken ? kvToken.substring(kvToken.length - 6) : "",
                cleanUrlLength: cleanKvUrl.length,
                cleanUrlStart: cleanKvUrl.substring(0, 15),
                cleanTokenLength: cleanKvToken.length,
                cleanTokenStart: cleanKvToken.substring(0, 6),
              }
            },
            { status: 500 }
          );
        }
      } catch (kvError: any) {
        console.error("Vercel KV Retrieval Failed:", kvError);
        return NextResponse.json(
          { 
            success: false, 
            error: `Upstash Redis Retrieve Network Error: ${kvError.message || "Failed to resolve endpoint"}`,
            debug: {
              rawUrlLength: kvUrl?.length,
              rawTokenLength: kvToken?.length,
            }
          },
          { status: 500 }
        );
      }
    }

    // 2. Local Fallback Mode: JSON database retrieval
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      return NextResponse.json({
        success: true,
        source: "Local JSON Fallback (Empty)",
        count: 0,
        contacts: [],
      });
    }

    const fileContent = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
    const contacts = JSON.parse(fileContent || "[]");
    
    // Sort by createdAt descending
    contacts.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
      success: true,
      source: "Local JSON Fallback",
      count: contacts.length,
      contacts,
    });

  } catch (error) {
    console.error("API Error in /api/contact/retrieve:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error in DeployForge retrieval endpoint." },
      { status: 500 }
    );
  }
}
