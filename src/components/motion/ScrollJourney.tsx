"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ScrollJourney.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** A shared depth pass. Custom properties avoid fighting the section entrances. */
export default function ScrollJourney() {
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(hover: hover) and (pointer: fine) and (min-width: 1101px)",
    }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const hero = document.getElementById("home");
      const work = document.getElementById("work");
      const about = document.getElementById("about");
      const contact = document.getElementById("contact");
      if (hero && desktop) gsap.fromTo(hero, { "--hero-scroll-title": "0px" }, {
        "--hero-scroll-title": "-52px", ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
      });
      if (work) {
        const cards = work.querySelectorAll<HTMLElement>(".work__project:not(.card-dialog__ghost)");
        cards.forEach((card, index) => {
          const distance = desktop ? (index === 1 ? 30 : 48) : 10;
          gsap.fromTo(card, { "--work-scroll-y": `${distance}px` }, {
            "--work-scroll-y": `${-distance}px`, ease: "none",
            scrollTrigger: { trigger: work, start: "top bottom", end: "bottom top", scrub: .9 },
          });
          gsap.fromTo(card.querySelector(".work__project-image"), { "--work-media-y": desktop ? "-7px" : "-2px" }, {
            "--work-media-y": desktop ? "7px" : "2px", ease: "none",
            scrollTrigger: { trigger: work, start: "top bottom", end: "bottom top", scrub: 1.1 },
          });
        });
        if (desktop) gsap.fromTo(work.querySelectorAll(".work__glass"), { "--journey-glass-y": "18px" }, {
          "--journey-glass-y": "-30px", ease: "none",
          scrollTrigger: { trigger: work, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      }
      if (about) gsap.fromTo(about.querySelector(".about__artwork"), { "--journey-about-y": desktop ? "28px" : "10px" }, {
        "--journey-about-y": desktop ? "-28px" : "-10px", ease: "none",
        scrollTrigger: { trigger: about, start: "top bottom", end: "bottom top", scrub: 1 },
      });
      if (contact && desktop) gsap.fromTo(contact.querySelector(".studio-footer__cta h2"), { "--finale-rise": "28px" }, {
        "--finale-rise": "0px", ease: "none",
        scrollTrigger: { trigger: contact, start: "top bottom", end: "top 35%", scrub: 1 },
      });
    });
    // Pin spacing is now established. Re-measure after local fonts finish loading.
    // A direct section URL must account for that added space after hydration.
    let mounted = true;
    let interacted = false;
    let anchorFrame = 0;
    const initialHash = window.location.hash;
    const cancelAnchor = () => { interacted = true; };
    const inputEvents = ["wheel", "touchstart", "pointerdown", "keydown"] as const;
    inputEvents.forEach((event) => window.addEventListener(event, cancelAnchor, { passive: true }));
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    void document.fonts.ready.then(() => {
      if (!mounted) return;
      anchorFrame = requestAnimationFrame(() => {
        if (!mounted) return;
        ScrollTrigger.refresh();
        if (!interacted && initialHash && window.location.hash === initialHash) {
          try {
            document.getElementById(decodeURIComponent(initialHash.slice(1)))?.scrollIntoView({ block: "start", behavior: "instant" });
          } catch { /* A malformed fragment should not interrupt the page. */ }
        }
        inputEvents.forEach((event) => window.removeEventListener(event, cancelAnchor));
      });
    });
    return () => {
      mounted = false;
      cancelAnimationFrame(frame);
      cancelAnimationFrame(anchorFrame);
      inputEvents.forEach((event) => window.removeEventListener(event, cancelAnchor));
      media.revert();
    };
  });
  return null;
}
