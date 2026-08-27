import { NextResponse, type NextRequest } from "next/server";
import { GATED_SLUGS, GATE_COOKIE, GATE_HINT_COOKIE, gatePassword, gateToken } from "@/lib/gate";

/**
 * Gate only the unreleased case studies. The card stays visible on the home
 * page; only the page itself asks for the password (docs/02-DIRECTION.md).
 * Clicks inside the site open the modal before ever reaching here; this is
 * the net for direct hits (the link in an email, a pasted URL, a stale
 * cookie) — they land on the home page with the modal open.
 */
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // Static files (public/work/<slug>/*.webp) pass through: next/image's optimizer
  // fetches them server-side without the visitor's cookie, so gating them would
  // break every figure on a gated page. Only the page route is gated.
  if (/\.[a-z0-9]+$/i.test(pathname)) return NextResponse.next();

  const slug = pathname.split("/")[2];
  if (!slug || !GATED_SLUGS.includes(slug)) return NextResponse.next();

  const expected = await gateToken(gatePassword());
  if (request.cookies.get(GATE_COOKIE)?.value === expected) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/";
  url.search = `?unlock=${encodeURIComponent(pathname)}`;
  const res = NextResponse.redirect(url);
  // If we got here with a hint cookie the key is stale (password rotated);
  // drop it so links go back to asking.
  if (request.cookies.has(GATE_HINT_COOKIE)) res.cookies.delete(GATE_HINT_COOKIE);
  return res;
}

export const config = {
  matcher: "/work/:slug*",
};
