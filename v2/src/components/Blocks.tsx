import Image from "next/image";
import type { Block } from "@/content/types";
import { Compare } from "@/components/Compare";
import { getFigure } from "@/lib/images";

/**
 * Case-study block renderer. Text stays in a readable measure; figures use
 * the full content column. Missing images degrade to labeled panels so
 * content and assets can land independently.
 */
export function Blocks({ blocks, slug }: { blocks: Block[]; slug: string }) {
  return (
    <div className="flex flex-col gap-7">
      {blocks.map((b, i) => (
        <BlockView key={i} b={b} slug={slug} />
      ))}
    </div>
  );
}

function BlockView({ b, slug }: { b: Block; slug: string }) {
  switch (b.type) {
    case "p":
      return <p className="t-body max-w-[64ch] text-[var(--muted)]">{b.text}</p>;

    case "h3":
      return <h3 className="t-display t-display-md mt-4 max-w-[30ch]">{b.text}</h3>;

    case "list":
      return (
        <ul className="flex max-w-[64ch] flex-col gap-3">
          {b.items.map((it, i) => (
            <li key={i} className="t-body grid grid-cols-[2.2rem_1fr] gap-2 text-[var(--muted)]">
              <span className="t-label pt-1 text-[rgb(var(--accent-rgb))]">{String(i + 1).padStart(2, "0")}</span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <figure className="my-4 border-l border-[rgb(var(--accent-rgb))] py-1 pl-6">
          <blockquote className="t-display t-display-md max-w-[28ch]" style={{ lineHeight: 1.15 }}>
            “{b.text}”
          </blockquote>
          {b.by && <figcaption className="t-label mt-4 text-[var(--faint)]">{b.by}</figcaption>}
        </figure>
      );

    case "figure":
      return <Fig slug={slug} src={b.figure.src} caption={b.figure.caption} frame={b.figure.frame} />;

    case "figures":
      return (
        <div className="grid gap-5 sm:grid-cols-2">
          {b.figures.map((f, i) => (
            <Fig key={i} slug={slug} src={f.src} caption={f.caption} frame={f.frame} />
          ))}
        </div>
      );

    case "compare":
      return (
        <Compare
          caption={b.caption}
          sides={[
            { img: getFigure(slug, b.before.src), key: b.before.src, label: b.labels?.[0] ?? "BEFORE", caption: b.before.caption },
            { img: getFigure(slug, b.after.src), key: b.after.src, label: b.labels?.[1] ?? "AFTER", caption: b.after.caption },
          ]}
        />
      );

    case "stat":
      return (
        <dl className="my-4 grid gap-8 border-y border-[var(--hairline)] py-8 sm:grid-cols-3">
          {b.items.map((s) => (
            <div key={s.label}>
              <dd className="t-display stat-tick order-first text-[clamp(2rem,3.4vw,3.2rem)]">{s.value}</dd>
              <dt className="t-label mt-3 max-w-[22ch] text-[var(--faint)]">{s.label}</dt>
            </div>
          ))}
        </dl>
      );

    case "decision":
      return (
        <div className="my-4 grid gap-x-8 gap-y-5 rounded-[var(--r-card)] border border-[var(--hairline)] bg-[rgba(242,239,229,0.018)] p-6 sm:grid-cols-2">
          <Cell label="PROBLEM /" text={b.problem} />
          {b.constraint && <Cell label="CONSTRAINT /" text={b.constraint} />}
          <Cell label="DECISION /" text={b.decision} accent />
          {b.outcome && <Cell label="OUTCOME /" text={b.outcome} />}
        </div>
      );
  }
}

function Cell({ label, text, accent }: { label: string; text: string; accent?: boolean }) {
  return (
    <div>
      <p className="t-label" style={{ color: accent ? "rgb(var(--accent-rgb))" : "var(--faint)" }}>{label}</p>
      <p className="t-body mt-2 text-[var(--muted)]">{text}</p>
    </div>
  );
}

function Fig({ slug, src, caption, frame }: { slug: string; src: string; caption?: string; frame?: "scroll" | "full" }) {
  const img = getFigure(slug, src);
  // tall images scroll inside a frame unless the figure asks to be laid out in full
  const tall = img ? img.height / img.width > 1.5 && frame !== "full" : false;
  return (
    <figure>
      <div className={`mat ${tall ? "mat-grounded" : ""}`}>
        {img ? (
          <div className={`mat-img ${tall ? "mat-scroll" : ""}`}>
            <Image src={img.src} width={img.width} height={img.height} alt={caption ?? ""} sizes="(min-width: 1024px) 880px, 100vw" />
          </div>
        ) : (
          <div className="mat-img flex aspect-[16/10] items-center justify-center bg-[var(--recess)]" aria-hidden>
            <span className="t-label text-[var(--faint)]">[ FIG: {src} — TO BE ADDED ]</span>
          </div>
        )}
      </div>
      <figcaption className="t-label mt-3 flex justify-between gap-4 text-[var(--faint)]">
        <span>{caption}</span>
        {tall && <span className="shrink-0">[ SCROLL THE PAGE ↓ ]</span>}
      </figcaption>
    </figure>
  );
}

