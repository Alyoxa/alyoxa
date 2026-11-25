import gsap from "gsap";

export function createApproachScrollStory(root: HTMLElement, stage: HTMLElement) {
  const layers = Array.from(root.querySelectorAll<SVGGElement>(".approach__layer"));
  const ids = ["discovery", "strategy", "design", "growth"];
  gsap.set(root, { attr: { "data-process-step": ids[0] } });
  const story = gsap.timeline({ scrollTrigger: {
    trigger: stage, start: () => `top ${Math.max(96, Math.min(124, innerHeight - stage.offsetHeight - 36))}px`, end: () => `+=${Math.min(innerHeight * 1.15, 1200)}`,
    pin: stage, pinSpacing: true, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true,
  } });
  ids.forEach((id, index) => {
    story.set(root, { attr: { "data-process-step": id } }, index);
    layers.forEach((layer, layerIndex) => story.to(layer, {
      "--process-layer-y": `${(layerIndex - index) * 4}px`, duration: .65, ease: "power2.inOut",
    }, index));
  });
  story.to({}, { duration: .6 });
  return story;
}
