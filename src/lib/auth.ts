import { cookies } from "next/headers";

const SECRET_KEY = "nsut-alumni-network-secret-key-123456";

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: "student" | "alumni" | "admin";
  avatar: string;
}

/**
 * Signs a payload to create a secure session token using Web Crypto HMAC-SHA256.
 */
export async function signSession(payload: UserSession): Promise<string> {
  const data = JSON.stringify({ ...payload, exp: Date.now() + 24 * 60 * 60 * 1000 });
  const encoder = new TextEncoder();
  const keyBuf = encoder.encode(SECRET_KEY);
  const key = await crypto.subtle.importKey(
    "raw",
    keyBuf,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const sigHex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return btoa(data) + "." + sigHex;
}

/**
 * Verifies a token's signature and expiration using Web Crypto.
 */
export async function verifySession(token: string): Promise<UserSession | null> {
  try {
    const [dataBase64, sigHex] = token.split(".");
    if (!dataBase64 || !sigHex) return null;
    const dataStr = atob(dataBase64);
    const encoder = new TextEncoder();
    const keyBuf = encoder.encode(SECRET_KEY);
    const key = await crypto.subtle.importKey(
      "raw",
      keyBuf,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );
    
    // Parse hex signature
    const sigBytes = new Uint8Array(
      sigHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      sigBytes,
      encoder.encode(dataStr)
    );
    
    if (!valid) return null;
    
    const session = JSON.parse(dataStr);
    if (session.exp && Date.now() > session.exp) {
      return null; // Expired
    }
    
    return session as UserSession;
  } catch (e) {
    return null;
  }
}

/**
 * Gets the current active user session from headers.
 * Note: cookies() is asynchronous in Next.js 15+.
 */
export async function getSession(): Promise<UserSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session_token")?.value;
    if (!token) return null;
    return await verifySession(token);
  } catch (e) {
    return null;
  }
}

/**
 * Sets the session cookie on the server.
 */
export async function setSessionCookie(session: UserSession) {
  const token = await signSession(session);
  const cookieStore = await cookies();
  cookieStore.set("session_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
}

/**
 * Clears the session cookie.
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("session_token");
}
