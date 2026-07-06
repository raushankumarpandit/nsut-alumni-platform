import { NextRequest, NextResponse } from "next/server";
import { getUserByEmail, createUser } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const requestedRole = searchParams.get("role");

    if (!email || !name) {
      return NextResponse.redirect(new URL("/login?error=oauth_missing_info", req.url));
    }

    const emailLower = email.toLowerCase().trim();
    
    // Auto-detect role if not explicitly requested
    let role: "student" | "alumni" = "alumni";
    if (requestedRole === "student" || requestedRole === "alumni") {
      role = requestedRole;
    } else if (emailLower.endsWith("@nsut.ac.in")) {
      role = "student";
    }

    // Verify domain restriction for student login
    if (role === "student" && !emailLower.endsWith("@nsut.ac.in")) {
      return NextResponse.redirect(new URL("/login?error=student_domain_restriction", req.url));
    }

    // Lookup user
    let user = getUserByEmail(emailLower);

    if (!user) {
      // Create user automatically on first social login
      user = createUser({
        name: name,
        email: emailLower,
        passwordHash: "oauth_google_verified", // Special token for social auth
        role: role,
        avatar: "",
        branch: "CSE",
        graduationYear: role === "student" ? 2026 : 2022,
        currentYear: role === "student" ? 3 : undefined,
        company: role === "alumni" ? "Google" : undefined,
        roleTitle: role === "alumni" ? "Software Engineer" : undefined,
      });
    }

    // Setup session
    const session = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatar: user.avatar,
    };

    // Set cookie
    await setSessionCookie(session);

    // Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    return NextResponse.redirect(new URL("/login?error=oauth_failed", req.url));
  }
}
