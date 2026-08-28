import * as THREE from "three";
import { PROJECTS } from "./projects";

// Cell aspect matches the plane's 1.5 : 1 so nothing is distorted.
const CELL_W = 640;
const CELL_H = Math.round(CELL_W / 1.5);

// v2 carries no artwork on the ring: every cell is typeset here, in the
// site's own tokens, so the cards read as name plates rather than product
// shots. Tokens and faces are read live off the document so a cell can never
// drift from the theme around it.
// The palette's case tints, in the order the companion hue is picked from.
// Read off the document like everything else, so the cards can only ever be
// colours the rest of the site is already wearing.
const TINT_NAMES = ["blue", "lavender", "pink", "yellow", "green"];
const TINT_FALLBACK = {
  blue: "124, 176, 255",
  lavender: "189, 166, 255",
  pink: "255, 148, 194",
  yellow: "255, 209, 102",
  green: "126, 231, 135",
};

const readTheme = () => {
  const css = getComputedStyle(document.documentElement);
  const v = (name, fb) => css.getPropertyValue(name).trim() || fb;
  const tints = {};
  for (const n of TINT_NAMES) tints[n] = v(`--tint-${n}`, TINT_FALLBACK[n]);
  return {
    tints,
    floor: v("--floor", "#07090f"),
    inkRgb: v("--ink-rgb", "242, 239, 229"),
    ink: v("--ink", "#f2efe5"),
    muted: v("--muted", "rgba(242, 239, 229, 0.62)"),
    faint: v("--faint", "rgba(242, 239, 229, 0.38)"),
    display: `${v("--font-archivo", "")}, "Helvetica Neue", Arial, sans-serif`,
    mono: `${v("--font-jetbrains", "")}, ui-monospace, monospace`,
  };
};

// The name at a size that fits: one line if it can, two balanced lines if it
// must, shrunk only as a last resort. Returns { size, lines }.
const fitName = (ctx, name, face, maxW) => {
  let size = 62;
  const measure = (text, s) => {
    ctx.font = `560 ${s}px ${face}`;
    return ctx.measureText(text).width;
  };

  let lines = [name];
  if (measure(name, size) > maxW && name.includes(" ")) {
    // Balanced break: the split that leaves the two halves nearest equal.
    const words = name.split(" ");
    let best = null;
    for (let i = 1; i < words.length; i++) {
      const a = words.slice(0, i).join(" ");
      const b = words.slice(i).join(" ");
      const w = Math.max(measure(a, size), measure(b, size));
      if (!best || w < best.w) best = { w, lines: [a, b] };
    }
    if (best) lines = best.lines;
  }

  const widest = Math.max(...lines.map((l) => measure(l, size)));
  if (widest > maxW) size = Math.max(26, (size * maxW) / widest);
  return { size, lines };
};

// The ground each card stands on: the floor, washed in the case's own tint
// and lit from one corner, with a fainter second light in a companion tint
// from the same palette. Deep rather than bright — the tint never climbs
// past a third of its strength over the floor, so ink stays ink on top of
// it and the ring reads as one dark object with colour inside it, not
// twelve swatches. Cards sharing a tint are told apart by where the light
// falls and which companion answers it, both dealt from the card's index.
// The card's edge is not painted here — a stroke in the texture is square,
// and the shader rounds the corners off it, so it is drawn on the distance
// field in the plane shader instead, where it follows the card's shape.
const paintGround = (ctx, entry, i, theme) => {
  const tint = theme.tints[entry.tint] ?? theme.tints.blue;
  const own = TINT_NAMES.indexOf(entry.tint);
  const step = 1 + (i % (TINT_NAMES.length - 1));
  const companion =
    theme.tints[TINT_NAMES[(Math.max(0, own) + step) % TINT_NAMES.length]];

  ctx.fillStyle = theme.floor;
  ctx.fillRect(0, 0, CELL_W, CELL_H);

  // Where the light comes from: one of the four corners, walking round
  // with the index so neighbours on the ring never share one.
  const corner = i % 4;
  const lx = corner === 0 || corner === 3 ? 0 : CELL_W;
  const ly = corner < 2 ? 0 : CELL_H;
  const fx = CELL_W - lx;
  const fy = CELL_H - ly;

  // The wash: a diagonal from the lit corner, strong to nearly nothing.
  const wash = ctx.createLinearGradient(lx, ly, fx, fy);
  wash.addColorStop(0, `rgba(${tint}, 0.30)`);
  wash.addColorStop(0.55, `rgba(${tint}, 0.10)`);
  wash.addColorStop(1, `rgba(${tint}, 0.03)`);
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, CELL_W, CELL_H);

  // The light itself, soft and wide, sitting just inside the corner.
  const inset = 40;
  const gx = lx === 0 ? inset : CELL_W - inset;
  const gy = ly === 0 ? inset : CELL_H - inset;
  const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, CELL_W * 0.78);
  glow.addColorStop(0, `rgba(${tint}, 0.34)`);
  glow.addColorStop(0.45, `rgba(${tint}, 0.12)`);
  glow.addColorStop(1, `rgba(${tint}, 0)`);
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CELL_W, CELL_H);

  // The answer from the far corner, in the companion tint, kept quiet.
  const ax = fx === 0 ? -inset : CELL_W + inset;
  const ay = fy === 0 ? -inset : CELL_H + inset;
  const answer = ctx.createRadialGradient(ax, ay, 0, ax, ay, CELL_W * 0.62);
  answer.addColorStop(0, `rgba(${companion}, 0.22)`);
  answer.addColorStop(0.5, `rgba(${companion}, 0.07)`);
  answer.addColorStop(1, `rgba(${companion}, 0)`);
  ctx.fillStyle = answer;
  ctx.fillRect(0, 0, CELL_W, CELL_H);

  // The same whisper of ink the site's other surfaces are lifted by, so the
  // card's black is the panels' black.
  ctx.fillStyle = `rgba(${theme.inkRgb}, 0.018)`;
  ctx.fillRect(0, 0, CELL_W, CELL_H);
};

const paintCell = (ctx, x, y, entry, i, theme) => {
  ctx.save();
  ctx.translate(x, y);
  ctx.beginPath();
  ctx.rect(0, 0, CELL_W, CELL_H);
  ctx.clip();

  paintGround(ctx, entry, i, theme);

  const pad = 34;
  ctx.textBaseline = "alphabetic";

  // Corners: index left, year right — the HUD chrome the site already wears.
  ctx.font = `500 22px ${theme.mono}`;
  ctx.fillStyle = theme.faint;
  ctx.textAlign = "left";
  ctx.fillText(`/${String(i + 1).padStart(2, "0")}`, pad, pad + 18);
  ctx.textAlign = "right";
  ctx.fillText(entry.year.toUpperCase(), CELL_W - pad, pad + 18);

  // The name, centred; the type label sits under it.
  const { size, lines } = fitName(ctx, entry.name, theme.display, CELL_W - pad * 2);
  ctx.textAlign = "center";
  ctx.fillStyle = theme.ink;
  ctx.font = `560 ${size}px ${theme.display}`;
  const lh = size * 1.06;
  const nameCy = CELL_H / 2 + (entry.locked ? -10 : 0);
  const y0 = nameCy - ((lines.length - 1) * lh) / 2 + size * 0.36;
  lines.forEach((l, k) => ctx.fillText(l, CELL_W / 2, y0 + k * lh));

  ctx.font = `500 19px ${theme.mono}`;
  ctx.fillStyle = theme.muted;
  const typeY = y0 + (lines.length - 1) * lh + 46;
  ctx.fillText(entry.type.toUpperCase(), CELL_W / 2, typeY);

  // Gated work says so on the card itself: a small padlock and the ask.
  if (entry.locked) {
    const cy = CELL_H - 52;
    const cx = CELL_W / 2;
    ctx.strokeStyle = theme.faint;
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.arc(cx - 92, cy - 5, 7, Math.PI, 0);
    ctx.moveTo(cx - 99, cy - 5);
    ctx.lineTo(cx - 99, cy);
    ctx.moveTo(cx - 85, cy - 5);
    ctx.lineTo(cx - 85, cy);
    ctx.stroke();
    ctx.fillStyle = theme.faint;
    ctx.beginPath();
    ctx.roundRect(cx - 104, cy, 24, 18, 4);
    ctx.fill();
    ctx.font = `500 17px ${theme.mono}`;
    ctx.textAlign = "left";
    ctx.fillText("PASSWORD ON REQUEST", cx - 68, cy + 15);
  }

  ctx.restore();
};

/**
 * Packs every card into one texture. A single atlas rather than one texture
 * per plane because ESSL 1.00 cannot index an array of samplers with a
 * non-constant index.
 *
 * Unlike the v1 atlas there is nothing to fetch: every cell is painted
 * synchronously, so `first` and `ready` settle immediately and the loader
 * counter only ever waits on the seed's own birth. The cells rasterise type
 * before the site's fonts are necessarily in, so everything is repainted once
 * fonts settle — cosmetic, and gating nothing.
 */
export function buildAtlas(entries = PROJECTS, onProgress, { maxTextureSize = 4096 } = {}) {
  const cols = Math.ceil(Math.sqrt(entries.length));
  const rows = Math.ceil(entries.length / cols);

  // Supersample the sheet. A cell is laid out at CELL_W logical pixels but a
  // card on a retina display shows more device pixels than that, and a
  // texture upscaled through the sampler reads as soft type. Paint at up to
  // 2x, in quarter steps, bounded by what the GPU will hold in one texture.
  const scale = Math.max(
    1,
    Math.min(2, Math.floor((maxTextureSize / (cols * CELL_W)) * 4) / 4, Math.floor((maxTextureSize / (rows * CELL_H)) * 4) / 4),
  );

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(cols * CELL_W * scale);
  canvas.height = Math.round(rows * CELL_H * scale);
  const ctx = canvas.getContext("2d");
  // Every paint below works in logical cell coordinates; the transform
  // persists across repaints (paintCell save/restores around its own work).
  ctx.scale(scale, scale);

  const texture = new THREE.CanvasTexture(canvas);
  // The shader flips each cell itself, so leave the sheet as drawn.
  texture.flipY = false;
  // NoColorSpace deliberately: this shader writes straight to the framebuffer
  // with no encoding step, and decoding on read without encoding on write is
  // what washes everything out.
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  const cellXY = (i) => [(i % cols) * CELL_W, Math.floor(i / cols) * CELL_H];

  const paintAll = () => {
    const theme = readTheme();
    entries.forEach((e, i) => paintCell(ctx, ...cellXY(i), e, i, theme));
    texture.needsUpdate = true;
  };

  paintAll();
  onProgress?.(1);

  if (document.fonts?.ready) {
    document.fonts.ready.then(paintAll);
  }

  return {
    texture,
    grid: [cols, rows],
    count: entries.length,
    first: Promise.resolve(),
    ready: Promise.resolve(),
  };
}
