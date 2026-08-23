import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = { title: "Unlock — Aydın Tokur", robots: { index: false } };

/**
 * The locked door. Friendly, small, and honest about why it's here.
 * The password travels in outreach emails, never on the page.
 */
export default async function Unlock(props: PageProps<"/unlock">) {
  const sp = await props.searchParams;
  const next = typeof sp.next === "string" ? sp.next : "/";
  const error = sp.error === "1";

  return (
    <>
      <div className="rails" aria-hidden />
      <Nav links={[{ href: "/#work", id: "work", label: "Work" }, { href: "/#about", id: "about", label: "About" }, { href: "/#contact", id: "contact", label: "Contact" }]} />
      <main className="relative z-[1] flex-1">
        <div className="column pb-20 pt-32">
          <p className="t-mono text-text-faint">Unreleased work</p>
          <h1 className="t-h1 mt-3 text-text">This one&apos;s behind a door.</h1>
          <p className="t-body mt-4 max-w-[52ch] text-text-muted">
            It isn&apos;t live yet, so it stays between us. If we&apos;ve talked, the password is
            in my email. If we haven&apos;t —{" "}
            <a href="mailto:aydintokur1@gmail.com?subject=Password%3F" className="text-text underline underline-offset-4">
              ask me
            </a>
            , I reply.
          </p>

          <form action="/api/unlock" method="post" className="mt-8 flex max-w-sm flex-col gap-3">
            <input type="hidden" name="next" value={next} />
            <label className="t-mono text-text-faint" htmlFor="password">
              Password
            </label>
            <div className="flex gap-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                autoFocus
                required
                aria-invalid={error || undefined}
                aria-describedby={error ? "pw-error" : undefined}
                className="h-10 flex-1 rounded-[var(--radius-pill)] border border-border bg-surface px-4 text-[0.9375rem] text-text outline-none focus-visible:border-border-strong"
              />
              <button type="submit" className="btn-ink pressable h-10 rounded-[var(--radius-pill)] px-4 text-[0.8125rem] font-medium">
                Unlock
              </button>
            </div>
            {error && (
              <p id="pw-error" role="alert" className="t-small text-text">
                Not that one. The cat is judging, gently.
              </p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
