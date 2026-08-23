/**
 * Motion tokens for JS — mirrors the CSS custom properties in globals.css.
 * One source of truth per medium; keep these in sync by hand (docs/07-MOTION.md).
 */

// Strong ease-out. Built-in curves are too weak for deliberate UI motion.
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

// Durations in seconds (Motion's unit). UI stays under 0.3s; explanatory can run longer.
export const DUR = {
  press: 0.12,
  fast: 0.16,
  base: 0.22,
  slow: 0.32,
  exit: 0.2, // exits are faster than entrances
  reveal: 0.75, // the blur reveal — explanatory tier, deliberately slow
} as const;

// Critically damped: settles, never overshoots. The house default.
export const SPRING_SETTLE = { type: "spring", duration: 0.42, bounce: 0 } as const;
// For the active-section indicator: snappier, still no bounce.
export const SPRING_SNAP = { type: "spring", duration: 0.3, bounce: 0 } as const;

// Tracking spring for the cat — the one place motion is allowed to feel alive.
export const SPRING_ALIVE = { stiffness: 140, damping: 16, mass: 0.6 } as const;
