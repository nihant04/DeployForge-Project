import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { signToken, getSessionSecret } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { passcode } = body;

    const expectedAdminKey = process.env.ADMIN_KEY || "admin123";

    if (!passcode || passcode !== expectedAdminKey) {
      return NextResponse.json(
        { success: false, error: "Access Denied: Invalid security passcode." },
        { status: 401 }
      );
    }

    // Session valid for 2 hours (in milliseconds)
    const duration = 2 * 60 * 60 * 1000;
    const expiration = Date.now() + duration;
    const payload = {
      role: "admin",
      exp: expiration,
    };

    const token = await signToken(payload, getSessionSecret());

    // Write a secure HTTP-Only cookie using Next.js standard headers
    const cookieStore = await cookies();
    cookieStore.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7200, // 2 hours in seconds
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Error in /api/admin/login:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during authentication link." },
      { status: 500 }
    );
  }
}
