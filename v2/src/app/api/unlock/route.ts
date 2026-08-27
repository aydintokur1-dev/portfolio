import { NextResponse, type NextRequest } from "next/server";
import { GATE_COOKIE, GATE_HINT_COOKIE, gatePassword, gateToken } from "@/lib/gate";

/**
 * The modal posts here. 200 + cookies on the right password, 401 otherwise;
 * the funny part of a wrong guess is the modal's job, not the API's.
 */
export async function POST(request: NextRequest) {
  const password = await readPassword(request);

  if (!password || password !== gatePassword()) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  const base = {
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  };
  // the real key, out of reach of scripts
  res.cookies.set(GATE_COOKIE, await gateToken(password), { ...base, httpOnly: true });
  // the readable hint, so gated links skip the modal once you're in
  res.cookies.set(GATE_HINT_COOKIE, "1", { ...base, httpOnly: false });
  return res;
}

async function readPassword(request: NextRequest) {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("application/json")) {
    const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
    return typeof body?.password === "string" ? body.password : "";
  }
  const form = await request.formData().catch(() => null);
  return String(form?.get("password") ?? "");
}
