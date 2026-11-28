import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SliderHooks = { onActive: (index: number) => void; onOpen: (index: number, source: HTMLElement | null) => void };

/**
 * Depth slider. `pos` is a continuous index (0 … n-1); every card's size, tilt, dimming and
 * stacking are derived from its distance to it, so dragging, momentum and snapping are one motion.
 * Works with mouse drag, touch swipe (vertical page scroll stays native), trackpad, keys and buttons.
 */
function createSlider(root: HTMLElement, hooks: SliderHooks, reduce: boolean) {
  const viewport = root.querySelector<HTMLElement>(".work__viewport");
  const slides = Array.from(root.querySelectorAll<HTMLElement>(".work__slide"));
  const progress = root.querySelector<HTMLElement>(".work__progress");
  const strip = root.querySelector<HTMLElement>(".work__strip");
  const arrows = Array.from(root.querySelectorAll<HTMLButtonElement>(".work__arrow"));
  const n = slides.length;
  if (!viewport || n === 0) return { cleanup: () => {}, state: { pos: 0 }, render: () => {} };
  const clampIndex = gsap.utils.clamp(0, n - 1);
  // With three or more projects the slider loops, so a card always sits on both sides.
  const loop = n >= 3;
  const wrapIndex = (value: number) => ((Math.round(value) % n) + n) % n;
  const offset = (i: number) => { const d = i - state.pos; return loop ? d - n * Math.round(d / n) : d; };
  const state = { pos: 0 };
  let spacing = 1;
  let active = -1;

  // React dev mode runs effects twice; start from clean inline styles every time.
  gsap.set(slides, { clearProps: "transform,opacity,zIndex" });
  if (strip) gsap.set(strip, { clearProps: "transform" });
  gsap.set(slides, { transformPerspective: 1600 });

  const measure = () => {
    const width = slides[0].offsetWidth;
    spacing = width * (window.innerWidth <= 700 ? .9 : window.innerWidth <= 1024 ? .8 : .74);
  };
  const render = () => {
    slides.forEach((slide, i) => {
      const d = offset(i), a = Math.abs(d);
      gsap.set(slide, {
        x: d * spacing,
        scale: 1 - Math.min(a, 1.5) * .17,
        rotationY: gsap.utils.clamp(-28, 28, -d * 16),
        // Looping cards fade out at the far edge, so wrapping to the other side is never seen.
        opacity: loop ? gsap.utils.clamp(0, 1, (n / 2 - a) / .3) : 1 - gsap.utils.clamp(0, 1, a - 1.2) * .9,
        zIndex: 100 - Math.round(a * 10),
      });
      slide.style.setProperty("--dim", Math.min(a, 1).toFixed(3));
    });
    const index = loop ? wrapIndex(state.pos) : clampIndex(Math.round(state.pos));
    const along = loop ? ((state.pos % n) + n) % n : state.pos;
    progress?.style.setProperty("--p", n > 1 ? String(gsap.utils.clamp(0, 1, along / (n - 1))) : "0");
    if (strip) gsap.set(strip, { yPercent: -(100 / n) * (loop ? index : clampIndex(state.pos)) });
    if (index !== active) {
      active = index;
      slides.forEach((slide, i) => slide.toggleAttribute("data-current", i === index));
      hooks.onActive(index);
    }
  };
  // `go` takes a target position; `goTo` takes a project index and picks the shortest way round.
  const go = (target: number) => {
    gsap.to(state, { pos: loop ? target : clampIndex(target), duration: reduce ? 0 : .95, ease: "expo.out", overwrite: true, onUpdate: render });
  };
  const goTo = (index: number) => go(loop ? Math.round(state.pos) + offsetFrom(index) : index);
  const offsetFrom = (index: number) => { const d = index - wrapIndex(state.pos); return d - n * Math.round(d / n); };
  measure();
  render();

  // ---------------------------------------------------------------- drag / swipe
  let dragging = false, axis: "x" | "y" | null = null, pointerId = -1;
  let startX = 0, startY = 0, startPos = 0, lastX = 0, lastT = 0, velocity = 0, moved = 0;
  const down = (e: PointerEvent) => {
    if (e.button !== 0) return;
    dragging = true; axis = null; pointerId = e.pointerId; moved = 0; velocity = 0;
    startX = lastX = e.clientX; startY = e.clientY; startPos = state.pos; lastT = performance.now();
    gsap.killTweensOf(state);
  };
  const move = (e: PointerEvent) => {
    if (!dragging || e.pointerId !== pointerId) return;
    const dx = e.clientX - startX, dy = e.clientY - startY;
    if (!axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      // Decide once: sideways drags move the slider, vertical ones stay page scroll.
      axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axis === "x") { viewport.setPointerCapture(e.pointerId); viewport.classList.add("is-dragging"); }
    }
    if (axis !== "x") return;
    moved = Math.max(moved, Math.abs(dx));
    let p = startPos - dx / spacing;
    if (!loop && p < 0) p *= .35; // rubber band at the ends (non-looping only)
    if (!loop && p > n - 1) p = n - 1 + (p - (n - 1)) * .35;
    state.pos = p;
    const now = performance.now();
    velocity = (e.clientX - lastX) / Math.max(1, now - lastT);
    lastX = e.clientX; lastT = now;
    render();
  };
  const up = (e: PointerEvent) => {
    if (!dragging || e.pointerId !== pointerId) return;
    dragging = false;
    viewport.classList.remove("is-dragging");
    if (axis === "x") {
      // A flick carries on to the neighbour; never further than one card per gesture.
      const projected = state.pos - (velocity * 260) / spacing;
      const from = Math.round(startPos);
      go(gsap.utils.clamp(from - 1, from + 1, Math.round(projected)));
    } else if (axis === null) {
      moved = 0;
    }
    axis = null;
  };
  viewport.addEventListener("pointerdown", down);
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", up);
  window.addEventListener("pointercancel", up);

  // A click (not a drag): side card → bring it forward; centre card → open its case study.
  const click = (e: MouseEvent) => {
    if (moved > 6) { moved = 0; return; }
    const card = (e.target as HTMLElement).closest<HTMLElement>(".work__card");
    if (!card) return;
    const index = Number(card.dataset.index);
    if (index === active) hooks.onOpen(index, card); else goTo(index);
  };
  viewport.addEventListener("click", click);

  // ---------------------------------------------------------------- trackpad, keys, buttons
  let wheelTimer = 0;
  const wheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return; // vertical wheel scrolls the page
    e.preventDefault();
    gsap.killTweensOf(state);
    state.pos = loop ? state.pos + e.deltaX / spacing : gsap.utils.clamp(-.3, n - .7, state.pos + e.deltaX / spacing);
    render();
    window.clearTimeout(wheelTimer);
    wheelTimer = window.setTimeout(() => go(Math.round(state.pos)), 140);
  };
  viewport.addEventListener("wheel", wheel, { passive: false });
  const key = (e: KeyboardEvent) => {
    const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
    if (step) { e.preventDefault(); go(Math.round(state.pos) + step); }
    else if (e.key === "Home") { e.preventDefault(); goTo(0); }
    else if (e.key === "End") { e.preventDefault(); goTo(n - 1); }
    else if (e.key === "Enter") { e.preventDefault(); hooks.onOpen(active, slides[active].querySelector(".work__card")); }
  };
  viewport.addEventListener("keydown", key);
  const step = (e: Event) => go(Math.round(state.pos) + Number((e.currentTarget as HTMLElement).dataset.step));
  arrows.forEach((arrow) => arrow.addEventListener("click", step));

  // ---------------------------------------------------------------- "Drag" cursor (fine pointers)
  const hint = root.querySelector<HTMLElement>(".work__drag");
  let removeHint = () => {};
  if (hint && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const hx = gsap.quickTo(hint, "x", { duration: reduce ? 0 : .5, ease: "power3.out" });
    const hy = gsap.quickTo(hint, "y", { duration: reduce ? 0 : .5, ease: "power3.out" });
    const over = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const b = viewport.getBoundingClientRect();
      if (!viewport.classList.contains("is-hinting")) {
        gsap.set(hint, { x: e.clientX - b.left, y: e.clientY - b.top });
        viewport.classList.add("is-hinting");
      }
      hx(e.clientX - b.left); hy(e.clientY - b.top);
    };
    const out = () => viewport.classList.remove("is-hinting");
    viewport.addEventListener("pointermove", over);
    viewport.addEventListener("pointerleave", out);
    removeHint = () => { viewport.removeEventListener("pointermove", over); viewport.removeEventListener("pointerleave", out); };
  }

  const ro = new ResizeObserver(() => { measure(); render(); });
  ro.observe(viewport);

  return {
    state, render,
    cleanup: () => {
      gsap.killTweensOf(state);
      ro.disconnect();
      removeHint();
      window.clearTimeout(wheelTimer);
      viewport.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      viewport.removeEventListener("click", click);
      viewport.removeEventListener("wheel", wheel);
      viewport.removeEventListener("keydown", key);
      arrows.forEach((arrow) => arrow.removeEventListener("click", step));
    },
  };
}

export function animateWork(root: HTMLElement, hooks: SliderHooks) {
  const media = gsap.matchMedia();
  media.add({ any: "all", motion: "(prefers-reduced-motion: no-preference)" }, (context) => {
    const motion = Boolean(context.conditions?.motion);
    const slider = createSlider(root, hooks, !motion);
    if (!motion) return slider.cleanup;

    const q = gsap.utils.selector(root);
    const intro = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: root, start: "top 85%", toggleActions: "play none none none" },
    });
    intro.from(q(".work__eyebrow"), { autoAlpha: 0, y: 15, duration: .6 })
      .from(q(".work__heading > .section-heading__line"), {
        autoAlpha: 0, yPercent: 70, rotation: 3,
        clipPath: "inset(0% -20% 100% -20%)",
        duration: 1.1, stagger: .12,
      }, .1)
      .from(q(".work__description"), { autoAlpha: 0, x: 28, duration: .9 }, .45)
      .from(q(".work__intro-cross"), { autoAlpha: 0, rotation: -90, scale: .3, duration: 1 }, .6);

    // The cards sweep in from the right and settle on the first project.
    const enter = gsap.timeline({
      defaults: { ease: "expo.out" },
      scrollTrigger: { trigger: q(".work__viewport")[0], start: "top 82%", toggleActions: "play none none none" },
    });
    enter.fromTo(slider.state, { pos: -1.4 }, { pos: 0, duration: 1.8, onUpdate: slider.render }, 0)
      .from(q(".work__track"), { autoAlpha: 0, duration: .9, ease: "power2.out" }, 0)
      .from(q(".work__bar"), { autoAlpha: 0, y: 30, duration: 1.1 }, .5);

    const footer = gsap.timeline({
      scrollTrigger: { trigger: q(".work__footer")[0], start: "top 97%", toggleActions: "play none none none" },
    });
    footer.from(q(".work__footer-rule"), { scaleX: 0, transformOrigin: "left", duration: .8 })
      .from(q(".work__footer-actions"), { autoAlpha: 0, y: 15, duration: .7 }, .2);

    // Keyboard navigation never waits for a reveal to finish.
    const reveal = () => [intro, enter, footer].forEach((t) => t.progress(1));
    root.addEventListener("focusin", reveal);
    return () => {
      root.removeEventListener("focusin", reveal);
      slider.cleanup();
    };
  });
  root.removeAttribute("data-motion-pending");
  return () => media.revert();
}
