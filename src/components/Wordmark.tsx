/**
 * The name as a modest wordmark — an identity mark, not the hero.
 * Real text, lang="tr" so the dotless ı survives any casing.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span lang="tr" className={`t-wordmark inline-block whitespace-nowrap text-text ${className}`}>
      Aydın Tokur
    </span>
  );
}
