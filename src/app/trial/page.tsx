import { Wordmark } from "@/components/Wordmark";
import { MetaBar } from "@/components/MetaBar";

/**
 * Font trial. Delete once the face is chosen.
 * Same name, same size logic, three treatments.
 */
export default function Trial() {
  return (
    <main className="paper mx-auto max-w-[1400px] px-8 pb-24 pt-16">
      <MetaBar />

      <p className="t-mono mt-16 text-text-faint">A — Mona Sans 800, width 112%</p>
      <div className="mt-3"><Wordmark face="mona" /></div>

      <p className="t-mono mt-20 text-text-faint">B — Unbounded 800</p>
      <div className="mt-3"><Wordmark face="unbounded" /></div>

      <p className="t-mono mt-20 text-text-faint">C — Mona Sans 800, width 100% (for contrast)</p>
      <h2
        lang="tr"
        className="mt-3 whitespace-nowrap text-text font-[family-name:var(--font-display)] font-extrabold tracking-[-0.04em] leading-[0.9] text-[17.8vw]"
        style={{ fontStretch: "100%" }}
      >
        Aydın Tokur
      </h2>

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        <div>
          <p className="t-mono text-text-faint">body — Inter</p>
          <p className="t-body mt-3 max-w-[60ch] text-text-muted">
            Because I build, I know what actually gets made, what breaks, and where the real
            constraints sit. My design decisions survive contact with production instead of
            dying at handoff. Istanbul — İstanbul — ı i İ I.
          </p>
        </div>
        <div>
          <p className="t-mono text-text-faint">mono — DM Mono</p>
          <p className="t-mono mt-3 text-text">Product designer &amp; design engineer · Istanbul, TR · 2026</p>
          <p className="mt-3 font-[family-name:var(--font-mono)] text-sm text-text-muted">
            const ease = [0.23, 1, 0.32, 1]; // ı İ i I
          </p>
        </div>
      </div>
    </main>
  );
}
