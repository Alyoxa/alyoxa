"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactFooter() {
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Passing footerRef to gsap.context scopes all string selectors automatically
    const ctx = gsap.context(() => {
      gsap.set(footerRef.current, { opacity: 0, y: 20 });
      gsap.set("span", { opacity: 0, y: 10, filter: "blur(4px)" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        })
        .to(footerRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        })
        .to(
          "span",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.3"
        );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={footerRef}
      data-intake="footer"
      className="w-full max-w-4xl mx-auto flex items-center justify-between text-[9px] font-mono text-black/40 uppercase tracking-widest pt-6 border-t border-black/10 z-20"
    >
      <span>ALYOXA STUDIO</span>
      <span>© 2026</span>
    </div>
  );
}