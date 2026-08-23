import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, gatePassword, gateToken } from "@/lib/gate";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const nextPath = String(form.get("next") ?? "/");
  // only ever redirect within the site
  const safeNext = nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";

  if (password !== gatePassword()) {
    const url = new URL("/unlock", request.url);
    url.searchParams.set("next", safeNext);
    url.searchParams.set("error", "1");
    return NextResponse.redirect(url, 303);
  }

  const res = NextResponse.redirect(new URL(safeNext, request.url), 303);
  res.cookies.set(GATE_COOKIE, await gateToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
