"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ContinuousRibbons.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// One unbroken path behind the entire homepage, including pin spacing and footer.
const ribbon = "M-250-100 C300 200 1050-130 1750 550 S900 1100 120 1500 S-250 2100 1250 2350 S1900 2850 620 3300 S-350 3900 1100 4200 S1900 4800 450 5200 S-400 5700 1650 6200";

export default function ContinuousRibbons() {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const element = root.current;
    const page = element?.parentElement;
    if (!element || !page) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(element.querySelector(".continuous-ribbons__flow"), { y: 55, x: -16 }, {
        y: -85, x: 16, ease: "none",
        scrollTrigger: { trigger: page, start: "top top", end: "bottom bottom", scrub: 1.6, invalidateOnRefresh: true },
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <div ref={root} className="continuous-ribbons" aria-hidden="true">
    <svg className="continuous-ribbons__flow" viewBox="0 0 1600 6200" preserveAspectRatio="none" fill="none" focusable="false">
      <defs>
        <linearGradient id="homepage-ribbon-body" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#e9e3db" stopOpacity=".18"/><stop offset=".34" stopColor="#b8a997" stopOpacity=".13"/><stop offset=".63" stopColor="#f0eae2" stopOpacity=".25"/><stop offset="1" stopColor="#c9bbaa" stopOpacity=".12"/></linearGradient>
        <linearGradient id="homepage-ribbon-fold" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#d5c9bb" stopOpacity=".07"/><stop offset=".45" stopColor="#d2c6b8" stopOpacity=".13"/><stop offset="1" stopColor="#f1e9df" stopOpacity=".03"/></linearGradient>
      </defs>
      <path d={ribbon} stroke="url(#homepage-ribbon-body)" strokeWidth="112" />
      <path d={ribbon} stroke="url(#homepage-ribbon-fold)" strokeWidth="43" transform="translate(20 26)" />
      <path d={ribbon} stroke="#c9b9a4" strokeOpacity=".07" strokeWidth="1" transform="translate(-12 -35)" />
    </svg>
  </div>;
}
