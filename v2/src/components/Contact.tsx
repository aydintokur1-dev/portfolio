import { InView } from "@/components/InView";
import { PillPit } from "@/components/PillPit";

export function Contact() {
  return (
    <section id="contact" className="px-[var(--edge)] pb-10 pt-28 sm:pt-36" data-hud="SAY HI">
      <InView>
        <div className="flex items-center gap-4">
          <span className="cross" aria-hidden />
          <div className="rule flex-1" />
          <span className="cross" aria-hidden />
        </div>
        <h2 className="t-label diode mt-8 text-[var(--ink)]">
          04 // Say hi <span className="text-[var(--faint)]">— replies within a day, usually faster</span>
        </h2>

        <p className="t-body fade-up mt-8 max-w-[52ch] text-[var(--muted)]" style={{ ["--rv-delay" as string]: "0.1s" }}>
          Open to senior product design and design engineering roles. Also just happy to talk
          about design systems, front-end craft, or what AI is actually good for in a
          designer&apos;s week.
        </p>

        <a
          href="mailto:aydintokur1@gmail.com?subject=Hi%20Ayd%C4%B1n!"
          className="wipe-link t-display mt-10 inline-block max-w-full break-all text-[clamp(1.6rem,4.6vw,4.6rem)] text-[var(--ink)] transition-colors duration-300 hover:text-[var(--accent)]"
        >
          aydintokur1@gmail.com
        </a>

        <div className="fade-up mt-8 flex flex-wrap gap-3" style={{ ["--rv-delay" as string]: "0.2s" }}>
          <a href="https://www.linkedin.com/in/ayd%C4%B1n-tokur/" target="_blank" rel="noreferrer" className="pill t-label text-[var(--ink)]">
            LinkedIn <span className="arr" aria-hidden>↗</span>
          </a>
          <a href="/Aydin_Tokur_CV.pdf" download="Aydin_Tokur_CV.pdf" className="pill t-label text-[var(--ink)]">
            Download CV <span className="arr arr-d" aria-hidden>↓</span>
          </a>
        </div>
      </InView>

      <PillPit />
    </section>
  );
}
