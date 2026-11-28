import { ScrollTrigger } from "gsap/ScrollTrigger";
import { INTRO_DONE } from "./Preloader/introState";

/*
 * Below-the-fold sections don't need their animations while the page is loading. Each one queues its
 * setup here; the queue runs on the visitor's first scroll, touch, or keypress (or once the browser is
 * idle after the intro), one section per frame, so no single long task blocks the main thread.
 * Pinned sections (Approach, Services) are still in place long before the visitor scrolls to them.
 */
type Task = { run: () => void; done: boolean };
const queue: Task[] = [];
let state: "waiting" | "flushing" | "ready" = "waiting";
let armed = false;
let triggeredByScroll = false;

function flush() {
  if (state !== "waiting") return;
  state = "flushing";
  removeTriggers();
  const step = () => {
    const task = queue.find((item) => !item.done);
    if (!task) {
      state = "ready";
      ScrollTrigger.refresh();
      // A deep link (#contact) scrolled before the pins existed: land on the target again.
      const target = triggeredByScroll && location.hash ? document.getElementById(decodeURIComponent(location.hash.slice(1))) : null;
      if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
      return;
    }
    task.done = true;
    task.run();
    requestAnimationFrame(step);
  };
  step();
}

const onScroll = () => { triggeredByScroll = true; flush(); };
const events = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
let idleHandle = 0;
function removeTriggers() {
  window.removeEventListener("scroll", onScroll);
  events.forEach((type) => window.removeEventListener(type, flush));
  window.removeEventListener(INTRO_DONE, scheduleIdle);
  if (typeof cancelIdleCallback === "function") cancelIdleCallback(idleHandle); else clearTimeout(idleHandle);
}
function scheduleIdle() {
  // Nobody has interacted yet: prepare the rest of the page once the browser has nothing better to do.
  if (typeof requestIdleCallback === "function") idleHandle = requestIdleCallback(() => flush(), { timeout: 6000 });
  else idleHandle = setTimeout(flush, 3000) as unknown as number;
}
function arm() {
  if (armed) return;
  armed = true;
  window.addEventListener("scroll", onScroll, { passive: true });
  events.forEach((type) => window.addEventListener(type, flush, { passive: true }));
  const intro = document.documentElement.dataset.alyoxaIntro;
  if (intro === "pending" || intro === "opening") window.addEventListener(INTRO_DONE, scheduleIdle, { once: true });
  else scheduleIdle();
  // Opening a page already scrolled (refresh, back button, #hash) needs everything straight away.
  if (window.scrollY > 0) onScroll();
}

/** Runs `init` once the page needs it; returns a cleanup that cancels or reverts it. */
export function deferMotion(init: () => (() => void) | void) {
  let cleanup: (() => void) | void;
  const task: Task = { run: () => { cleanup = init(); }, done: false };
  if (state === "ready") { task.done = true; task.run(); }
  else { queue.push(task); arm(); } // a flush already in progress picks it up on its next frame
  return () => {
    task.done = true;
    const index = queue.indexOf(task);
    if (index >= 0) queue.splice(index, 1);
    cleanup?.();
  };
}
