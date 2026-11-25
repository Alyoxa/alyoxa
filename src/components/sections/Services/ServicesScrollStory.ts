import gsap from "gsap";

/** Called inside the section's GSAP context; pin, styles, and attributes revert together. */
export function createServicesScrollStory(root: HTMLElement, cards: HTMLElement[]) {
  const stage = root.querySelector<HTMLElement>(".services__stage");
  if (!stage) return;
  const ids = ["brand", "digital", "product", "technology"];
  gsap.set(root, { attr: { "data-scroll-service": ids[0] } });
  const story = gsap.timeline({
    scrollTrigger: {
      trigger: stage, start: "top 124px", end: () => `+=${Math.min(innerHeight * 1.3, 1400)}`,
      pin: stage, pinSpacing: true, scrub: .7, anticipatePin: 1, invalidateOnRefresh: true,
    },
  });
  ids.forEach((id, index) => {
    story.set(root, { attr: { "data-scroll-service": id } }, index);
    cards.forEach((card, cardIndex) => {
      story.to(card, {
        "--service-focus-y": cardIndex === index ? "-22px" : "0px",
        "--service-focus-scale": cardIndex === index ? 1.035 : .985,
        "--service-focus-light": cardIndex === index ? 1.08 : .7,
        duration: .4, ease: "power2.inOut",
      }, index);
    });
  });
  story.to({}, { duration: .6 });
  return story;
}
