/**
 * The client half of the password gate: which studies are locked, the
 * non-secret "this browser has unlocked" hint, and the tiny store that
 * opens the door (GateModal, mounted once in the root layout).
 *
 * Nothing here is authoritative — the proxy checks the real cookie on
 * every request. This only decides whether a click opens the modal or
 * goes straight through.
 */
export const GATED_SLUGS = ["pickleball-tournaments", "pickleball-homepage", "pickleball-apps"];
export const GATE_COOKIE = "pf_gate";
/** Readable twin of the httpOnly cookie. Carries no secret, only "1". */
export const GATE_HINT_COOKIE = "pf_gate_ok";

export const isGated = (slug: string) => GATED_SLUGS.includes(slug);

export function hasGateHint() {
  if (typeof document === "undefined") return false;
  return document.cookie.split("; ").includes(`${GATE_HINT_COOKIE}=1`);
}

/* ------------------------------------------------------------------ store */

type GateState = { next: string | null };
const CLOSED: GateState = { next: null };
let state: GateState = CLOSED;
const listeners = new Set<() => void>();

export function openGate(next: string) {
  state = { next };
  listeners.forEach((l) => l());
}
export function closeGate() {
  state = CLOSED;
  listeners.forEach((l) => l());
}
export function subscribeGate(l: () => void) {
  listeners.add(l);
  return () => void listeners.delete(l);
}
export const getGate = () => state;
export const getGateServer = () => CLOSED;

/** Only ever follow same-site paths handed back from the proxy. */
export function safeNext(path: string | null | undefined) {
  if (!path || !path.startsWith("/work/") || path.startsWith("//")) return null;
  return path;
}

/**
 * Follow a link to a study: straight through if it's open (or this browser
 * already unlocked), otherwise the modal. `go` is the navigation to use.
 */
export function openStudy(slug: string, go: (href: string) => void) {
  const href = `/work/${slug}`;
  if (isGated(slug) && !hasGateHint()) openGate(href);
  else go(href);
}
