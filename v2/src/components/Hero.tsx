import { InView } from "@/components/InView";
import { HeroField } from "@/components/HeroField";

/**
 * The opening chapter. Mono telemetry up top, the tagline in three masked
 * lines with one serif-italic word, the thesis underneath, two pill CTAs.
 * Everything enters through line masks on load.
 */
export function Hero() {
  return (
    <InView
      as="section"
      className="relative flex min-h-svh flex-col justify-center px-[var(--edge)] py-24 sm:py-28"
      amount={0.1}
      id="top"
    >
      <span data-hud="HELLO" className="absolute inset-0" aria-hidden />

      {/* the marble artwork sampled into drifting pigment dust — never shown as an image */}
      <HeroField />

      <p className="t-label relative z-[1] mb-10 flex flex-wrap gap-x-6 gap-y-2 text-[var(--faint)]">
        <span className="fade-up" style={{ ["--rv-delay" as string]: "0.1s" }}>[ ISTANBUL, TR ]</span>
        <span className="fade-up" style={{ ["--rv-delay" as string]: "0.18s" }}>[ 41.01°N — 28.98°E ]</span>
        <span className="fade-up hidden sm:inline" style={{ ["--rv-delay" as string]: "0.26s" }}>[ SENIOR PRODUCT DESIGNER & DESIGN ENGINEER ]</span>
      </p>

      <h1 className="t-display t-display-xl relative z-[1]">
        <span className="rv"><span className="rv-i" style={{ ["--rv-delay" as string]: "0.05s" }}>Your <em className="serif-accent text-[var(--accent)]">friendly</em></span></span>
        <span className="rv"><span className="rv-i" style={{ ["--rv-delay" as string]: "0.13s" }}><span className="t-outline-fill">neighborhood</span></span></span>
        <span className="rv"><span className="rv-i" style={{ ["--rv-delay" as string]: "0.21s" }}>design engineer.</span></span>
      </h1>

      <div className="relative z-[1] mt-10">
        <div className="fade-up flex flex-wrap items-center gap-3" style={{ ["--rv-delay" as string]: "0.35s" }}>
          <a href="#work" className="pill pill-solid t-label-lg t-label">
            See the work <span className="arr arr-d" aria-hidden>↓</span>
          </a>
          <a href="#contact" className="pill t-label t-label-lg text-[var(--ink)]">
            Say hi <span className="arr" aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </InView>
  );
}
