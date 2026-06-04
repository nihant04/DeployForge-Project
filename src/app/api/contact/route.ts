import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { MongoClient } from "mongodb";

const LOCAL_DB_PATH = path.join(process.cwd(), "src", "data", "contacts.json");

interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactPayload = await request.json();
    const { name, email, projectType, budget, message } = body;

    // Server-side audit validations
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Validation FAILED: Staged parameters are empty." },
        { status: 400 }
      );
    }

    const newContact = {
      id: Math.random().toString(36).substring(2, 11),
      name: name.trim(),
      email: email.trim(),
      projectType,
      budget,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // 1. Production Mode: MongoDB Integration
    if (process.env.MONGODB_URI) {
      try {
        const client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        const db = client.db("deployforge");
        const collection = db.collection("contacts");
        await collection.insertOne(newContact);
        await client.close();

        return NextResponse.json({
          success: true,
          message: "Request successfully saved in primary MongoDB cluster.",
          simulated: false,
          data: { id: newContact.id },
        });
      } catch (dbError: any) {
        console.error("MongoDB Connection Failed:", dbError);
        return NextResponse.json(
          { success: false, error: `MongoDB Cluster Integration Failed: ${dbError.message || "Unknown database error"}` },
          { status: 500 }
        );
      }
    }

    // 2. Production Mode: Vercel KV / Upstash Redis (REST API) Integration
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
          body: JSON.stringify(["LPUSH", "deployforge_contacts", JSON.stringify(newContact)]),
        });

        if (kvResponse.ok) {
          return NextResponse.json({
            success: true,
            message: "Request successfully saved in Vercel KV Storage.",
            simulated: false,
            data: { id: newContact.id },
          });
        } else {
          const errText = await kvResponse.text();
          console.error("Upstash Redis REST Error:", kvResponse.status, errText);
          return NextResponse.json(
            { success: false, error: `Upstash Redis REST Error [${kvResponse.status}]: ${errText || "Invalid token or URL"}` },
            { status: 500 }
          );
        }
      } catch (kvError: any) {
        console.error("Vercel KV Connection Failed:", kvError);
        return NextResponse.json(
          { success: false, error: `Upstash Redis Network/Fetch Error: ${kvError.message || "Failed to resolve endpoint"}` },
          { status: 500 }
        );
      }
    }

    // 2. Local Fallback Mode: JSON file-based storage
    const dirPath = path.dirname(LOCAL_DB_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let contactsList: typeof newContact[] = [];
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        const fileContent = fs.readFileSync(LOCAL_DB_PATH, "utf-8");
        contactsList = JSON.parse(fileContent || "[]");
      } catch (readError) {
        console.error("Failed to parse local JSON db, resetting database:", readError);
      }
    }

    contactsList.push(newContact);
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(contactsList, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Request successfully saved locally (Fallback JSON Active).",
      simulated: true,
      data: { id: newContact.id },
    });

  } catch (error) {
    console.error("API Error in /api/contact:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error in DeployForge endpoint." },
      { status: 500 }
    );
  }
}
