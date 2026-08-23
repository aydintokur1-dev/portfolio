/**
 * Password gate for unreleased work. One shared password (it goes in outreach
 * emails, never on the site), one cookie holding a hash of it — never the
 * password itself. Edge-safe: Web Crypto only.
 */
export const GATED_SLUGS = ["pickleball"];
export const GATE_COOKIE = "pf_gate";

export function gatePassword() {
  // dev fallback so the gate works out of the box; set GATE_PASSWORD in prod
  return process.env.GATE_PASSWORD ?? "neighbor";
}

export async function gateToken(password: string) {
  const data = new TextEncoder().encode(`pf:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
}
