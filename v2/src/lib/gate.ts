/**
 * Password gate for unreleased work — the server half. One shared password
 * (it goes in outreach emails, never on the site), one httpOnly cookie
 * holding a hash of it — never the password itself. Edge-safe: Web Crypto
 * only. The slugs, cookie names and the modal store live in gate-client.ts
 * so the browser bundle never sees this file (or the dev fallback below).
 */
export { GATED_SLUGS, GATE_COOKIE, GATE_HINT_COOKIE, isGated } from "@/lib/gate-client";

export function gatePassword() {
  // dev fallback so the gate works out of the box; set GATE_PASSWORD in prod
  return process.env.GATE_PASSWORD ?? "neighbor";
}

export async function gateToken(password: string) {
  const data = new TextEncoder().encode(`pf:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}
