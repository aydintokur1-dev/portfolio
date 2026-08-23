import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Cat } from "@/components/Cat";

/** The 404 — where a mascot actually earns its keep (docs/06-CAT.md). */
export default function NotFound() {
  return (
    <>
      <div className="rails" aria-hidden />
      <Nav links={[{ href: "/#work", id: "work", label: "Work" }, { href: "/#about", id: "about", label: "About" }, { href: "/#contact", id: "contact", label: "Contact" }]} />
      <main className="relative z-[1] flex-1">
        <div className="column pb-20 pt-32">
          <div className="flex items-end gap-4">
            <Cat size={96} />
            <p className="t-mono pb-3 text-text-faint">404</p>
          </div>
          <h1 className="t-h1 mt-4 text-text">Nothing here. The cat checked.</h1>
          <p className="t-body mt-4 max-w-[52ch] text-text-muted">
            The page moved, or never existed, or I broke a link. Either way, the work is one
            click back.
          </p>
          <Link href="/" className="btn-ink pressable mt-6 inline-flex h-9 items-center gap-2 rounded-[var(--radius-pill)] px-4 text-[0.8125rem] font-medium">
            ← Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
