/**
 * Cryptographic helpers for administering secure sessions.
 * Built using the native Web Crypto API (supported globally in Node.js 18+ and Vercel Edge).
 * No external dependencies required.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/**
 * Encodes a Uint8Array or ArrayBuffer into a base64url string.
 */
function bufferToBase64Url(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

/**
 * Decodes a base64url string back into a Uint8Array.
 */
function base64UrlToUint8Array(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Derives a consistent CryptoKey from the secret using SHA-256.
 */
async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const keyData = encoder.encode(secret);
  // Hash the secret to guarantee a 256-bit (32-byte) key for HMAC
  const hash = await crypto.subtle.digest("SHA-256", keyData);
  return await crypto.subtle.importKey(
    "raw",
    hash,
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
}

/**
 * Retrieves the cryptographic secret from environment variables.
 * Automatically falls back to a derived hash of the ADMIN_KEY if SESSION_SECRET is not configured.
 */
export function getSessionSecret(): string {
  return process.env.SESSION_SECRET || process.env.ADMIN_KEY || "admin123-fallback-secret-key-3021980";
}

/**
 * Cryptographically signs a payload using HMAC-SHA256.
 * Returns a JWT-like string: base64url(header).base64url(payload).base64url(signature)
 */
export async function signToken(payload: any, secret: string): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const headerStr = bufferToBase64Url(encoder.encode(JSON.stringify(header)));
  const payloadStr = bufferToBase64Url(encoder.encode(JSON.stringify(payload)));
  
  const tokenInput = `${headerStr}.${payloadStr}`;
  const key = await getCryptoKey(secret);
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(tokenInput));
  const signatureStr = bufferToBase64Url(signatureBuffer);
  
  return `${tokenInput}.${signatureStr}`;
}

/**
 * Verifies a token signature and returns the parsed payload if valid.
 * Returns null if the signature is invalid or the token has expired.
 */
export async function verifyToken(token: string, secret: string): Promise<any | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    
    const [headerStr, payloadStr, signatureStr] = parts;
    const tokenInput = `${headerStr}.${payloadStr}`;
    const key = await getCryptoKey(secret);
    
    const signatureBuffer = base64UrlToUint8Array(signatureStr);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer as any,
      encoder.encode(tokenInput) as any
    );
    
    if (!isValid) return null;
    
    const payloadJson = decoder.decode(base64UrlToUint8Array(payloadStr));
    const payload = JSON.parse(payloadJson);
    
    // Check expiration if present
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}
