/**
 * Kirk's three-column mono meta bar. Small, spaced, technical —
 * the opposite register from the wordmark, which is the whole point.
 */
export function MetaBar() {
  return (
    <div className="t-mono flex items-center justify-between gap-4 text-text-muted">
      <span>Product designer &amp; design engineer</span>
      <span className="hidden sm:inline">Istanbul, TR · 2026</span>
      <span className="flex items-center gap-2 whitespace-nowrap text-text">
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full bg-[var(--tint-green-dot)] shadow-[0_0_0_3px_var(--tint-green)]"
        />
        Open to work
      </span>
    </div>
  );
}
