import { brands } from "@/content/brands";

/**
 * Trust as a ticker: employer and client names, solid/outline alternating,
 * accent + separators. Text, not logos — honest and fast.
 */
export function Brands() {
  const row = [...brands, ...brands];
  return (
    <section className="hairline-t hairline-b py-6" aria-label="Employers and clients">
      <div className="marquee py-2" style={{ ["--marquee-dur" as string]: "36s" }}>
        <div className="marquee-track items-center gap-8 pr-8">
          {row.map((b, i) => (
            <span key={i} aria-hidden={i >= brands.length || undefined} className="flex shrink-0 items-center gap-8">
              <span className={`t-display whitespace-nowrap text-[clamp(1.4rem,2.4vw,2.2rem)] ${i % 2 ? "t-outline" : "text-[var(--muted)]"}`}>
                {b.name}
              </span>
              <span className="t-label text-[var(--accent)]" aria-hidden>+</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
