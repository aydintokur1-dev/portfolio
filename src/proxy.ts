import { NextResponse, type NextRequest } from "next/server";
import { GATED_SLUGS, GATE_COOKIE, gatePassword, gateToken } from "@/lib/gate";

/**
 * Gate only the unreleased case studies. The card stays visible on the home
 * page; only the page itself asks for the password (docs/02-DIRECTION.md).
 */
export async function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (!slug || !GATED_SLUGS.includes(slug)) return NextResponse.next();

  const expected = await gateToken(gatePassword());
  if (request.cookies.get(GATE_COOKIE)?.value === expected) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/unlock";
  url.search = `?next=${encodeURIComponent(request.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/work/:slug*",
};
