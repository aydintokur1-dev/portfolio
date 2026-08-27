/**
 * Safari, and only Safari — WebKit on Mac/iOS with nothing else's engine
 * behind it. Used to swap in cheaper motion where Safari rasterises on the
 * CPU what other engines keep on the GPU: `filter: url()` and large blurs on
 * text, backdrop blur under a scrolling page. Keep the regex in step with the
 * inline copy in `app/layout.tsx`, which stamps `data-safari` on <html> for
 * the CSS side before first paint.
 */
const SAFARI = /^((?!chrome|chromium|crios|fxios|edg|android).)*safari/i;

export const isSafari = () =>
  typeof navigator !== "undefined" && SAFARI.test(navigator.userAgent);
