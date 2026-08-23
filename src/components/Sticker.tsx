/**
 * Creatie's sticker-tags, rebuilt for dark: a tinted pill with a saturated
 * dot, tilted a degree or two. The tilt is the imperfection budget —
 * cards and stickers only, never text blocks (docs/08-REFERENCES.md).
 */
type Tint = "blue" | "yellow" | "green" | "lavender" | "pink";

export function Sticker({
  children,
  tint = "blue",
  tilt = 0,
  className = "",
}: {
  children: React.ReactNode;
  tint?: Tint;
  tilt?: number;
  className?: string;
}) {
  return (
    <span
      className={`t-mono inline-flex items-center gap-2 rounded-[var(--radius-pill)] border px-3 py-1.5 text-text ${className}`}
      style={{
        background: `var(--tint-${tint})`,
        borderColor: `color-mix(in oklab, var(--tint-${tint}-dot) 28%, transparent)`,
        transform: tilt ? `rotate(${tilt}deg)` : undefined,
        boxShadow: "inset 0 1px 0 rgba(243,239,231,0.06)",
      }}
    >
      <span
        aria-hidden
        className="inline-block size-1.5 rounded-full"
        style={{ background: `var(--tint-${tint}-dot)` }}
      />
      {children}
    </span>
  );
}
