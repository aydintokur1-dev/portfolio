import Image from "next/image";
import type { Block, Figure, Tint } from "@/content/types";
import { getFigure } from "@/lib/images";

/**
 * Renders a case study's blocks. Prose stays in the column; figures may be
 * "full" (column width) or "inset". Missing images render a tinted placeholder
 * so a page never breaks while assets are still landing.
 */
export function Blocks({ blocks, slug, tint }: { blocks: Block[]; slug: string; tint: Tint }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="t-body measure text-text-muted">
                {b.text}
              </p>
            );
          case "h3":
            return (
              <h3 key={i} className="t-h2 pt-4 text-[1.25rem] text-text">
                {b.text}
              </h3>
            );
          case "list":
            return (
              <ul key={i} className="t-body measure space-y-1.5 text-text-muted">
                {b.items.map((it, j) => (
                  <li key={j} className="flex gap-3">
                    <span aria-hidden className="mt-[0.7em] inline-block size-1.5 shrink-0 rounded-full bg-text-faint" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <figure key={i} className="my-8 border-l-2 border-border-strong pl-5">
                <blockquote className="t-h2 text-[1.25rem] text-text">{b.text}</blockquote>
                {b.by && <figcaption className="t-mono mt-3 text-text-faint">{b.by}</figcaption>}
              </figure>
            );
          case "stat":
            return (
              <dl key={i} className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {b.items.map((s, j) => (
                  <div key={j} className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
                    <dd className="t-h2 text-[1.5rem] text-text">{s.value}</dd>
                    <dt className="t-mono mt-1 text-text-faint">{s.label}</dt>
                  </div>
                ))}
              </dl>
            );
          case "decision":
            return (
              <div key={i} className="my-6 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
                <Row label="Problem" text={b.problem} />
                {b.constraint && <Row label="Constraint" text={b.constraint} />}
                <Row label="Decision" text={b.decision} strong />
                {b.outcome && <Row label="Outcome" text={b.outcome} />}
              </div>
            );
          case "figure":
            return <Fig key={i} slug={slug} tint={tint} figure={b.figure} />;
          case "figures":
            return (
              <div key={i} className="grid gap-3 sm:grid-cols-2">
                {b.figures.map((f, j) => (
                  <Fig key={j} slug={slug} tint={tint} figure={f} />
                ))}
              </div>
            );
        }
      })}
    </div>
  );
}

function Row({ label, text, strong = false }: { label: string; text: string; strong?: boolean }) {
  return (
    <div className="grid gap-1 border-b border-border px-4 py-3 last:border-b-0 sm:grid-cols-[7rem_1fr] sm:gap-4">
      <span className="t-mono pt-[0.2em] text-text-faint">{label}</span>
      <p className={`t-small ${strong ? "text-text" : "text-text-muted"}`}>{text}</p>
    </div>
  );
}

export function Fig({ slug, tint, figure }: { slug: string; tint: Tint; figure: Figure }) {
  const img = getFigure(slug, figure.src);
  const inset = figure.size === "inset";
  // very tall scroll captures: show the top crop, link to the full thing
  const tall = img && img.height > img.width * 2.2;
  const shown = tall && img.top ? { src: img.top, width: 1600, height: 1000 } : img;

  return (
    <figure className={`my-6 ${inset ? "mx-auto max-w-[80%]" : ""}`}>
      <div
        className="overflow-hidden rounded-[var(--radius-md)] border border-border"
        style={{ background: `var(--tint-${tint})` }}
      >
        {shown ? (
          <Image
            src={shown.src}
            width={shown.width}
            height={shown.height}
            alt={figure.caption ?? ""}
            sizes="(min-width: 768px) 720px, 100vw"
            className="block h-auto w-full"
          />
        ) : (
          <div className="aspect-[16/10] w-full" aria-hidden />
        )}
      </div>
      {(figure.caption || tall) && (
        <figcaption className="t-mono mt-2 flex items-center justify-between gap-3 text-text-faint">
          <span>{figure.caption}</span>
          {tall && img && (
            <a href={img.src} target="_blank" rel="noreferrer" className="shrink-0 underline-offset-4 hover:underline">
              Full capture ↗
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}
