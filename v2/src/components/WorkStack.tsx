import { studies } from "@/content/work";
import { InView } from "@/components/InView";
import { Breakable } from "@/components/Breakable";
import { GateLink } from "@/components/GateLink";

/**
 * Selected work as a typographic index — names first, no product shots.
 * Each row carries its case tint as a local accent; the images live on
 * the case pages, framed on their mats.
 */
export function WorkStack() {
  return (
    <section id="work" className="px-[var(--edge)] pb-14" data-hud="WORK">
      <InView className="pt-10">
        <div className="flex items-center gap-4">
          <span className="cross" aria-hidden />
          <div className="rule flex-1" />
        </div>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="t-label diode text-[var(--ink)]">
            01 // Selected work <span className="text-[var(--faint)]">— ( {studies.length} ) projects</span>
          </h2>
          <p className="t-body fade-up max-w-[44ch] text-[var(--muted)]">
            One I designed and built end to end, nine I led or shaped with a team, one that was a
            three-day test I nearly failed on day one. Some Pickleball work stays behind a
            password until it launches — click through and it will ask.
          </p>
        </div>
      </InView>

      <ol className="mt-14">
        {studies.map((s, i) => (
          <InView
            as="li"
            key={s.slug}
            amount={0.3}
            style={{ ["--accent-rgb" as string]: `var(--tint-${s.tint})` }}
          >
            <div className="rule" />
            <GateLink
              slug={s.slug}
              className="work-row group grid grid-cols-[2.6rem_1fr] items-baseline gap-x-4 py-7 sm:grid-cols-[3.6rem_1fr_auto] sm:gap-x-8 sm:py-9"
            >
              <span className="t-label text-[var(--faint)]">/{String(i + 1).padStart(2, "0")}</span>

              <div className="min-w-0">
                <h3 className="work-name t-display text-[clamp(2rem,5.6vw,5.6rem)] leading-[0.95] tracking-[-0.035em]">
                  <span className="rv"><span className="rv-i"><Breakable text={s.org} /></span></span>
                </h3>
                <p className="t-body mt-3 max-w-[52ch] text-[var(--faint)]">
                  {s.title}.
                  {s.gated && (
                    <span className="chip t-label ml-3 align-middle" style={{ color: "rgb(var(--accent-rgb))", borderColor: "rgba(var(--accent-rgb),.4)" }}>
                      [ PASSWORD ]
                    </span>
                  )}
                  {s.link && <span className="t-label ml-3 text-[var(--faint)]">{s.link.label} · LIVE</span>}
                </p>
              </div>

              {/* Year and arrow: a line under the summary on a phone, where a
                  third column would squeeze the name into a clipped mask; a
                  right-hand column from sm up. */}
              <div className="t-label col-start-2 mt-4 flex items-center gap-3 text-[var(--faint)] sm:col-start-auto sm:mt-0 sm:block sm:self-center sm:text-right">
                <span className="sm:block">{s.year}</span>
                <span className="mt-1 hidden sm:block">{s.role}</span>
                <span className="work-arr inline-block text-[var(--muted)] sm:mt-2" aria-hidden>↗</span>
              </div>
            </GateLink>
          </InView>
        ))}
      </ol>
      <div className="rule" style={{ transform: "scaleX(1)" }} />
    </section>
  );
}
