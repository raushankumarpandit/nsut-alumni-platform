import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      firstName, 
      lastName, 
      email, 
      password, 
      role, 
      branch, 
      graduationYear, 
      company, 
      roleTitle, 
      linkedin 
    } = body;

    // Check mandatory fields
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Verify email restriction for students
    if (role === "student") {
      const emailDomain = email.toLowerCase().trim();
      if (!emailDomain.endsWith("@nsut.ac.in")) {
        return NextResponse.json(
          { message: "Students must use their official @nsut.ac.in email address." },
          { status: 400 }
        );
      }
    }

    // Check if user already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email address already exists." },
        { status: 400 }
      );
    }

    // Combine names
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    // Create user in simulated database
    const newUser = createUser({
      name: fullName,
      email: email.trim(),
      passwordHash: password, // Store password
      role: role as "student" | "alumni",
      avatar: "", // empty avatar, fall back to initials
      branch: branch || "CSE",
      graduationYear: Number(graduationYear) || 2026,
      currentYear: role === "student" ? (2026 - (Number(graduationYear) || 2026) + 3) : undefined,
      company: company || undefined,
      roleTitle: roleTitle || undefined,
      linkedin: linkedin || undefined,
    });

    // Create secure session
    const session = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      avatar: newUser.avatar,
    };

    // Set cookie
    await setSessionCookie(session);

    // Return profile
    const { passwordHash, ...userResponse } = newUser;
    return NextResponse.json(
      { user: userResponse, message: "Registration successful!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Something went wrong during registration." },
      { status: 500 }
    );
  }
}
