import { InView } from "@/components/InView";
import { testimonials } from "@/content/testimonials";

const STATS = [
  { value: "6", label: "products kept feeling like one, at Pickleball.com" },
  { value: "1M+", label: "active users on the Morpa education platform" },
  { value: "3", label: "days from research to live, for VOLGEN" },
  { value: String(testimonials.length), label: "written recommendations, two from direct managers" },
];

export function Stats() {
  return (
    <InView as="section" className="px-[var(--edge)] py-28 sm:py-36" data-hud="NUMBERS">
      <div className="flex items-center gap-4">
        <span className="cross" aria-hidden />
        <div className="rule flex-1" />
        <span className="cross" aria-hidden />
      </div>
      <dl className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.value} className="fade-up" style={{ ["--rv-delay" as string]: `${i * 0.08}s` }}>
            <dd className="t-display stat-tick order-first text-[clamp(2.6rem,4.5vw,4.2rem)]">{s.value}</dd>
            <dt className="t-label mt-4 max-w-[24ch] text-[var(--faint)]">{s.label}</dt>
          </div>
        ))}
      </dl>
    </InView>
  );
}
