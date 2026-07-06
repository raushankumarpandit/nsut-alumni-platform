import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Read token from cookies
  const token = request.cookies.get("session_token")?.value;
  
  // Verify token
  const session = token ? await verifySession(token) : null;

  // Define route protection
  const isAdminRoute = pathname.startsWith("/admin");
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/auth/");
  
  // List of other protected routes
  const isProtectedRoute = 
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/directory") ||
    pathname.startsWith("/mentorship") ||
    pathname.startsWith("/forum") ||
    pathname.startsWith("/opportunities") ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/stories") ||
    pathname.startsWith("/resources") ||
    pathname.startsWith("/network");

  // 1. Handle Admin Routes
  if (isAdminRoute) {
    if (!session) {
      // Redirect unauthenticated request to login
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    
    if (session.role !== "admin") {
      // Redirect non-admin authenticated request to dashboard
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  // 2. Handle Protected Dashboard Routes
  if (isProtectedRoute) {
    if (!session) {
      const url = request.nextUrl.clone();
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
  }

  // 3. Handle Auth Routes (prevent logged-in user from seeing login/register)
  if (isAuthRoute) {
    // If it's a consent page, allow it even if logged in, or redirect if already logged in (it's fine to allow or redirect)
    if (session && !pathname.includes("consent")) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See Next.js middleware matching documentation
export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/directory/:path*",
    "/mentorship/:path*",
    "/forum/:path*",
    "/opportunities/:path*",
    "/events/:path*",
    "/stories/:path*",
    "/resources/:path*",
    "/network/:path*",
    "/login",
    "/register",
  ],
};
