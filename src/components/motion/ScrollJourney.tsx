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
      const about = document.getElementById("about");
      const contact = document.getElementById("contact");
      if (hero && desktop) gsap.fromTo(hero, { "--hero-scroll-title": "0px" }, {
        "--hero-scroll-title": "-52px", ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
      });
      // The Work section runs its own pinned spotlight (WorkAnimations.ts), so it has no depth pass here.
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
