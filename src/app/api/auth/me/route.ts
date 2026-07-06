import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getUserById } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { user: null, message: "Not authenticated" },
        { status: 401 }
      );
    }

    const user = getUserById(session.id);
    if (!user) {
      return NextResponse.json(
        { user: null, message: "User not found" },
        { status: 401 }
      );
    }

    const { passwordHash, ...userResponse } = user;
    return NextResponse.json(
      { user: userResponse },
      { status: 200 }
    );
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { user: null, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
