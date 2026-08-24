import gsap from "gsap";

export function initProjectFormAnimation(container: HTMLElement) {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ctx = gsap.context(() => {
    if (isReducedMotion) return;

    // Header & Intro Reveal Timeline
    const header = container.querySelector('[data-intake="header"]');
    const introTitle = container.querySelector('[data-intake="intro"] h2');
    const introDesc = container.querySelector('[data-intake="intro"] p');
    const controls = container.querySelector('[data-intake="controls"]');

    gsap.set([header, controls], { opacity: 0, y: -15 });
    gsap.set(introTitle, { opacity: 0, y: 30, filter: "blur(6px)" });
    gsap.set(introDesc, { opacity: 0, y: 20, filter: "blur(4px)" });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(header, { opacity: 1, y: 0, duration: 0.8 })
      .to(introTitle, { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.0 }, "-=0.4")
      .to(introDesc, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 }, "-=0.6")
      .to(controls, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
  }, container);

  return () => ctx.revert();
}

// Directional Step Transition Animation
export function animateStepTransition(
  container: HTMLElement,
  currentStep: number,
  direction: "next" | "prev"
) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const stepEl = container.querySelector(`[data-intake="step-${currentStep}"]`);
  if (!stepEl) return;

  const xOffset = direction === "next" ? 40 : -40;
  const label = stepEl.querySelector("label");
  const inputs = stepEl.querySelectorAll("button, input, textarea, div.grid > *");

  gsap.killTweensOf([stepEl, label, inputs]);

  // Reset initial state for entry
  gsap.set(stepEl, { opacity: 0, x: xOffset, filter: "blur(8px)" });
  gsap.set(label, { opacity: 0, y: -10 });
  gsap.set(inputs, { opacity: 0, y: 20 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(stepEl, {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    duration: 0.6,
  })
    .to(
      label,
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
      },
      "-=0.4"
    )
    .to(
      inputs,
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.2)",
      },
      "-=0.3"
    );
}

// Transmission Complete Success Animation
export function animateSuccessState(container: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const successEl = container.querySelector('[data-intake="success"]');
  if (!successEl) return;

  const metaTag = successEl.querySelector("span");
  const title = successEl.querySelector("h2");
  const desc = successEl.querySelector("p");
  const footerMeta = successEl.querySelectorAll(".pt-8 > div");

  gsap.set(successEl, { opacity: 0, y: 30, filter: "blur(10px)" });
  gsap.set(metaTag, { opacity: 0, x: -20 });
  gsap.set(title, { opacity: 0, y: 20 });
  gsap.set(desc, { opacity: 0, y: 15 });
  gsap.set(footerMeta, { opacity: 0, y: 10 });

  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

  tl.to(successEl, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 })
    .to(metaTag, { opacity: 1, x: 0, duration: 0.5 }, "-=0.4")
    .to(title, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
    .to(desc, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
    .to(footerMeta, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, "-=0.3");
}