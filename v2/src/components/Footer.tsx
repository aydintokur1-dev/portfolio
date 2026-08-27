import { Cat } from "@/components/Cat";

export function Footer() {
  return (
    <footer className="footer-tick mt-16">
      <div className="grid gap-10 px-[var(--edge)] py-14 md:grid-cols-3">
        <div>
          <p className="t-label text-[var(--faint)]">COLOPHON /</p>
          <p className="t-body mt-3 max-w-[36ch] text-[var(--muted)]">
            Designed and built by me — Next.js, GSAP, Matter.js, three typefaces and one accent.
            No template. That&apos;s rather the point.
          </p>
        </div>
        <div>
          <p className="t-label text-[var(--faint)]">MENU /</p>
          <ul className="t-body mt-3 flex flex-col gap-1.5">
            <li><a className="wipe-link text-[var(--muted)] hover:text-[var(--ink)]" href="/#work">Work</a></li>
            <li><a className="wipe-link text-[var(--muted)] hover:text-[var(--ink)]" href="/#about">About</a></li>
            <li><a className="wipe-link text-[var(--muted)] hover:text-[var(--ink)]" href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="t-label text-[var(--faint)]">REACH /</p>
          <ul className="t-body mt-3 flex flex-col gap-1.5">
            <li>
              <a className="wipe-link text-[var(--muted)] hover:text-[var(--ink)]" href="mailto:aydintokur1@gmail.com?subject=Hi%20Ayd%C4%B1n!">
                aydintokur1@gmail.com
              </a>
            </li>
            <li>
              <a className="wipe-link text-[var(--muted)] hover:text-[var(--ink)]" href="https://www.linkedin.com/in/ayd%C4%B1n-tokur/" target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </li>
            <li className="t-label mt-2 text-[var(--faint)]">ISTANBUL, TÜRKİYE · NO © YEAR — YEARS AGE BADLY</li>
          </ul>
        </div>
      </div>
      <div aria-hidden className="relative flex justify-end px-[9%]" style={{ marginBottom: -12 }}>
        <Cat snooze size={46} />
      </div>
      <div aria-hidden className="overflow-clip px-0">
        <span className="giant-name text-[36vw]">AYDIN</span>
      </div>
    </footer>
  );
}
