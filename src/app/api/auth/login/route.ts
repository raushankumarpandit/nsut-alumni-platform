import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const user = getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email address or password." },
        { status: 401 }
      );
    }

    // Check password
    if (user.passwordHash !== password) {
      return NextResponse.json(
        { message: "Invalid email address or password." },
        { status: 401 }
      );
    }

    // Create secure session
    const session = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };

    // Set cookie
    await setSessionCookie(session);

    const { passwordHash, ...userResponse } = user;
    return NextResponse.json(
      { user: userResponse, message: "Signed in successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Something went wrong during sign in." },
      { status: 500 }
    );
  }
}
