"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

import {
  vertexShader,
  fragmentShader,
  MAX_PLANES,
  MAX_LINKS,
} from "./shaders/planeShaders";
import { buildAtlas } from "./ring/atlas";
import { createMeta } from "./ring/meta";
import { createSplitText } from "./ring/splitText";
import { createTag, TAG_W, TAG_H } from "./ring/tag";
import { defaultParams } from "./ring/params";
import { PROJECTS } from "./ring/projects";
import { isSafari } from "@/lib/ua";
import {
  TAU,
  HALF_PI,
  DEG,
  chase,
  clamp01,
  easeInOutCubic,
  easeOutCubic,
  signedOffset,
  smoothstep,
} from "./ring/utils";

// The fan starts fractionally into the spread so the seed reads first.
const FAN_START = 0.06;

// Where the ring was when the component last went away with the ring live,
// so the section a visitor comes back to is the one they left: no counter,
// no unfurl, the same card in front. Saved in the effect's cleanup rather
// than at the click that leaves, so a dev-mode strict remount — mount,
// tear down, mount again — resumes too instead of consuming the memo on
// the mount that is thrown away. Never persisted: a reload is a fresh
// visit and gets the entry.
let resumeMemo = null;

const blankTexture = () => {
  const t = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  t.needsUpdate = true;
  return t;
};

export default function Carousel({ onOpen }) {
  // Kept on a ref so the main effect (mounted once) always calls the latest.
  const onOpenRef = useRef(onOpen);
  useEffect(() => {
    onOpenRef.current = onOpen;
  }, [onOpen]);

  const containerRef = useRef(null);
  const listRef = useRef(null);
  // The imperative surface the JSX buttons reach into the effect through:
  // turnTo(cell) for the column, skip() for the gate's way out.
  const apiRef = useRef({});
  const skipRef = useRef(null);
  const infoRef = useRef(null);
  const itemsRef = useRef([]);
  const loaderRef = useRef(null);
  const liveRef = useRef(null);
  const cutRef = useRef(null);
  // Per side: the box that positions the lockup, the filtered wrapper the goo
  // happens inside, the two rows that melt within it, and one more row outside
  // for words carrying over unchanged. See ring/meta.js.
  const metaRef = useRef({
    left: { box: null, goo: null, layers: [], plain: null },
    right: { box: null, goo: null, layers: [], plain: null },
  });

  useEffect(() => {
    const container = containerRef.current;
    const listEl = listRef.current;
    const loaderEl = loaderRef.current;
    // Async work (atlas decode, the lil-gui import) can land after cleanup
    // under StrictMode's double mount. Everything deferred checks this.
    let disposed = false;

    const params = defaultParams();
    // The site's tokens, read live rather than baked in, so the ring keeps to
    // the theme with no second source of truth to drift.
    const themeCss = getComputedStyle(document.documentElement);
    const token = (name, fb) => themeCss.getPropertyValue(name).trim() || fb;
    // "rgba(r, g, b, a)" as the browser resolves it — var() already expanded.
    const rgba = (css, fb) => {
      const m = css.match(/rgba?\(([^)]+)\)/);
      if (!m) return fb;
      const [r, g, b, a = 1] = m[1]
        .split(/[\s,/]+/)
        .filter(Boolean)
        .map(Number);
      return [r / 255, g / 255, b / 255, a];
    };
    // The card corner and edge are the same tokens the testimonial cards
    // wear, so the two read as one family of card.
    const cardRadius = parseFloat(token("--r-card", "16px")) || 16;
    const hairline = rgba(token("--hairline", ""), [
      242 / 255,
      239 / 255,
      229 / 255,
      0.12,
    ]);
    // progress: the seed is born at screen centre
    // launch:   the seed travels out to its place on the ring
    // spread:   the rest peel off it and the ring draws
    // spin:     whole-ring rotation, radians
    // shift:    the ring moves off centre and resizes
    const state = { progress: 0, launch: 0, spread: 0, spin: 0, shift: 0 };
    // Read-only panel readouts, so an invalid ring is visible rather than
    // silent and the reference window can be matched to the live one.
    const info = { restingGap: 0, window: "", scale: 1, band: "wide" };

    // Browsers cap the number of live WebGL contexts (~16 in Chrome). If that
    // is hit, this throws and the rest of the effect never runs — no canvas is
    // appended and the page is simply blank, which is a miserable thing to
    // debug. Fail loudly instead. See the cleanup for why it should not
    // happen: the context is released explicitly rather than left to GC.
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (err) {
      console.error("[ring] could not create a WebGL context:", err);
      return;
    }
    // The plane pass is a full-viewport SDF per frame, so pixels are the
    // cost. Safari's WebGL runs it noticeably slower than Blink's, so it
    // starts a step lower; either way the frame loop steps the ratio down
    // further if frames keep running long, never back up (a ratio that
    // flickers between two sharpnesses is worse than one that is slightly
    // soft).
    const safari = isSafari();
    let dprCap = Math.min(window.devicePixelRatio, safari ? 1.5 : 2);
    renderer.setPixelRatio(dprCap);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -100, 100);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uSize: { value: new THREE.Vector2(150, 100) },
      uRadius: { value: cardRadius },
      uCount: { value: params.count },
      uPos: {
        value: Array.from({ length: MAX_PLANES }, () => new THREE.Vector2()),
      },
      uRot: { value: new Float32Array(MAX_PLANES) },
      // xy = birth scale, z = brightness, w = atlas cell. Packed because a
      // uniform array costs a full vec4 row per element either way.
      uScale: {
        value: Array.from(
          { length: MAX_PLANES },
          () => new THREE.Vector4(0, 0, 1, 0),
        ),
      },
      uLinkCount: { value: 0 },
      uLinkA: {
        value: Array.from({ length: MAX_LINKS }, () => new THREE.Vector2()),
      },
      uLinkB: {
        value: Array.from({ length: MAX_LINKS }, () => new THREE.Vector2()),
      },
      // (rEnd, rMid, sag, fillet), packed to stay inside the uniform budget.
      uLinkPar: {
        value: Array.from({ length: MAX_LINKS }, () => new THREE.Vector4()),
      },
      uK: { value: params.goo },
      uWobble: { value: params.wobble },
      uTime: { value: 0 },
      // The cell surface from ring/atlas.js — floor lifted by the same
      // 0.018 of ink as a testimonial card — so the goo between cards reads
      // as the same material as the cards.
      uColor: {
        value: new THREE.Color(token("--floor", "#07090f")).lerp(
          new THREE.Color(token("--ink", "#f2efe5")),
          0.018,
        ),
      },
      uHairline: { value: new THREE.Vector4(...hairline) },
      uAtlas: { value: blankTexture() }, // placeholder so the sampler is bound
      uGrid: { value: new THREE.Vector2(1, 1) },
      uBlend: { value: params.blend },
      uTextured: { value: 0 },
      uBandTop: { value: 0 },
      uBandBottom: { value: 0 },
      uGlass: { value: new THREE.Vector4() },
      uFringe: { value: 0 },
      uSheen: { value: 0 },
      uMouse: { value: new THREE.Vector4() },
      uMelt: { value: new THREE.Vector4() },
      uTagTex: {
        value: new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1),
      },
      uTag: { value: new THREE.Vector4() },
      uTagP: { value: new THREE.Vector4() },
      uTagQ: { value: new THREE.Vector4() },
      uPage: { value: new THREE.Color(token("--floor", "#07090f")) },
    };

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
      }),
    );
    // Above the type, so the planes occlude it as the ring sweeps past.
    mesh.renderOrder = 10;
    scene.add(mesh);

    const textGroup = new THREE.Group();
    scene.add(textGroup);

    const splitText = createSplitText(textGroup, params);
    const tag = createTag(params, uniforms);
    const meta = createMeta(
      {
        groups: metaRef.current,
        list: listEl,
        loader: loaderEl,
        cut: cutRef.current,
        live: liveRef.current,
      },
      params,
      // Safari rasterises the goo filter and the word blur on the CPU every
      // frame of a morph — 200–400ms stalls per card. It gets a crossfade.
      { plain: safari },
    );

    /* ---------------------------------------------------------------- art */
    // The atlas is bound on frame one and fills in as images arrive, so the
    // seed can be born already wearing its own art while the rest are still
    // in flight. It is also what gives the counter something to count.
    let firstIn = false; // the seed's own cell is on the texture
    let loadProg = 0; // and how much of the rest has arrived, 0..1

    // Opened on the frame the counter reads 100, and by nothing else — that is
    // what makes the number landing and the ring launching the same moment.
    let launchReady = false;
    const readyWaiters = [];
    const whenReady = (fn) => (launchReady ? fn() : readyWaiters.push(fn));

    const atlas = buildAtlas(PROJECTS, (p) => {
      if (!disposed) loadProg = p;
    });

    uniforms.uAtlas.value.dispose();
    atlas.texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    uniforms.uAtlas.value = atlas.texture;
    uniforms.uGrid.value.set(atlas.grid[0], atlas.grid[1]);
    // Up front, not on completion: the cell each plane wears is derived from
    // this and has to be right from the first frame, blank cells or not.
    const imageCount = atlas.count;

    // Art is dealt by ring slot, not plane index. Planes are numbered in fan
    // order, so dealing by index puts every other project side by side and
    // steps the column two names per slot. Negated because turning the ring
    // forward walks the front slot backwards. Hoisted out of the layout loop
    // so the column's click handler can run the same deal in reverse.
    const cellOfSlot = (slot) => {
      const off = Math.round(params.imageOffset);
      return imageCount > 0
        ? (((off - slot) % imageCount) + imageCount) % imageCount
        : 0;
    };

    atlas.first.then(() => {
      if (!disposed) firstIn = true;
    });
    atlas.ready.then(() => {
      if (!disposed) loadProg = 1;
    });

    /* --------------------------------------------------------------- size */
    let viewW = 1;
    let viewH = 1;
    // Cached: the pointer is tracked on every move, and reading the rect each
    // time is a forced layout. Only a resize can invalidate it.
    const bounds = { left: 0, top: 0 };

    // How far this window is from the reference one. Every px param is
    // multiplied through by it, so it is computed on resize and never in the
    // loop. planeK / radiusK / textK are the breakpoint bumps on top.
    let fit = 1;
    let planeK = 1;
    let radiusK = 1;
    let textK = 1;
    // Kept as flags rather than resolved into values here, so anything picked
    // off them still answers to the dev panel between resizes.
    let narrowNow = false;
    let tightNow = false;

    const refit = () => {
      const byW = viewW / Math.max(1, params.refWidth);
      const byH = viewH / Math.max(1, params.refHeight);
      const s =
        byW * (1 - params.fitHeight) + Math.min(byW, byH) * params.fitHeight;
      fit = Math.min(params.maxScale, Math.max(params.minScale, s));

      const narrow = viewW <= params.narrowAt;
      const tight = viewW <= params.tightAt;
      narrowNow = narrow;
      tightNow = tight;
      planeK = narrow ? params.narrowPlane : 1;
      // The bands stack: tight sits inside narrow and pulls the arc back in
      // from where narrow had pushed it out to.
      radiusK =
        (narrow ? params.narrowRadius : 1) * (tight ? params.tightRadius : 1);
      textK = narrow ? params.narrowText : 1;

      info.window = `${Math.round(viewW)} x ${Math.round(viewH)}`;
      info.scale = Math.round(fit * 1000) / 1000;
      info.band = tight ? "tight" : narrow ? "narrow" : "wide";

      // The heading is rasterised per glyph, so it cannot be re-sized without
      // rebuilding every texture mid-animation. Scaling the group costs
      // nothing and stays sharp — the glyphs are drawn at 2x display already.
      const k = fit * textK * (tight ? params.tightSplit : 1);
      textGroup.scale.set(k, k, 1);
    };

    const styleMeta = () =>
      meta.style({ textK, tight: tightNow, viewW: viewW });

    const resize = () => {
      viewW = container.clientWidth;
      viewH = container.clientHeight;
      refit();
      renderer.setSize(viewW, viewH);
      camera.left = -viewW / 2;
      camera.right = viewW / 2;
      camera.top = viewH / 2;
      camera.bottom = -viewH / 2;
      camera.updateProjectionMatrix();
      mesh.scale.set(viewW, viewH, 1);
      uniforms.uResolution.value.set(viewW, viewH);

      const rect = renderer.domElement.getBoundingClientRect();
      bounds.left = rect.left;
      bounds.top = rect.top;
    };

    // styleMeta too, because the breakpoint bumps are steps that vw units
    // cannot express on their own.
    const onResize = () => {
      resize();
      styleMeta();
    };

    resize();
    window.addEventListener("resize", onResize);

    /* ------------------------------------------------------- spin & input */
    const ringCentre = { x: 0, y: 0 };
    // Which way "front" is: from the ring's centre toward the middle of the
    // screen. Once the ring is off centre that is no longer 3 o'clock.
    let frontAngle = 0;
    let interactive = false;
    let spinVel = 0; // rad/s
    let dragging = false;
    let dragPrevAngle = 0;
    let dragPrevTime = 0;

    // The snap is a phase, not a force that is always on: a flick coasts
    // untouched, and once it is nearly spent the ring commits to a slot and
    // runs itself in. snapTo is that slot, snapCap the speed it came in at.
    let settling = false;
    let snapTo = 0;
    // How far the run-in still has to go, in slots; 1 while not settling.
    // Once it is under a fraction of a slot the card at the front is decided,
    // and the name can arrive with it rather than a second and a half later
    // when the last hundredth of a degree finally parks.
    let landing = 1;
    let snapCap = 0;

    // A click is turning the ring to a card. While this is up the momentum
    // above is suspended entirely, so the two cannot both drive spin.
    let picking = false;

    let pointerTravel = 0; // tells a click from a drag
    let travelX = 0;
    let travelY = 0;

    const pointerAngle = (e) => {
      const dx = e.clientX - bounds.left - ringCentre.x;
      const dy = e.clientY - bounds.top - ringCentre.y;
      return Math.atan2(-dy, dx);
    };

    const stopPick = () => {
      if (!picking) return;
      gsap.killTweensOf(state);
      picking = false;
    };

    // Where the ring has to be for plane i to face front: the nearest
    // equivalent winding, so it takes the short way round rather than
    // unwinding whole turns. Every card is within half a ring.
    const planeTarget = (i) => {
      const slot = TAU / Math.round(params.count);
      // Spread, plane i sits at seed + signedOffset(i) * slot + spin.
      const base = frontAngle - params.seed * DEG - signedOffset(i) * slot;
      const target = base + Math.round((state.spin - base) / TAU) * TAU;
      return { target, slots: Math.abs(target - state.spin) / slot };
    };

    // A tween rather than a target handed to the snap: the snap is a run-in
    // for a throw that is nearly spent and is shaped so it can only slow
    // down, but a pick starts from a standstill and has to accelerate.
    const spinTo = (target, slots) => {
      spinVel = 0;
      settling = false;
      picking = true;
      gsap.killTweensOf(state);
      gsap.to(state, {
        spin: target,
        // Root of the distance, not linear: a card eight slots round should
        // take longer than its neighbour but not eight times longer.
        duration: params.pickTime * Math.sqrt(Math.max(1, slots)),
        ease: params.pickEase,
        onComplete: () => {
          picking = false;
        },
      });
    };

    // Turn the ring until plane i faces front.
    const pick = (i) => {
      const { target, slots } = planeTarget(i);
      // Already at the front: this click is the "View" tag's promise. The
      // project it opens is the cell the front plane is wearing (`shown`).
      if (slots < 0.01) {
        // The gate has to let go before the route changes, or the case page
        // arrives with the document locked under it.
        release();
        onOpenRef.current?.(PROJECTS[shown]?.slug);
        return;
      }
      spinTo(target, slots);
    };

    // The column's way in: turn the ring until the plane wearing cell c
    // faces front. Planes and cells are one-to-one in v2, but the search is
    // kept general so a re-dealt ring still picks the nearest wearer.
    const turnToCell = (c) => {
      if (!interactive) return;
      const count = Math.round(params.count);
      let best = null;
      for (let i = 0; i < count; i++) {
        if (cellOfSlot(signedOffset(i)) !== c) continue;
        const t = planeTarget(i);
        if (!best || t.slots < best.slots) best = t;
      }
      if (!best || best.slots < 0.01) return;
      stopPick();
      spinTo(best.target, best.slots);
    };

    /* ------------------------------------------------------------ pointer */
    // World px, origin at screen centre, Y up — the space the shader works in,
    // so nothing is converted twice.
    //
    // `inside` means the position is worth reading, which is what the card hit
    // test needs. Whether the softening is *on* is a separate question,
    // because on touch it is not simply "is there a pointer".
    const pointer = { x: 0, y: 0, inside: false, seeded: false };
    // What the ring actually follows: the cursor, smoothed. How far this
    // trails the real pointer stands in for speed and drives the wake.
    const cursor = { x: 0, y: 0, amt: 0, wake: 0 };

    // Read off the events rather than a media query, so a laptop with a
    // touchscreen behaves as whichever is being used at the time.
    let coarse = false;
    let held = false;
    let holdTimer = 0;

    const endHold = () => {
      clearTimeout(holdTimer);
      holdTimer = 0;
      held = false;
    };

    const beginHold = () => {
      clearTimeout(holdTimer);
      holdTimer = setTimeout(() => {
        held = true;
      }, params.touchHold * 1000);
    };

    // Mouse: being over it is the whole gesture. Touch: only a press held
    // still long enough to mean it.
    const engaged = () => (coarse ? held : pointer.inside);

    const trackPointer = (e) => {
      coarse = e.pointerType === "touch";
      pointer.x = e.clientX - bounds.left - viewW * 0.5;
      pointer.y = viewH * 0.5 - (e.clientY - bounds.top);
      pointer.inside = true;
      // Otherwise the first move sweeps the softening across the ring from
      // wherever the cursor was last left.
      if (!pointer.seeded) {
        pointer.seeded = true;
        cursor.x = pointer.x;
        cursor.y = pointer.y;
      }
    };

    const onPointerLeave = () => {
      pointer.inside = false;
    };

    // Keeps the cached canvas rect honest for the pointer math while the
    // page is moving; the ring itself is fed by the gate's wheel below. The
    // gate is checked from here as well as the frame loop: the loop is
    // parked while the section is off screen, and a hard fling can carry
    // the section across the whole viewport between one frame and the next
    // — a crossing the observer that wakes the loop never sees.
    const onScroll = () => {
      const rect = renderer.domElement.getBoundingClientRect();
      bounds.left = rect.left;
      bounds.top = rect.top;
      gateCheck();
    };

    /* --------------------------------------------------------------- gate */
    // v2 captures the section: the page stops on the ring and stays until
    // the tour has reached the last card — or is skipped. Lenis owns the
    // page scroll on every browser this branch renders in, so the lock is
    // lenis.stop() plus overflow, and the wheel is read directly. The hold
    // re-arms on every downward arrival: the section is the tour, and a
    // visitor scrolling back into it expects the wheel to turn the cards,
    // not the page. Both ends stay one wheel-tick from letting go, so a
    // second arrival on the last card costs nothing.
    let gateLocked = false;

    const lenis = () => window.__lenis ?? null;

    // The skip control only offers itself while there is something to skip.
    const paintSkip = () => {
      const el = skipRef.current;
      if (!el) return;
      el.style.opacity = gateLocked ? "1" : "0";
      el.style.pointerEvents = gateLocked ? "auto" : "none";
    };

    // Put the section's top edge exactly on the viewport's.
    const seat = () => {
      const top = window.scrollY + container.getBoundingClientRect().top;
      const l = lenis();
      if (l) l.scrollTo(top, { immediate: true, force: true });
      else window.scrollTo(0, top);
    };
    // While set, the frame loop keeps the section seated — the resume path
    // below, riding out whatever scroll the router restores after mount.
    let seatUntil = 0;
    // One-shot: the next meta change is written without its morph.
    let metaInstant = false;

    const lock = () => {
      if (gateLocked) return;
      gateLocked = true;
      // Hold the page, then seat the section under it: a glide when a fling
      // carried it well past the edge, a snap when it is nearly there. Lenis
      // has to stop first — stopping resets whatever it was animating — and
      // the seat is forced through the stop; its raf still advances it.
      const off = container.getBoundingClientRect().top;
      const top = window.scrollY + off;
      const l = lenis();
      if (l) {
        l.stop();
        l.scrollTo(
          top,
          Math.abs(off) > 60
            ? { duration: 0.45, force: true }
            : { immediate: true, force: true },
        );
      } else {
        window.scrollTo(0, top);
      }
      document.documentElement.style.overflow = "hidden";
      const rect = renderer.domElement.getBoundingClientRect();
      bounds.left = rect.left;
      bounds.top = rect.top;
      paintSkip();
    };

    const release = () => {
      if (gateLocked) {
        gateLocked = false;
        document.documentElement.style.overflow = "";
        lenis()?.start();
      }
      paintSkip();
    };

    const skip = () => {
      const bottom = window.scrollY + container.getBoundingClientRect().bottom;
      release();
      const l = lenis();
      if (l) l.scrollTo(bottom, { duration: 1.1 });
      else window.scrollTo({ top: bottom, behavior: "smooth" });
    };

    // Engaged from the frame loop rather than a scroll listener, so the test
    // rides the same cadence Lenis animates on. It catches the crossing —
    // top edge above the line this frame, below it last frame — however far
    // the lerp overshot (a hard fling moves the page more than the section's
    // own height in one frame), and seats the section back. It does not wait for the entry to
    // finish: the page has to stop the moment the section arrives, or a
    // visitor still scrolling while the ring builds is past it before the
    // gate is awake. Only a downward arrival arms it: coming back up from
    // the footer shouldn't seat the section just to be released a
    // wheel-tick later. While the resume path is seating the section, the
    // edge is tracked but not acted on — the router bringing a returning
    // visitor back to where they were is not an arrival.
    // Read at mount, not left at infinity: a page opened on a hash below the
    // section — /#about — must not read as having crossed it on its way in.
    let prevTop = container.getBoundingClientRect().top;
    // While set, crossings are not arrivals: a navigational jump (the HUD's
    // About, the hero's Contact) is carrying the page past the section, and
    // a visitor who pressed a button has to land where it said. The
    // window outlasts the jump's own scroll; the next wheel gesture — the
    // visitor scrolling on purpose again — ends it early.
    let bypassUntil = 0;
    const gateCheck = () => {
      if (gateLocked) return;
      const rect = container.getBoundingClientRect();
      if (
        !seatUntil &&
        performance.now() >= bypassUntil &&
        rect.top <= 12 &&
        prevTop > 12
      )
        lock();
      prevTop = rect.top;
    };

    // Navigation announces itself before it scrolls (AnchorNav). Let go if
    // holding, and don't take hold again on the way past.
    const onNavJump = () => {
      release();
      seatUntil = 0;
      bypassUntil = performance.now() + 2500;
    };

    // One card per gesture. A wheel gesture is not one event: a mouse notch
    // is one, but a trackpad flick is dozens, tailing off for most of a
    // second — fed straight into velocity that is two or three cards, never
    // one. So the first event past a small threshold steps a slot and the
    // handler disarms. It re-arms two ways: when the events have stopped
    // for a beat (a flick's inertia tail is swallowed, the next flick is the
    // next card), or — for fingers that never leave the pad — once a short
    // cooldown has passed and a delta comes in no smaller than the last,
    // which a decaying tail never produces. Continuous scrolling then walks
    // the cards at a steady cadence instead of stepping once and going dead.
    const WHEEL_THRESHOLD = 30;
    const WHEEL_QUIET_MS = 160;
    const WHEEL_COOLDOWN_MS = 550;
    const WHEEL_LIVE_DELTA = 8;
    let wheelArmed = true;
    let wheelAcc = 0;
    let wheelQuiet = 0;
    let wheelLastAbs = 0;
    let wheelLastStep = -Infinity;

    // One slot of coast per step: v / decay is the distance the damping
    // lets a velocity carry, so this lands exactly one card along.
    const step = (dir) => {
      const slot = TAU / Math.round(params.count);
      const decay = Math.max(0.01, -Math.log(params.damping) * 60);
      stopPick();
      settling = false;
      spinVel = dir * slot * decay;
    };

    const onWheel = (e) => {
      // The visitor is scrolling on purpose; stop holding the section still,
      // and stop waving it through.
      seatUntil = 0;
      bypassUntil = 0;
      if (!gateLocked) return;
      e.preventDefault();
      // Held, not fed, until the entry has handed the ring over.
      if (!interactive) return;

      clearTimeout(wheelQuiet);
      wheelQuiet = setTimeout(() => {
        wheelArmed = true;
        wheelAcc = 0;
        wheelLastAbs = 0;
      }, WHEEL_QUIET_MS);

      const now = performance.now();
      const abs = Math.abs(e.deltaY);
      const live = abs >= WHEEL_LIVE_DELTA && abs >= wheelLastAbs;
      wheelLastAbs = abs;
      if (!wheelArmed) {
        if (!live || now - wheelLastStep < WHEEL_COOLDOWN_MS) return;
        wheelArmed = true;
        wheelAcc = 0;
      }

      wheelAcc += e.deltaY;
      if (Math.abs(wheelAcc) < WHEEL_THRESHOLD) return;
      const dir = Math.sign(wheelAcc);
      wheelAcc = 0;
      wheelArmed = false;
      wheelLastStep = now;

      // The way out, both ends: forward once the last card has come to the
      // front — hitting the last project is what lets the page carry on
      // down — and backward off the first.
      if (dir > 0 && shown === imageCount - 1) {
        release();
        return;
      }
      if (dir < 0 && shown === 0) {
        release();
        return;
      }
      step(dir);
    };

    const onKeyDown = (e) => {
      if (!gateLocked) return;
      if (e.key === "Escape") {
        e.preventDefault();
        skip();
        return;
      }
      const down =
        e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ";
      const up = e.key === "ArrowUp" || e.key === "PageUp";
      if (!down && !up) return;
      e.preventDefault();
      if (!interactive) return;
      if (down && shown === imageCount - 1) {
        release();
        return;
      }
      if (up && shown === 0) {
        release();
        return;
      }
      step(down ? 1 : -1);
    };

    apiRef.current = { turnTo: turnToCell, skip };

    const onPointerDown = (e) => {
      pointerTravel = 0;
      travelX = e.clientX;
      travelY = e.clientY;
      trackPointer(e);
      if (!interactive) return;
      stopPick();
      if (coarse) beginHold();
      dragging = true;
      settling = false;
      spinVel = 0;
      dragPrevAngle = pointerAngle(e);
      dragPrevTime = performance.now();
      renderer.domElement.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      trackPointer(e);

      // From coordinates, not movementX/Y: those are zero for touch in Safari,
      // which would make every swipe look stationary and end in a tap.
      pointerTravel +=
        Math.abs(e.clientX - travelX) + Math.abs(e.clientY - travelY);
      travelX = e.clientX;
      travelY = e.clientY;
      // Only before the hold takes. After that, moving drags the ring and the
      // melt together, same as a drag with the cursor down.
      if (coarse && !held && pointerTravel > params.touchSlop) endHold();

      if (!dragging) return;

      const a = pointerAngle(e);
      let delta = a - dragPrevAngle;
      // Short way round, so crossing the +/-pi seam does not snap.
      if (delta > Math.PI) delta -= TAU;
      if (delta < -Math.PI) delta += TAU;

      const turn = delta * params.dragSpeed;
      state.spin += turn;

      const now = performance.now();
      spinVel = turn / (Math.max(8, now - dragPrevTime) / 1000);
      dragPrevAngle = a;
      dragPrevTime = now;
    };

    const onPointerUp = (e) => {
      // Releasing the capture fires a leave at the container even though the
      // cursor never went anywhere, so re-track before anything else.
      trackPointer(e);
      // The finger is gone; a cursor is still there.
      endHold();
      if (!dragging) return;
      dragging = false;
      renderer.domElement.releasePointerCapture?.(e.pointerId);
    };

    // A drag ends in a click too, so only a near-stationary press counts.
    // `over` comes from the same hit test that decides the tag, so a click
    // only ever lands on the card the tag was offering.
    const onClick = () => {
      if (!interactive || pointerTravel >= 5 || over < 0) return;
      pick(over);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("nav:jump", onNavJump);
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("pointerleave", onPointerLeave);
    container.addEventListener("click", onClick);

    const updatePointer = (dt) => {
      // Held off until the entry finishes, so the cursor cannot soften the
      // ring while the timeline is still drawing it.
      const live = params.hover && engaged() && pointer.seeded && interactive;
      cursor.amt += ((live ? 1 : 0) - cursor.amt) * chase(dt, 0.12);

      const k = chase(dt, params.lag);
      cursor.x += (pointer.x - cursor.x) * k;
      cursor.y += (pointer.y - cursor.y) * k;

      // The gap left behind the real pointer stands in for speed. Instant
      // attack, slow release, so the wake outlives the movement.
      const trail = Math.hypot(pointer.x - cursor.x, pointer.y - cursor.y);
      cursor.wake = Math.max(
        cursor.wake * Math.pow(0.94, dt * 60),
        clamp01(trail / (Math.max(dt, 0.001) * 2600)),
      );

      // Scaled by fit like the ring: a reach in raw px would cross two cards
      // on a small window and half of one on a large. Frequencies are not.
      uniforms.uMouse.value.set(
        cursor.x,
        cursor.y,
        cursor.amt,
        params.melt * fit,
      );
      uniforms.uMelt.value.set(
        params.meltReach * fit,
        params.wave * fit * cursor.wake * cursor.amt,
        params.waveFreq,
        params.waveSpeed,
      );
    };

    /* ------------------------------------------------------- load counter */
    // Reads whichever of the two is further behind: the art arriving, or the
    // seed's own birth. Both have to finish before there is anything to
    // launch, so counting bytes alone leaves the number sitting on 100 waiting
    // for a condition nobody told the viewer about.
    const loading = { shown: 0 };

    const tickLoader = (dt) => {
      const target = Math.min(loadProg, clamp01(state.progress));
      loading.shown += (target - loading.shown) * chase(dt, params.loaderChase);

      // Never 000; that reads as nothing happening.
      const n = Math.min(100, Math.max(1, Math.round(loading.shown * 100)));
      if (loaderEl) loaderEl.textContent = String(n).padStart(3, "0");

      if (!launchReady && n >= 100) {
        launchReady = true;
        for (const fn of readyWaiters) fn();
        readyWaiters.length = 0;
      }
    };

    /* ------------------------------------------------------- the carousel */
    const travel = new Float32Array(MAX_PLANES);
    const cum = new Float32Array(MAX_PLANES);
    const order = [];
    // Where each plane would sit with no cursor near it. The honey is measured
    // off these, so hovering cannot feed back into the unfurl's geometry.
    const rest = Array.from({ length: MAX_PLANES }, () => new THREE.Vector2());

    // Per-plane response to the pointer, eased rather than recomputed from
    // where it is, so the ring trails the cursor and settles back on its own.
    const hoverF = new Float32Array(MAX_PLANES);
    const leanX = new Float32Array(MAX_PLANES);
    const leanY = new Float32Array(MAX_PLANES);
    const webF = new Float32Array(MAX_LINKS);
    // The other half of it: how much a plane is standing aside for the card
    // being pointed at. Zero on that card, zero when there isn't one.
    const sideF = new Float32Array(MAX_PLANES);
    // Where the hovered card is, latched at the end of a frame for the next
    // one. The hit test runs inside the loop and every plane needs an answer
    // before the loop reaches that card, so this is deliberately one frame
    // behind — it is eased over ten of them anyway. Not reset when the cursor
    // leaves: the direction has to stay meaningful while the push decays.
    const focusPos = new THREE.Vector2();

    const swellOf = (i) =>
      Math.max(
        0.05,
        1 + params.swell * hoverF[i] - params.sideScale * sideF[i],
      );

    // Which card is at the front, and which is under the cursor.
    let shown = -1;
    let announced = -1;
    let over = -1;
    let tagUp = false;

    const paintList = () => {
      const items = itemsRef.current;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) continue;
        const on = i === shown;
        el.style.opacity = on ? "1" : "0.2";
        if (on) el.setAttribute("aria-current", "true");
        else el.removeAttribute("aria-current");
      }
    };

    // The dossier bottom-left: what the front card actually is — claim,
    // role, a couple of lines of the summary. Swapped as the lockups morph,
    // and carrying the card's own tint so the accent follows the work.
    const showInfo = (i) => {
      const el = infoRef.current;
      const p = PROJECTS[i];
      if (!el || !p) return;
      const slots = {};
      for (const node of el.querySelectorAll("[data-slot]"))
        slots[node.dataset.slot] = node;
      gsap.killTweensOf(el);
      gsap.to(el, {
        opacity: 0,
        y: 10,
        duration: 0.22,
        ease: "power2.in",
        onComplete: () => {
          el.style.setProperty("--accent-rgb", `var(--tint-${p.tint})`);
          if (slots.role) slots.role.textContent = `${p.role} · ${p.year}`;
          if (slots.title) slots.title.textContent = p.title;
          if (slots.summary) slots.summary.textContent = p.summary;
          if (slots.cta)
            slots.cta.textContent = p.locked
              ? "[ password ] — click the card, the door will ask"
              : "click the card to open ↗";
          gsap.to(el, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
        },
      });
    };

    const layout = (dt) => {
      const count = Math.round(params.count);
      uniforms.uCount.value = count;

      const step = TAU / count;
      const spread = clamp01(state.spread);

      // Band values are picked per frame rather than latched on resize, so
      // dragging any of these sliders shows up straight away.
      const endScale = narrowNow ? params.narrowEndScale : params.endScale;
      const posX = tightNow
        ? params.tightPosX
        : narrowNow
          ? params.narrowPosX
          : params.posX;

      // The stage transform. Everything in plane-pixels goes through g, which
      // is why the window fit rides in here rather than on a dozen params.
      const shift = clamp01(state.shift);
      const g = (1 + (endScale - 1) * shift) * fit;
      const cx = posX * viewW * 0.5 * shift;
      const cy = params.posY * viewH * 0.5 * shift;

      // Screen-space centre, for pointer maths. World Y is up, page Y is down.
      ringCentre.x = viewW * 0.5 + cx;
      ringCentre.y = viewH * 0.5 - cy;
      // A plane faces front when the ring centre, that plane and the middle of
      // the screen line up. Before the stage move there is no front, so 3
      // o'clock stands in.
      frontAngle = cx !== 0 || cy !== 0 ? Math.atan2(-cy, -cx) : 0;

      // Anything measured in plane long edges — hover reach, thread reach,
      // side falloff — comes off W, so the narrow bump reaches them for free.
      const W = params.planeSize * planeK * g;
      const H = W / 1.5;
      uniforms.uSize.value.set(W, H);
      // Fixed in screen px, like --r-card on every other card on the site:
      // the ring's cards are the same card, only bigger.
      uniforms.uRadius.value = cardRadius;

      // Radial: the long edge points outward, so a plane's reach toward its
      // neighbour is its short axis and the facing edges are the long ones.
      const sepExtent = params.radial ? H : W;
      const faceEdge = params.radial ? W : H;

      const R = params.ringRadius * radiusK * g;
      const restingGap = 2 * R * Math.sin(step / 2) - sepExtent;
      info.restingGap = Math.round((restingGap / g) * 10) / 10;
      // The whole stretch plays out across this, so it is the yardstick.
      const finalSep = Math.max(1, restingGap);

      // Every generation is in flight at once, offset by a small phase, so
      // this is one continuous unfurl and not a queue of separate pops.
      const maxN = Math.max(1, Math.abs(signedOffset(count - 1)));
      const dur = Math.max(0.1, 1 - FAN_START - params.stagger);

      // Cumulative, so an unborn plane sits exactly on top of its parent and
      // is peeled out of it one ring step at a time.
      cum[0] = 0;
      for (let n = 1; n <= maxN; n++) {
        const start = FAN_START + ((n - 1) / maxN) * params.stagger;
        const t = clamp01((spread - start) / dur);
        const e = t * t * (3 - 2 * t);
        travel[n] = e;
        cum[n] = cum[n - 1] + e;
      }

      const seedAngle = params.seed * DEG;
      // The seed is born flat at centre then rides out. Applied as the radius
      // rather than an offset on plane 0, so scrubbing the timeline stays
      // consistent — the unborn are stacked on the seed either way.
      const launch = easeInOutCubic(clamp01(state.launch));
      const Rnow = R * launch;

      order.length = 0;

      const track = cursor.amt > 0.001;
      const reach = Math.max(1, params.reach * W);
      const sideReach = Math.max(1, params.sideReach * W);
      // Asymmetric on purpose: the ring takes up a lean quickly and lets go
      // slowly. Equal rates read as a mechanism following the cursor; the gap
      // between them is what reads as something viscous.
      const kRise = chase(dt, params.grab);
      const kFall = chase(dt, params.release);

      // Nearest plane to front, in angle rather than screen distance: two
      // planes can sit equally far from the middle, but only one faces it.
      let frontI = -1;
      let frontD = 1e9;
      let frontCell = 0;

      // Which card the cursor is on. Independent of the hover falloff above:
      // turning the goo off should not take the tag with it.
      const probe = pointer.inside && pointer.seeded && interactive;
      let overI = -1;
      // Which card the rest are standing aside for, from last frame.
      const focusI = track ? over : -1;

      for (let i = 0; i < count; i++) {
        const sIdx = signedOffset(i);
        const n = Math.abs(sIdx);
        const u = i === 0 ? clamp01(state.progress) : travel[n];
        const cell = cellOfSlot(sIdx);

        const angle = seedAngle + Math.sign(sIdx) * step * cum[n] + state.spin;
        const px = Math.cos(angle) * Rnow + cx;
        const py = Math.sin(angle) * Rnow + cy;
        rest[i].set(px, py);

        // atan2 of the difference wraps to +/-pi, so the seam costs nothing.
        const da = angle - frontAngle;
        const toFront = Math.abs(Math.atan2(Math.sin(da), Math.cos(da)));
        if (toFront < frontD) {
          frontD = toFront;
          frontI = i;
          frontCell = cell;
        }

        // Lean toward the cursor. Scaled by u so the unborn keep out of it:
        // they are stacked on their parent, and without this the whole stack
        // would lean at once and drag the seed off the ring.
        let f = 0;
        let toX = 0;
        let toY = 0;
        if (track) {
          const dx = cursor.x - px;
          const dy = cursor.y - py;
          const dist = Math.hypot(dx, dy);
          f = smoothstep(reach, reach * 0.22, dist) * cursor.amt * u;
          if (f > 0.0001 && dist > 0.0001) {
            const lean = (params.pull * fit * f) / dist;
            toX = dx * lean;
            toY = dy * lean;
          }
        }

        // One rate for the whole of a plane's response, so the swell, the lean
        // and the honey it feeds move together instead of drifting apart.
        const k = f > hoverF[i] ? kRise : kFall;
        hoverF[i] += (f - hoverF[i]) * k;
        leanX[i] += (toX - leanX[i]) * k;
        leanY[i] += (toY - leanY[i]) * k;

        // Standing aside. Measured from the hovered card, not the cursor, so
        // the response holds steady while the cursor moves around inside it.
        let sf = 0;
        if (focusI >= 0 && i !== focusI) {
          const d = Math.hypot(focusPos.x - px, focusPos.y - py);
          sf = smoothstep(sideReach, sideReach * 0.2, d) * u;
        }
        // Its own rate: a card can be letting go of a lean at the same moment
        // it is asked to back away, and sharing one would make the second
        // thing sluggish.
        sideF[i] += (sf - sideF[i]) * (sf > sideF[i] ? kRise : kFall);

        // Straight off the eased factor — sideF is already smooth, and easing
        // it twice would only add lag.
        let pushX = 0;
        let pushY = 0;
        if (sideF[i] > 0.0001) {
          const dx = px - focusPos.x;
          const dy = py - focusPos.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.0001) {
            const away = (params.sidePush * fit * sideF[i]) / dist;
            pushX = dx * away;
            pushY = dy * away;
          }
        }

        uniforms.uPos.value[i].set(
          px + leanX[i] + pushX,
          py + leanY[i] + pushY,
        );
        uniforms.uRot.value[i] =
          (params.radial ? angle : angle + HALF_PI) * launch;

        // The seed grows over its whole birth. The others are already there,
        // merged inside their parent, so they reach full size early and spend
        // the rest of their travel pulling away.
        const sx =
          i === 0
            ? easeOutCubic(clamp01(u / 0.7))
            : easeOutCubic(clamp01(u / 0.34));
        const sy =
          i === 0
            ? easeOutCubic(clamp01((u - 0.18) / 0.74))
            : easeOutCubic(clamp01((u - 0.06) / 0.36));
        // The swell rides on the birth scale rather than uSize, so a plane
        // under the cursor grows about its own centre.
        const sw = swellOf(i);
        uniforms.uScale.value[i].set(
          sx * sw,
          sy * sw,
          1 - params.sideDim * sideF[i],
          cell,
        );

        // Same box the shader draws, tested in the plane's own frame, so it
        // answers for the card as it actually is: turned, leaned and swollen.
        // Cards never overlap once formed, so the first hit is the only hit.
        if (probe && overI < 0) {
          const rot = uniforms.uRot.value[i];
          const qx = cursor.x - (px + leanX[i] + pushX);
          const qy = cursor.y - (py + leanY[i] + pushY);
          const cr = Math.cos(rot);
          const sr = Math.sin(rot);
          if (
            Math.abs(qx * cr + qy * sr) <= W * 0.5 * sx * sw &&
            Math.abs(-qx * sr + qy * cr) <= H * 0.5 * sy * sw
          ) {
            overI = i;
          }
        }

        order.push(i);
      }

      for (let i = count; i < MAX_PLANES; i++) {
        uniforms.uScale.value[i].set(0, 0, 1, 0);
        hoverF[i] = 0;
        leanX[i] = 0;
        leanY[i] = 0;
        sideF[i] = 0;
      }

      over = overI;
      // Both tests, not either: the width covers a small window on a mouse,
      // `coarse` covers a large tablet. Re-tested every frame so a window
      // dragged across the threshold resolves instead of stranding the tag.
      const wantTag = over >= 0 && !coarse && viewW > params.tagFrom;
      if (wantTag !== tagUp) {
        tagUp = wantTag;
        tag.show(wantTag);
      }
      // Off the resting centre, so a card being pushed cannot chase its own
      // shadow next frame.
      if (over >= 0) focusPos.copy(rest[over]);

      // Carried every frame whether present or not, so the tag is already in
      // the right place the moment it is asked to appear.
      uniforms.uTag.value.set(
        cursor.x + params.tagX,
        cursor.y + params.tagY,
        tag.box.sx,
        tag.box.sy,
      );
      uniforms.uTagP.value.set(
        TAG_W * 0.5,
        TAG_H * 0.5,
        TAG_H * 0.5,
        params.tagRefract,
      );
      uniforms.uTagQ.value.set(params.tagFrost, params.tagRim, 0, 0);

      // The column and the meta name whatever cell the front plane is wearing,
      // read off the same deal the shader was handed rather than recomputed —
      // so the highlight cannot disagree with the art.
      if (frontI >= 0 && imageCount > 0 && frontCell !== shown) {
        shown = frontCell;
        paintList();
      }

      /* ---- honey ---- */
      // One bridge per parent/child pair, in ring order. Deliberately none
      // closing the circle while the fan is opening: those two planes were
      // never merged, so there is nothing between them to stretch.
      order.sort((a, b) => signedOffset(a) - signedOffset(b));

      const edgeHalf = faceEdge * 0.5 * params.thread;
      // Once closed the seam pair are neighbours like any other, and without a
      // link the one gap the fan never opened is the only one the cursor
      // cannot web back together.
      const closed = spread > 0.995 && count > 2;
      const linkCount = Math.min(closed ? count : count - 1, MAX_LINKS);

      for (let l = 0; l < linkCount; l++) {
        const ia = order[l];
        const ib = order[(l + 1) % count];

        const ca = uniforms.uPos.value[ia];
        const cb = uniforms.uPos.value[ib];
        const scA = uniforms.uScale.value[ia];
        const scB = uniforms.uScale.value[ib];

        // Measured between resting centres and birth scales, never hovered
        // ones. The unfurl's response to separation is ferociously steep — a
        // couple of percent of the gap is already a slab — so letting the lean
        // and the swell in turns a hover into a puzzle-piece join.
        const shrinkA = (params.radial ? scA.y : scA.x) / swellOf(ia);
        const shrinkB = (params.radial ? scB.y : scB.x) / swellOf(ib);
        const sep =
          rest[ia].distanceTo(rest[ib]) - sepExtent * 0.5 * (shrinkA + shrinkB);

        // 0 = faces still touching, 1 = landed at the resting gap.
        const v = clamp01(sep / finalSep);

        // Hover strings its own thread on its own curve, so it can be dialled
        // to a filament rather than inheriting the unfurl's slab. Taken at the
        // gap's midpoint, so the strongest pull lands between two planes.
        let fl = 0;
        if (track && params.web > 0.0001) {
          const mx = (ca.x + cb.x) * 0.5;
          const my = (ca.y + cb.y) * 0.5;
          const webReach = Math.max(1, params.webReach * W);
          const d = Math.hypot(cursor.x - mx, cursor.y - my);
          fl = smoothstep(webReach, webReach * 0.15, d) * cursor.amt;
        }
        // Eased on the same rates as the planes it hangs between, or the
        // thread would be there before the pull was.
        webF[l] += (fl - webF[l]) * (fl > webF[l] ? kRise : kFall);

        const w = Math.max(Math.pow(1 - v, params.thin), params.web * webF[l]);
        // dissolve carries the radius past zero and out of antialiasing range
        // so the thread fades instead of bottoming out as a half-covered
        // hairline. In screen px, so unlike edgeHalf it does not carry g.
        const rEnd = edgeHalf * w - params.dissolve;
        const rMid = rEnd * (1 - (1 - params.pinch) * smoothstep(0, 0.7, v));

        uniforms.uLinkA.value[l].copy(ca);
        uniforms.uLinkB.value[l].copy(cb);
        uniforms.uLinkPar.value[l].set(
          rEnd,
          rMid,
          params.sag * g * Math.pow(v, 1.5),
          // Per link, not global: with staggered generations these are all at
          // different stages. Never wider than the neck it rounds.
          Math.min(
            params.fillet * g * smoothstep(0, 0.35, v),
            Math.max(rMid, 0) * 1.5,
          ),
        );
      }
      for (let l = linkCount; l < MAX_LINKS; l++) {
        uniforms.uLinkPar.value[l].set(-100, -100, 0, 0);
      }
      uniforms.uLinkCount.value = linkCount;

      // Both are px into the distance field, so they scale with the ring or
      // the merge reads as a different material at a different window size.
      uniforms.uK.value = params.goo * planeK * fit;
      uniforms.uWobble.value =
        params.wobble * fit * (1 - smoothstep(0.2, 0.95, state.progress));

      // Gated on the seed's own cell, not on the atlas existing: the texture
      // is bound from frame one but blank, and texturing before anything is
      // painted into it draws an empty cell.
      uniforms.uTextured.value = params.textured && firstIn ? 1 : 0;
      uniforms.uBlend.value = Math.max(0.5, params.blend * planeK * g);

      const on = params.glass;
      uniforms.uBandTop.value = on ? params.bandTop * viewH : 0;
      uniforms.uBandBottom.value = on ? params.bandBottom * viewH : 0;
      uniforms.uGlass.value.set(
        params.refract,
        params.squeeze,
        params.ripple,
        params.rippleFreq,
      );
      uniforms.uFringe.value = on ? params.fringe : 0;
      uniforms.uSheen.value = on ? params.sheen : 0;
    };

    /* ------------------------------------------------------- entry timeline */
    // Bumped per build, so a hold left waiting on a run that has since been
    // replaced cannot resume a timeline nobody is watching.
    let entryGen = 0;

    const build = () => {
      interactive = false;
      announced = -1;
      spinVel = 0;
      dragging = false;
      settling = false;
      // The timeline tweens state.spin, so a pick in flight has to be off the
      // same property before it starts.
      stopPick();

      const gen = ++entryGen;
      // Only the first run has anything to wait for; a replay should not flash
      // the counter back up.
      if (loaderEl) gsap.set(loaderEl, { opacity: launchReady ? 0 : 1 });

      const tl = gsap.timeline({
        delay: 0.25,
        onComplete: () => {
          interactive = true;
        },
      });

      tl.fromTo(
        state,
        { progress: 0, launch: 0, spread: 0, spin: 0, shift: 0 },
        { progress: 1, duration: 1.2, ease: "power2.out" },
      );

      // Formed and sitting at centre. It stays there until the counter lands,
      // so the ring can never unfurl into cards with nothing on them. Usually
      // there is nothing left to wait for by the time the playhead arrives —
      // the counter is paced against this same birth.
      tl.addPause(">", () => {
        whenReady(() => {
          gsap.delayedCall(params.holdAfter, () => {
            if (disposed || gen !== entryGen) return;
            tl.resume();
            if (loaderEl) {
              gsap.to(loaderEl, {
                opacity: 0,
                duration: params.loaderOut,
                ease: "power2.in",
              });
            }
          });
        });
      });

      tl.to(state, {
        launch: 1,
        duration: params.launchTime,
        ease: "power2.inOut",
      });

      // Absolute positions from here, so the stage can be dropped anywhere
      // inside the spread rather than only after it.
      const spreadStart = tl.duration() - 0.15;
      tl.to(
        state,
        { spread: 1, duration: params.spreadTime, ease: params.spreadEase },
        spreadStart,
      );

      const stageStart = spreadStart + params.stageAt * params.spreadTime;
      tl.to(
        state,
        {
          spin: params.spinTurns * TAU,
          duration: params.spinTime,
          ease: params.spinEase,
        },
        stageStart + params.spinDelay,
      );
      tl.to(
        state,
        { shift: 1, duration: params.moveTime, ease: params.moveEase },
        stageStart + params.moveDelay,
      );

      const textStart = spreadStart + params.textAt * params.spreadTime;

      if (splitText.chars.length) {
        tl.fromTo(
          splitText.chars,
          { value: 0 },
          {
            value: 1,
            duration: params.textTime,
            ease: params.textEase,
            stagger: params.textStagger,
          },
          textStart,
        );
      }

      // The heading has done its job by the time the ring is in place, and
      // from then on it is behind the front card. Timed off whichever staging
      // move finishes last, so it still lands with them if either is retimed.
      if (params.textOut && splitText.fades.length) {
        const landed = Math.max(
          stageStart + params.spinDelay + params.spinTime,
          stageStart + params.moveDelay + params.moveTime,
        );
        tl.fromTo(
          splitText.fades,
          { value: 1 },
          {
            value: 0,
            duration: params.textOutTime,
            ease: params.textOutEase,
            stagger: params.textStagger,
          },
          Math.max(0, landed + params.textOutAt),
        );
      }

      // The column arrives with the heading, by which point there is a front
      // for it to be reading.
      if (listEl) {
        tl.fromTo(
          listEl,
          { opacity: 0 },
          { opacity: 1, duration: params.textTime, ease: params.textEase },
          textStart,
        );
      }

      return tl;
    };

    tag.build();
    tag.load(() => {
      if (!disposed) tag.build();
    });
    styleMeta();

    // Compile the plane program and push the atlas to the GPU now, in idle
    // time while the section is still below the fold. Left to the first
    // frame, both land in one 250–350ms stall exactly as the visitor is
    // scrolling the thesis above — that was the "second section is slow".
    const warm = () => {
      if (disposed) return;
      try {
        renderer.compile(scene, camera);
        renderer.initTexture(atlas.texture);
      } catch {
        // Nothing to recover: the first frame simply pays for it instead.
      }
    };
    const warmHandle = window.requestIdleCallback
      ? window.requestIdleCallback(warm, { timeout: 1500 })
      : setTimeout(warm, 300);
    const cancelWarm = () =>
      window.cancelIdleCallback
        ? window.cancelIdleCallback(warmHandle)
        : clearTimeout(warmHandle);

    let tl = null;
    const replay = () => {
      tl?.kill();
      tl = build();
    };

    // The entry is built once, and not until the faces are in. Every glyph
    // mask is sized by the glyph inside it, and the timeline holds direct
    // references to the uniforms those masks own — so rebuilding the text
    // later means rebuilding the timeline, which snaps state back to zero and
    // restarts the whole entry. On a warm cache fonts resolve in milliseconds
    // and that was invisible; on a cold one they arrive late and it reads as
    // the page going blank and starting over.
    const startEntry = () => {
      if (disposed || tl) return;
      splitText.build();
      tag.build();
      styleMeta();
      replay();
    };

    // Two gates instead of one: the fonts (the heading and the tag rasterise
    // them), and the section actually being scrolled to — mid-page, an entry
    // nobody sees is an entry wasted.
    let fontsIn = false;
    let seen = false;
    const maybeStart = () => {
      if (fontsIn && seen) startEntry();
    };
    const fontsDone = () => {
      fontsIn = true;
      maybeStart();
    };
    // fonts.ready is reliable, but nothing here is worth a permanently blank
    // stage if it ever is not.
    const fontFallback = setTimeout(fontsDone, 3000);
    (document.fonts?.ready ?? Promise.resolve())
      .then(fontsDone)
      .catch(fontsDone);

    const entryIO = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          seen = true;
          entryIO.disconnect();
          maybeStart();
        }
      },
      { threshold: 0.3 },
    );
    entryIO.observe(container);

    // Back from a case study, the ring is already built as far as the
    // visitor is concerned; running the entry again — counter, hold, unfurl —
    // reads as the page having forgotten them. So the timeline is built and
    // jumped straight to its end, the spin put back where it was, and the
    // section held seated for the first moments while the router settles the
    // scroll (native restoration on back, the hash on the case page's link).
    if (resumeMemo) {
      const { spin } = resumeMemo;
      resumeMemo = null;
      entryIO.disconnect();
      seen = true;
      loadProg = 1;
      loading.shown = 1;
      launchReady = true;
      for (const fn of readyWaiters) fn();
      readyWaiters.length = 0;
      splitText.build();
      tag.build();
      styleMeta();
      tl = build();
      // Events suppressed: the addPause inside must not catch the playhead
      // on its way past, and the end state is all that is wanted.
      tl.progress(1, true);
      state.spin = spin;
      interactive = true;
      // The first name is set, not melted in: it was already there.
      metaInstant = true;
      if (loaderEl) gsap.set(loaderEl, { opacity: 0 });
      seatUntil = performance.now() + 700;
    }

    /* ------------------------------------------------------- dev controls */
    let gui;

    if (process.env.NODE_ENV === "development") {
      Promise.all([import("lil-gui"), import("./ring/gui")]).then(
        ([{ default: GUI }, { mountGui }]) => {
          if (disposed) return;
          gui = mountGui(GUI, {
            params,
            state,
            info,
            actions: {
              replay,
              refit,
              styleMeta,
              setThreshold: meta.setThreshold,
              rebuildText: () => {
                splitText.build();
                replay();
              },
              rebuildTag: () => tag.build(),
              replayMeta: () => {
                announced = -1;
              },
              adoptWindow: () => {
                params.refWidth = Math.round(viewW);
                params.refHeight = Math.round(viewH);
                refit();
              },
            },
          });

          // REMOVE THIS IF YOU WANNA TWEAK
          gui.hide();
        },
      );
    }

    /* ---------------------------------------------------------------- loop */
    const start = performance.now();
    let prevT = start;

    // Adaptive resolution. A frame over 30ms is a missed vsync on any
    // display; a dozen of them inside a sixty-frame window is a machine that
    // cannot keep up at this ratio, so drop a quarter step and start
    // counting again. Floors at 1x.
    let slowFrames = 0;
    let windowFrames = 0;
    const noteFrame = (ms) => {
      if (dprCap <= 1) return;
      windowFrames++;
      if (ms > 30) slowFrames++;
      if (slowFrames >= 12) {
        dprCap = Math.max(1, dprCap - 0.25);
        renderer.setPixelRatio(dprCap);
        renderer.setSize(viewW, viewH);
        slowFrames = 0;
        windowFrames = 0;
      } else if (windowFrames >= 60) {
        slowFrames = 0;
        windowFrames = 0;
      }
    };

    const frame = () => {
      const now = performance.now();
      noteFrame(now - prevT);
      // Clamped, so a backgrounded tab does not resume with one huge step.
      const dt = Math.min(0.05, (now - prevT) / 1000);
      prevT = now;
      uniforms.uTime.value = (now - start) * 0.001;

      if (interactive && !dragging && !picking) {
        state.spin += spinVel * dt;
        spinVel *= Math.pow(params.damping, dt * 60);

        // How far off the nearest slot the ring is. Zero while snap is off,
        // which leaves the parking test below reading as it always did.
        let off = 0;

        if (params.snap) {
          const slot = TAU / Math.round(params.count);
          // Rate the damping alone bleeds velocity off at, in 1/s. What is
          // left to coast is exactly v / this.
          const decay = Math.max(0.01, -Math.log(params.damping) * 60);

          // A flick is left alone until it is nearly spent, and this is what
          // counts as nearly. Never lower than the speed that leaves half a
          // slot of coast: above that the slot it is heading for is still in
          // front of it, so the run-in can only carry on forward. Later than
          // that and it has to back up, which is the one thing that looks
          // wrong.
          const engage = Math.max(params.snapFrom, decay * slot * 0.5);
          // Half a slot down to a pixel is about 4.8 e-foldings, which is what
          // lets snapTime read back as seconds.
          const rate = 4.8 / Math.max(0.05, params.snapTime);

          if (!settling && Math.abs(spinVel) < engage) {
            // Committed from where the coast alone would have left it, so it
            // carries on to the slot it was already heading for rather than
            // pulling up short. Measured off the seed and off wherever front
            // ended up, so a plane lands facing the viewer.
            const coast = state.spin + spinVel / decay;
            const phase = params.seed * DEG - frontAngle;
            snapTo = Math.round((coast + phase) / slot) * slot - phase;
            // Never quicker than it was already going, so the run-in can only
            // slow the ring down. Floored at what the worst case it can be
            // handed needs, or committing from a standstill caps itself at
            // zero and never moves.
            snapCap = Math.max(Math.abs(spinVel), slot * 0.5 * rate);
            settling = true;
          }

          if (settling) {
            off = snapTo - state.spin;
            landing = Math.abs(off) / slot;
            // Speed proportional to what is left: the ring runs in on an
            // exponential and stops dead on the slot. Tying speed to distance
            // is what makes overshoot impossible, and overshoot would read as
            // a click rather than a glide.
            const aim = Math.max(-snapCap, Math.min(snapCap, off * rate));
            spinVel += (aim - spinVel) * clamp01(rate * dt);
          }
        } else {
          settling = false;
        }
        if (!settling) landing = 1;

        // Parked. Left running, the last hundredth of a degree creeps on for
        // ever, so put it down exactly on the slot.
        if (Math.abs(spinVel) < 0.0015 && Math.abs(off) < 0.0008) {
          spinVel = 0;
          state.spin += off;
        }
      }

      if (seatUntil) {
        if (now >= seatUntil) seatUntil = 0;
        else {
          const top = container.getBoundingClientRect().top;
          // Only once the router has brought the section near: a landing
          // elsewhere on the page (the wordmark's link home) stays put.
          if (Math.abs(top) > 0.5 && Math.abs(top) < viewH) seat();
        }
      }
      gateCheck();
      tickLoader(dt);
      updatePointer(dt);
      layout(dt);

      // The name arrives with the card, not while one flicks past: once the
      // ring is parked, or once its run-in is close enough that the front
      // card cannot change. A pick drives spin by tween, so spinVel is zero
      // throughout — without that test the meta would morph as the ring
      // passed the halfway mark.
      if (
        interactive &&
        !dragging &&
        !picking &&
        (spinVel === 0 || landing < 0.3) &&
        shown >= 0 &&
        shown !== announced
      ) {
        announced = shown;
        meta.show(shown, metaInstant);
        metaInstant = false;
        showInfo(shown);
      }

      renderer.render(scene, camera);
    };

    // Parked while the section is well off screen: a full-viewport SDF pass
    // per frame is not a tax the rest of the page should pay. The margin
    // restarts it before the stage edges back into view.
    let looping = false;
    const setLoop = (on) => {
      if (on === looping) return;
      looping = on;
      prevT = performance.now();
      renderer.setAnimationLoop(on ? frame : null);
    };
    // A small margin only: the program is warmed at mount, so the loop no
    // longer needs a head start, and every frame it runs while the thesis
    // above is still on screen is a frame that section pays for.
    const loopIO = new IntersectionObserver(
      (entries) => setLoop(entries.some((e) => e.isIntersecting)),
      { rootMargin: "4%" },
    );
    loopIO.observe(container);

    return () => {
      disposed = true;
      // A live ring is worth coming back to; one still building is not.
      if (interactive) resumeMemo = { spin: state.spin };
      clearTimeout(holdTimer);
      clearTimeout(wheelQuiet);
      clearTimeout(fontFallback);
      cancelWarm();
      renderer.setAnimationLoop(null);

      entryIO.disconnect();
      loopIO.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("nav:jump", onNavJump);
      // Never leave the document locked behind us — unmount is also how a
      // front-card click leaves for the case page.
      if (gateLocked) {
        gateLocked = false;
        document.documentElement.style.overflow = "";
        lenis()?.start();
      }
      apiRef.current = {};
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointercancel", onPointerUp);
      container.removeEventListener("pointerleave", onPointerLeave);
      container.removeEventListener("click", onClick);

      tl?.kill();
      if (infoRef.current) gsap.killTweensOf(infoRef.current);
      gsap.killTweensOf(splitText.chars);
      gsap.killTweensOf(splitText.fades);
      gsap.killTweensOf(listEl);
      meta.dispose();
      tag.dispose();
      splitText.dispose();
      gui?.destroy();

      mesh.geometry.dispose();
      mesh.material.dispose();
      uniforms.uAtlas.value?.dispose();
      uniforms.uTagTex.value?.dispose();

      // dispose() frees GL resources but leaves the context itself alive until
      // the canvas is collected, which is not deterministic. This effect
      // re-runs on every StrictMode double mount and every hot update, so
      // without an explicit release they pile up, and once the browser's limit
      // is reached the renderer above cannot be constructed at all.
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <>
      {/* touch-none, or the browser claims the gesture for panning and the
          pointermove stream dies mid-drag. This branch only renders for fine
          pointers, so no page scroll is being stolen by it. */}
      <div ref={containerRef} className="absolute inset-0 touch-none" />

      {/* The index doubles as navigation: each name turns the ring to its
          card, so nobody has to scroll the whole tour to reach a project.
          Sized from styleMeta, not a class, so it takes the narrow bump with
          every other label. */}
      <ul
        ref={listRef}
        aria-label="Projects"
        style={{
          fontFamily: "var(--font-jetbrains), ui-monospace, monospace",
        }}
        className="absolute right-[12vw] top-[11vh] z-20 flex flex-col items-end text-right leading-[1.5] tracking-[0.02em] text-[var(--ink)] opacity-0 max-sm:hidden"
      >
        {PROJECTS.map((p, i) => (
          <li
            key={p.slug}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            // No transition, deliberately: the colour turns over the moment
            // the ring passes the halfway point between two slots.
            style={{ opacity: 0.2 }}
          >
            <button
              type="button"
              onClick={() => apiRef.current.turnTo?.(i)}
              className="cursor-pointer transition-colors duration-200 hover:text-[rgb(var(--accent-rgb))]"
            >
              {p.name}
            </button>
          </li>
        ))}
      </ul>

      {/* The dossier for whichever card faces front; showInfo fills it. */}
      <div
        ref={infoRef}
        className="pointer-events-none absolute bottom-[5vh] left-[5.5vw] z-10 max-w-[40ch] opacity-0 max-lg:hidden"
      >
        <p data-slot="role" className="t-label text-[var(--faint)]" />
        <h3
          data-slot="title"
          className="t-display mt-2 text-[1.35rem] text-[var(--ink)]"
        />
        <p
          data-slot="summary"
          className="t-body mt-2 line-clamp-3 text-[var(--muted)]"
        />
        <p
          data-slot="cta"
          className="t-label mt-3 text-[rgb(var(--accent-rgb))]"
        />
      </div>

      {/* The gate's way out, for anyone who has seen enough. paintSkip only
          offers it while the section actually holds the page. */}
      <button
        ref={skipRef}
        type="button"
        onClick={() => apiRef.current.skip?.()}
        style={{ opacity: 0, pointerEvents: "none" }}
        className="t-label absolute bottom-[4vh] right-[3vw] z-20 cursor-pointer border border-[var(--hairline-strong)] px-4 py-2 text-[var(--muted)] transition-[opacity,color,border-color] duration-300 hover:border-[rgb(var(--accent-rgb))] hover:text-[var(--ink)]"
      >
        Skip section ↓
      </button>

      {/* Three rows per side, identical in structure and all carrying both
          words: two inside the filtered wrapper that melt into each other, and
          one outside it for words carrying over unchanged. Which row paints
          what is decided per change — see ring/meta.js.

          Hidden from the accessibility tree; a card is announced once, in
          full, from the live region below. */}
      {[
        { side: "left", justify: "flex-start" },
        { side: "right", justify: "flex-end" },
      ].map(({ side, justify }) => {
        // Baseline, not centre: the halves are set at different sizes, and a
        // shared baseline is what makes them read as one lockup.
        const row = (
          <span className="flex items-baseline whitespace-nowrap">
            <span />
            <span />
          </span>
        );
        return (
          <div
            key={side}
            ref={(el) => {
              metaRef.current[side].box = el;
            }}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 tracking-[-0.01em] text-[var(--ink)]"
          >
            <span
              ref={(el) => {
                metaRef.current[side].goo = el;
              }}
              className="absolute inset-0"
              // Promoted up front, so switching the goo on and off is not also
              // a compositor layer being created and thrown away.
              style={{ willChange: "filter" }}
            >
              {[0, 1].map((i) => (
                <span
                  key={i}
                  ref={(el) => {
                    metaRef.current[side].layers[i] = el;
                  }}
                  className="absolute inset-0 flex items-center"
                  style={{ justifyContent: justify }}
                >
                  {row}
                </span>
              ))}
            </span>
            <span
              ref={(el) => {
                metaRef.current[side].plain = el;
              }}
              className="absolute inset-0 flex items-center"
              style={{ justifyContent: justify }}
            >
              {row}
            </span>
          </div>
        );
      })}

      {/* 001 to 100. Holds the entry at the seed until it gets there. */}
      <div
        ref={loaderRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 z-10 -translate-x-1/2 tracking-[-0.01em] text-[var(--ink)]"
      />

      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* Alpha multiplied up hard and biased down, so a pixel is either fully
          opaque or gone. That is what fuses two blurred words into one
          silhouette instead of laying them over each other. Region is
          oversized because the blur bleeds well outside the text's own box. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute h-0 w-0"
        focusable="false"
      >
        <defs>
          <filter
            id="name-goo"
            x="-20%"
            y="-100%"
            width="140%"
            height="300%"
            colorInterpolationFilters="sRGB"
          >
            <feColorMatrix
              ref={cutRef}
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </>
  );
}
