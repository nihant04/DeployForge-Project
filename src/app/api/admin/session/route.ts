import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken, getSessionSecret } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("admin_session");

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ isAuthenticated: false });
    }

    const payload = await verifyToken(sessionCookie.value, getSessionSecret());

    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ isAuthenticated: false });
    }

    return NextResponse.json({ isAuthenticated: true });
  } catch (error) {
    console.error("API Error in /api/admin/session:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 500 });
  }
}
