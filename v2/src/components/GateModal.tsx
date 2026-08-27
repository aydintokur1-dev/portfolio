"use client";

import { Suspense, useEffect, useRef, useState, useSyncExternalStore, type FormEvent, type KeyboardEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { getStudy } from "@/content/work";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { closeGate, getGate, getGateServer, openGate, safeNext, subscribeGate } from "@/lib/gate-client";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * What the door says each time the guess is wrong. In order — the first
 * miss is polite, the tenth is not. Past the list it keeps going on ENCORE.
 * The counter next to the field keeps the score; the lines don't repeat it.
 */
const MISSES = [
  "Not that one. Try the one from the email.",
  "Close. Well — it was a password, at least.",
  "Nope. The cat is watching now.",
  "Still no. Have you tried… reading the email?",
  "Five misses. That's a pattern, not a typo.",
  "I admire the persistence. The door doesn't.",
  "Incorrect. Also: it's never “password”. It's never been “password”.",
  "The pickleball is in another castle.",
  "Brute force detected. Kidding. But it really is in the email.",
  "Ten. We could have just talked by now — aydintokur1@gmail.com.",
  "This is the most engagement this section has ever had.",
  "“Survives production.” Survives you too, apparently.",
  "Unlucky thirteen. Lucky for the door.",
  "Caps Lock? No? Worth asking.",
  "At this point I'd honestly just email you the password. Ask.",
];
const ENCORE = [
  "Still wrong. Still here. Still fond of you.",
  "The door has stopped counting. I haven't.",
  "Same door. Same answer. Different day?",
  "Respect. Now go read the email.",
];
const OFFLINE = "The door didn't answer. Try once more.";

const EMAIL = "aydintokur1@gmail.com";

/** The label is set in caps; an email address isn't. */
function Note({ text }: { text: string }) {
  const at = text.indexOf(EMAIL);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="normal-case">{EMAIL}</span>
      {text.slice(at + EMAIL.length)}
    </>
  );
}

function missMessage(n: number) {
  if (n <= MISSES.length) return MISSES[n - 1];
  return ENCORE[(n - MISSES.length - 1) % ENCORE.length];
}

/**
 * The locked door, as a modal over whatever page you were on. Opened by any
 * GateLink / the ring (gate-client's openGate) and by the proxy's deep-link
 * redirect (/?unlock=/work/<slug>). Mounted once, in the root layout.
 */
export function GateModal() {
  return (
    <Suspense fallback={null}>
      <Gate />
    </Suspense>
  );
}

function Gate() {
  const { next } = useSyncExternalStore(subscribeGate, getGate, getGateServer);
  const open = next !== null;
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const reduce = useReducedMotion();

  // Deep links: the proxy sends a locked URL here as /?unlock=/work/<slug>.
  // Open the door and drop the param so refresh / back don't re-ask.
  const deep = params.get("unlock");
  useEffect(() => {
    if (!deep) return;
    const target = safeNext(deep);
    if (target) openGate(target);
    history.replaceState(null, "", pathname);
  }, [deep, pathname]);

  const [misses, setMisses] = useState(0);
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [scope, animate] = useAnimate<HTMLDivElement>();

  // Fresh sheet every time the door opens.
  useEffect(() => {
    if (!open) return;
    setMisses(0);
    setNote(null);
    setBusy(false);
    setUnlocked(false);
  }, [open]);

  // While open: page scroll held (Lenis and native), Escape closes, focus
  // goes back where it came from on close.
  useEffect(() => {
    if (!open) return;
    const before = document.activeElement as HTMLElement | null;
    const lenis = (window as unknown as { __lenis?: { stop(): void; start(): void } }).__lenis;
    lenis?.stop();
    const html = document.documentElement;
    const was = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeGate();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      html.style.overflow = was;
      lenis?.start();
      before?.focus?.();
    };
  }, [open]);

  // Keep Tab inside the dialog.
  const trap = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const items = dialogRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const miss = (message: string) => {
    setBusy(false);
    setNote(message);
    const el = inputRef.current;
    if (el) {
      el.select();
      if (!reduce && scope.current) {
        animate(scope.current, { x: [0, -9, 8, -6, 5, -2, 0] }, { duration: 0.42, ease: "easeOut" });
      }
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const password = inputRef.current?.value ?? "";
    if (!password || busy || !next) return;
    setBusy(true);
    let status = 0;
    try {
      const res = await fetch("/api/unlock", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
      });
      status = res.status;
    } catch {
      status = 0;
    }
    if (status === 200) {
      setUnlocked(true);
      setNote("[ OK ] That's the one. Opening ↗");
      // A beat to read the OK before the page changes under the door.
      setTimeout(() => {
        closeGate();
        router.push(next);
      }, reduce ? 0 : 420);
      return;
    }
    if (status === 401) {
      const n = misses + 1;
      setMisses(n);
      miss(missMessage(n));
    } else {
      miss(OFFLINE);
    }
  };

  const study = next ? getStudy(next.split("/")[2] ?? "") : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="gate"
          className="fixed inset-0 z-[100] flex items-center justify-center px-[var(--edge)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.22 } }}
          transition={{ duration: reduce ? 0 : 0.3 }}
        >
          <div
            className="absolute inset-0 bg-[rgba(7,9,15,0.72)] backdrop-blur-md"
            onClick={closeGate}
            aria-hidden
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gate-title"
            aria-describedby="gate-desc"
            onKeyDown={trap}
            className="relative w-full max-w-[500px] rounded-[var(--r-card)] border border-[var(--hairline-strong)] bg-[var(--panel)] p-7 shadow-[0_40px_120px_rgba(0,0,0,0.6)] sm:p-9"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.985, transition: { duration: 0.22, ease: EASE } }}
            transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="t-label diode text-[var(--ink)]">ACCESS // Unreleased work</p>
              <button
                type="button"
                onClick={closeGate}
                className="t-label -mr-1 -mt-1 cursor-pointer px-1 text-[var(--faint)] transition-colors hover:text-[var(--ink)]"
                aria-label="Close"
              >
                [ ESC ]
              </button>
            </div>

            {study && (
              <p className="t-label mt-6 text-[var(--faint)]">
                → {study.org} — {study.title}
              </p>
            )}

            <h2 id="gate-title" className="t-display t-display-md mt-3">
              This one hasn&apos;t <em className="serif-accent text-[var(--accent)]">shipped</em> yet.
            </h2>
            <p id="gate-desc" className="t-body mt-4 text-[var(--muted)]">
              Until it launches, it stays between us. If we&apos;ve talked, the password is in my
              email. If we haven&apos;t —{" "}
              <a href="mailto:aydintokur1@gmail.com?subject=Password%3F" className="wipe-link text-[var(--ink)]">
                ask me
              </a>
              , I reply.
            </p>

            <form onSubmit={submit} className="mt-8 flex flex-col gap-3">
              <div className="flex items-baseline justify-between">
                <label className="t-label text-[var(--faint)]" htmlFor="gate-password">
                  PASSWORD /
                </label>
                <span className="t-label text-[var(--faint)]" aria-hidden>
                  MISSES / {String(misses).padStart(2, "0")}
                </span>
              </div>
              <motion.div ref={scope} className="flex gap-2">
                <input
                  ref={inputRef}
                  id="gate-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  disabled={unlocked}
                  aria-invalid={misses > 0 && !unlocked ? true : undefined}
                  aria-describedby={note ? "gate-note" : undefined}
                  className="t-mono h-11 min-w-0 flex-1 rounded-[var(--r-pill)] border border-[var(--hairline-strong)] bg-[var(--recess)] px-5 text-[var(--ink)] outline-none transition-colors focus-visible:border-[rgba(var(--accent-rgb),0.6)] aria-[invalid]:border-[rgba(var(--accent-rgb),0.6)]"
                />
                <button
                  type="submit"
                  disabled={busy || unlocked}
                  className="pill pill-solid t-label cursor-pointer disabled:cursor-default disabled:opacity-80"
                >
                  {busy ? "…" : "Unlock"}
                </button>
              </motion.div>

              <div className="min-h-[1.5em] pt-1" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                  {note && (
                    <motion.p
                      key={`${misses}-${note}`}
                      id="gate-note"
                      role={unlocked ? "status" : "alert"}
                      className={`t-label ${unlocked ? "text-[var(--ink)]" : "text-[var(--accent)]"}`}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.12 } }}
                      transition={{ duration: reduce ? 0 : 0.28, ease: EASE }}
                    >
                      <Note text={note} />
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
