"use client";

import React, { useRef, useEffect, useId } from "react";
import gsap from "gsap";

interface AlyoxaTrademarkButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "dark" | "light";
  className?: string;
}

export function AlyoxaTrademarkButton({
  text,
  variant = "dark",
  className = "",
  ...props
}: AlyoxaTrademarkButtonProps) {
  const filterId = useId().replace(/:/g, ""); // Unique filter ID for multi-instance usage
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const textRow1Ref = useRef<HTMLSpanElement | null>(null);
  const textRow2Ref = useRef<HTMLSpanElement | null>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);

  const isDark = variant === "dark";

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    const row1 = textRow1Ref.current;
    const row2 = textRow2Ref.current;
    const turb = turbRef.current;

    if (!button || !glow || !row1 || !row2 || !turb) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars1 = row1.querySelectorAll(".char");
    const chars2 = row2.querySelectorAll(".char");

    // 1. TURBULENCE LIQUID MELT TIMELINE
    const val = { baseFrequency: 0.0 };
    const turbTl = gsap.timeline({ paused: true });

    turbTl
      .to(val, {
        baseFrequency: 0.04,
        duration: 0.25,
        ease: "power2.out",
        onUpdate: () => {
          turb.setAttribute("baseFrequency", `0 ${val.baseFrequency}`);
        },
      })
      .to(val, {
        baseFrequency: 0.0,
        duration: 0.4,
        ease: "power3.out",
        onUpdate: () => {
          turb.setAttribute("baseFrequency", `0 ${val.baseFrequency}`);
        },
      });

    // 2. KINETIC CHARACTER WAVE TIMELINE
    const charsTl = gsap.timeline({ paused: true });

    charsTl
      // Row 1 Sine-Wave Dispersion Upwards
      .to(
        chars1,
        {
          yPercent: -120,
          rotateX: 45,
          opacity: 0,
          duration: 0.45,
          stagger: {
            each: 0.02,
            from: "center",
          },
          ease: "power4.inOut",
        },
        0
      )
      // Row 2 Sine-Wave Elastic Snap From Below
      .fromTo(
        chars2,
        {
          yPercent: 120,
          rotateX: -45,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.55,
          stagger: {
            each: 0.02,
            from: "center",
          },
          ease: "back.out(2.2)",
        },
        0.05
      );

    // 3. CURSOR SPOTLIGHT TRACKING
    const xGlowTo = gsap.quickTo(glow, "x", { duration: 0.2, ease: "power2.out" });
    const yGlowTo = gsap.quickTo(glow, "y", { duration: 0.2, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      xGlowTo(x);
      yGlowTo(y);
    };

    const onMouseEnter = () => {
      turbTl.restart();
      charsTl.restart();
      gsap.to(glow, { opacity: 1, scale: 1, duration: 0.3 });
      gsap.to(button, { scale: 1.02, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      charsTl.reverse();
      gsap.to(glow, { opacity: 0, scale: 0.5, duration: 0.3 });
      gsap.to(button, { scale: 1, duration: 0.4, ease: "power3.out" });
    };

    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);

    return () => {
      button.removeEventListener("mousemove", onMouseMove);
      button.removeEventListener("mouseenter", onMouseEnter);
      button.removeEventListener("mouseleave", onMouseLeave);
      turbTl.kill();
      charsTl.kill();
    };
  }, []);

  return (
    <>
      {/* SVG Displacement Filter Engine */}
      <svg className="hidden fixed" aria-hidden="true">
        <defs>
          <filter id={`alyoxa-melt-${filterId}`}>
            <feTurbulence
              ref={turbRef}
              type="fractalNoise"
              baseFrequency="0 0"
              numOctaves="1"
              result="warp"
            />
            <feDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              scale="18"
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </defs>
      </svg>

      <button
        ref={buttonRef}
        style={{ filter: `url(#alyoxa-melt-${filterId})` }}
        className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl border px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 hover:cursor-pointer ${
          isDark
            ? "border-neutral-800 bg-neutral-950 text-white shadow-2xl hover:border-neutral-700 "
            : "border-neutral-300 bg-neutral-100 text-neutral-950 shadow-lg hover:border-neutral-400 "
        } ${className}`}
        {...props}
      >
        {/* Cursor Ambient Spotlight Flare */}
        <div
          ref={glowRef}
          className={`pointer-events-none absolute -left-16 -top-16 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-xl transition-none ${
            isDark
              ? "bg-gradient-to-r from-white/30 via-neutral-400/20 to-transparent"
              : "bg-gradient-to-r from-black/20 via-neutral-600/15 to-transparent"
          }`}
        />

        {/* Dynamic Kinetic Text Container */}
        <span className="relative z-10 flex h-4 items-center justify-center overflow-hidden [perspective:800px]">
          {/* Primary Text Layer */}
          <span ref={textRow1Ref} className="flex">
            {text.split("").map((char, i) => (
              <span
                key={`r1-${i}`}
                className="char inline-block whitespace-pre [transform-style:preserve-3d]"
              >
                {char}
              </span>
            ))}
          </span>

          {/* Kinetic Wave Hover Layer */}
          <span
            ref={textRow2Ref}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            {text.split("").map((char, i) => (
              <span
                key={`r2-${i}`}
                className="char inline-block whitespace-pre [transform-style:preserve-3d]"
              > 
                {char}
              </span>
            ))}
          </span>
        </span>
      </button>
    </>
  );
}