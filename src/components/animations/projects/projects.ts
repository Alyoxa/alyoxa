import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProjectsAnimation(
  container: HTMLElement,
  track: HTMLElement,
  totalSlides: number,
  onSlideChange: (index: number) => void,
  onActiveChange?: (active: boolean) => void
): () => void {
  // ------------------------------------------------------------------
  // THE ACTUAL FIX for "boom" fast scroll:
  // ------------------------------------------------------------------
  const normalizer = ScrollTrigger.normalizeScroll({
    type: "wheel,touch",
    momentum: (self: { velocityY: number }) => Math.min(Math.abs(self.velocityY) / 1000, 1.2),
    allowNestedScroll: true,
  });

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    // REDUCED MOTION FALLBACK
    mm.add("(prefers-reduced-motion: reduce)", () => {
      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-project-card="true"]')
      );
      cards.forEach((card) => {
        gsap.set(card, { position: "relative", opacity: 1, clearProps: "transform,filter" });
        const children = card.querySelectorAll<HTMLElement>(
          '[data-parallax], [data-animate]'
        );
        gsap.set(children, { opacity: 1, clearProps: "transform,filter" });
      });
      onActiveChange?.(false);
    });

    mm.add("(min-width: 1024px)", () => {
      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-project-card="true"]')
      );

      if (!cards.length) return;

      // ------------------------------------------------------------
      // 01 — CARD SETUP (Initial States for ALL cards including Card 0)
      // ------------------------------------------------------------

      cards.forEach((card, index) => {
        gsap.set(card, {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0,
          pointerEvents: "none",
          zIndex: index,
        });

        const bgText = card.querySelector<HTMLElement>('[data-parallax="bg-text"]');
        const laptop = card.querySelector<HTMLElement>('[data-parallax="laptop"]');
        const phone = card.querySelector<HTMLElement>('[data-parallax="phone"]');
        const badge = card.querySelector<HTMLElement>('[data-animate="badge"]');
        const title = card.querySelector<HTMLElement>('[data-animate="title"]');
        const desc = card.querySelector<HTMLElement>('[data-animate="desc"]');
        const tags = card.querySelectorAll<HTMLElement>('[data-animate="tag"]');
        const button = card.querySelector<HTMLElement>('[data-animate="button"]');

        if (bgText) gsap.set(bgText, { pointerEvents: "none", x: "18%", scale: 0.92, opacity: 0 });
        if (laptop) gsap.set(laptop, { x: "-45%", y: 20, rotateY: 18, scale: 0.94, opacity: 0, filter: "blur(10px)" });
        if (phone) gsap.set(phone, { x: "45%", y: 25, rotateZ: -10, scale: 0.88, opacity: 0, filter: "blur(10px)" });
        if (badge) gsap.set(badge, { y: 24, opacity: 0, filter: "blur(5px)" });
        if (title) gsap.set(title, { y: 38, opacity: 0, filter: "blur(7px)" });
        if (desc) gsap.set(desc, { y: 25, opacity: 0, filter: "blur(5px)" });
        if (tags.length) gsap.set(tags, { y: 18, opacity: 0, scale: 0.94 });
        if (button) gsap.set(button, { y: 24, opacity: 0, filter: "blur(5px)" });
      });

      // ------------------------------------------------------------
      // 02 — CARD 0 ENTRANCE ANIMATION (Triggers when container hits view)
      // ------------------------------------------------------------

      const cardZero = cards[0];
      const bgText0 = cardZero.querySelector<HTMLElement>('[data-parallax="bg-text"]');
      const laptop0 = cardZero.querySelector<HTMLElement>('[data-parallax="laptop"]');
      const phone0 = cardZero.querySelector<HTMLElement>('[data-parallax="phone"]');
      const badge0 = cardZero.querySelector<HTMLElement>('[data-animate="badge"]');
      const title0 = cardZero.querySelector<HTMLElement>('[data-animate="title"]');
      const desc0 = cardZero.querySelector<HTMLElement>('[data-animate="desc"]');
      const tags0 = cardZero.querySelectorAll<HTMLElement>('[data-animate="tag"]');
      const button0 = cardZero.querySelector<HTMLElement>('[data-animate="button"]');

      const cardZeroTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          once: true, // Animates smoothly into position once
        },
      });

      cardZeroTl
        .to(cardZero, { opacity: 1, pointerEvents: "auto", duration: 0.4 })
        if (bgText0) cardZeroTl.to(bgText0, { x: "0%", scale: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, "<");
        if (laptop0) cardZeroTl.to(laptop0, { x: "0%", y: 0, rotateY: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, "<+=0.1");
        if (phone0) cardZeroTl.to(phone0, { x: "0%", y: 0, rotateZ: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.9, ease: "power3.out" }, "<+=0.1");
        if (badge0) cardZeroTl.to(badge0, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }, "<+=0.2");
        if (title0) cardZeroTl.to(title0, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }, "<+=0.1");
        if (desc0) cardZeroTl.to(desc0, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" }, "<+=0.1");
        if (tags0.length) cardZeroTl.to(tags0, { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.4, ease: "power3.out" }, "<+=0.1");
        if (button0) cardZeroTl.to(button0, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" }, "<+=0.1");

      // ------------------------------------------------------------
      // 03 — MASTER SCROLL FOR SLIDE TRANSITIONS
      // ------------------------------------------------------------

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          start: "top top",
          end: () => `+=${cards.length * 900}vh`,
          scrub: 2.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => onActiveChange?.(true),
          onLeave: () => onActiveChange?.(false),
          onEnterBack: () => onActiveChange?.(true),
          onLeaveBack: () => onActiveChange?.(false),
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(Math.floor(progress * cards.length), cards.length - 1);
            onSlideChange(index + 1);
          },
        },
      });

      // ------------------------------------------------------------
      // 04 — PROJECT STORY
      // ------------------------------------------------------------

      cards.forEach((card, index) => {
        if (index === 0) {
          masterTl.to({}, { duration: 8 });
          return;
        }

        const previousCard = cards[index - 1];
        const bgText = card.querySelector<HTMLElement>('[data-parallax="bg-text"]');
        const laptop = card.querySelector<HTMLElement>('[data-parallax="laptop"]');
        const phone = card.querySelector<HTMLElement>('[data-parallax="phone"]');
        const badge = card.querySelector<HTMLElement>('[data-animate="badge"]');
        const title = card.querySelector<HTMLElement>('[data-animate="title"]');
        const desc = card.querySelector<HTMLElement>('[data-animate="desc"]');
        const tags = card.querySelectorAll<HTMLElement>('[data-animate="tag"]');
        const button = card.querySelector<HTMLElement>('[data-animate="button"]');

        masterTl.set(previousCard, { pointerEvents: "none" });
        masterTl.set(card, { pointerEvents: "auto" });

        masterTl.to(previousCard, { opacity: 0, scale: 0.985, duration: 3.5, ease: "power2.inOut" });

        masterTl.to(card, { opacity: 1, duration: 3.5, ease: "power2.inOut" }, "<+=0.4");

        if (bgText) {
          masterTl.to(bgText, { x: "0%", scale: 1, opacity: 1, duration: 4.5, ease: "power3.out" }, "<+=0.2");
        }
        if (laptop) {
          masterTl.to(laptop, { x: "0%", y: 0, rotateY: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 4.5, ease: "power3.out" }, "<+=0.8");
        }
        if (phone) {
          masterTl.to(phone, { x: "0%", y: 0, rotateZ: 0, scale: 1, opacity: 1, filter: "blur(0px)", duration: 4.5, ease: "power3.out" }, "<+=0.9");
        }
        if (badge) {
          masterTl.to(badge, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8, ease: "power3.out" }, "<+=1.0");
        }
        if (title) {
          masterTl.to(title, { y: 0, opacity: 1, filter: "blur(0px)", duration: 2, ease: "power3.out" }, "<+=0.25");
        }
        if (desc) {
          masterTl.to(desc, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.7, ease: "power2.out" }, "<+=0.2");
        }
        if (tags.length) {
          masterTl.to(tags, { y: 0, opacity: 1, scale: 1, stagger: 0.18, duration: 1.2, ease: "power3.out" }, "<+=0.15");
        }
        if (button) {
          masterTl.to(button, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" }, "<+=0.25");
        }

        masterTl.to({}, { duration: 10 });
      });

      // ------------------------------------------------------------
      // 05 — 3D DEVICE HOVER
      // ------------------------------------------------------------

      cards.forEach((card) => {
        const laptop = card.querySelector<HTMLElement>('[data-parallax="laptop"]');
        const phone = card.querySelector<HTMLElement>('[data-parallax="phone"]');

        const setupTilt = (element: HTMLElement, intensity: number) => {
          element.style.cursor = "pointer";

          const onMouseMove = (event: MouseEvent) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            gsap.to(element, {
              rotateY: (x / (rect.width / 2)) * intensity,
              rotateX: -(y / (rect.height / 2)) * intensity,
              scale: 1.025,
              duration: 0.6,
              ease: "power2.out",
              transformPerspective: 1200,
              overwrite: "auto",
            });
          };

          const onMouseLeave = () => {
            gsap.to(element, {
              rotateY: 0,
              rotateX: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          element.addEventListener("mousemove", onMouseMove);
          element.addEventListener("mouseleave", onMouseLeave);
        };

        if (laptop) setupTilt(laptop, 8);
        if (phone) setupTilt(phone, 12);
      });
    });
  }, container);

  return () => {
    ctx.revert();
    normalizer?.kill();
  };
}