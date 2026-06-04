import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    // Delete the secure session cookie
    cookieStore.delete("admin_session");

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API Error in /api/admin/logout:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during logout sequence." },
      { status: 500 }
    );
  }
}
