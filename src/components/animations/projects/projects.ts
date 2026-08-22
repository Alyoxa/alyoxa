// animations/projects.ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectsAnimation(
  container: HTMLElement,
  track: HTMLElement,
  totalSlides: number,
  onSlideChange: (index: number) => void
): () => void {
  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      // Main Horizontal Pin Timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1.2,
          start: "top top",
          end: () => `+=${scrollWidth}`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const current = Math.min(
              Math.floor(self.progress * totalSlides) + 1,
              totalSlides
            );
            onSlideChange(current);
          },
        },
      });

      // Track horizontal movement
      mainTl.to(track, {
        x: () => -scrollWidth,
        ease: "none",
      });

      // Individual Card Parallax Offsets
      const cards = track.querySelectorAll('[data-project-card="true"]');
      cards.forEach((card) => {
        const bgText = card.querySelector('[data-parallax="bg-text"]');
        const laptop = card.querySelector('[data-parallax="laptop"]');
        const phone = card.querySelector('[data-parallax="phone"]');

        if (bgText) {
          gsap.to(bgText, {
            x: -120,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTl,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        }

        if (laptop) {
          gsap.to(laptop, {
            x: -30,
            y: -15,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTl,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        }

        if (phone) {
          gsap.to(phone, {
            x: 40,
            y: 20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: mainTl,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          });
        }
      });
    });
  }, container);

  return () => ctx.revert();
}