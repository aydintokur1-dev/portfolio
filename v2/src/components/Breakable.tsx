import { Fragment } from "react";

/**
 * A name with somewhere to break. Display type sits inside line masks that
 * clip overflow, and a single joined name — PickleballTournaments.com — is
 * wider than a phone. Word-break opportunities go in at camelCase seams and
 * before dots, so it wraps as Pickleball / Tournaments / .com rather than
 * being cut mid-glyph or split wherever the line happens to run out.
 */
export function Breakable({ text }: { text: string }) {
  const parts = text.split(/(?<=[a-z])(?=[A-Z])|(?=\.)/);
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {p}
        </Fragment>
      ))}
    </>
  );
}
