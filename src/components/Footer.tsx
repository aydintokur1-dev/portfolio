import { Wordmark } from "./Wordmark";

/**
 * Contact + footer in one. The section people actually scroll for.
 */
const LINKS = [
  { href: "mailto:aydintokur1@gmail.com?subject=Hi%20Ayd%C4%B1n!", label: "aydintokur1@gmail.com" },
  { href: "https://www.linkedin.com/in/ayd%C4%B1n-tokur/", label: "LinkedIn" },
  { href: "https://www.behance.net/aydintokur", label: "Behance" },
  { href: "https://drive.google.com/file/d/1qnyrG5VcR_gGvFq35OnMk1o3tA8zP20_/view?usp=drive_link", label: "CV" },
];

export function Footer() {
  return (
    <footer id="contact" className="hairline relative z-[1]">
      <div className="column py-16 sm:py-20">
        <p className="t-mono text-text-faint">Contact</p>
        <h2 className="t-h1 mt-3 text-text">Say hi.</h2>
        <p className="t-body mt-4 max-w-[56ch] text-text-muted">
          Open to senior product design and design engineering roles — and always happy to talk
          about design systems, front-end craft, or what AI is actually good for in a
          designer&apos;s week.
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {LINKS.map((l, i) => (
            <li key={l.href}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                className={`pressable inline-flex h-9 items-center gap-2 rounded-[var(--radius-pill)] px-4 text-[0.8125rem] font-medium ${
                  i === 0 ? "btn-ink" : "hoverable border border-border bg-surface text-text"
                }`}
              >
                {l.label}
                <span aria-hidden className="text-[0.75rem] opacity-70">{l.href.startsWith("http") ? "↗" : "→"}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="hairline">
        <div className="column t-mono flex flex-wrap items-center justify-between gap-4 py-5 text-text-faint">
          <Wordmark className="!text-[0.8125rem] text-text-faint" />
          <span>Istanbul · Built with Next.js, Motion, and a cat</span>
        </div>
      </div>
    </footer>
  );
}
