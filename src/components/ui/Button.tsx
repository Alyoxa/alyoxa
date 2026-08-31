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
  const filterId = useId().replace(/:/g, "");
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const borderBeamRef = useRef<HTMLDivElement | null>(null);
  const textRow1Ref = useRef<HTMLSpanElement | null>(null);
  const textRow2Ref = useRef<HTMLSpanElement | null>(null);
  const turbRef = useRef<SVGFETurbulenceElement | null>(null);
  const dispMapRef = useRef<SVGFEDisplacementMapElement | null>(null);

  const isDark = variant === "dark";

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    const fill = fillRef.current;
    const borderBeam = borderBeamRef.current;
    const row1 = textRow1Ref.current;
    const row2 = textRow2Ref.current;
    const turb = turbRef.current;
    const dispMap = dispMapRef.current;

    if (!button || !glow || !fill || !borderBeam || !row1 || !row2 || !turb || !dispMap) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars1 = row1.querySelectorAll(".char");
    const chars2 = row2.querySelectorAll(".char");

    // 1. REFINED QUICK-TO ENGINES (PROPER GSAP PROPERTY KEYS)
    const xMagTo = gsap.quickTo(button, "x", { duration: 0.35, ease: "power3.out" });
    const yMagTo = gsap.quickTo(button, "y", { duration: 0.35, ease: "power3.out" });
    const rotXTo = gsap.quickTo(button, "rotationX", { duration: 0.35, ease: "power3.out" });
    const rotYTo = gsap.quickTo(button, "rotationY", { duration: 0.35, ease: "power3.out" });

    const xGlowTo = gsap.quickTo(glow, "x", { duration: 0.15, ease: "power2.out" });
    const yGlowTo = gsap.quickTo(glow, "y", { duration: 0.15, ease: "power2.out" });
    const xFillTo = gsap.quickTo(fill, "x", { duration: 0.2, ease: "power2.out" });
    const yFillTo = gsap.quickTo(fill, "y", { duration: 0.2, ease: "power2.out" });

    // 2. SUBTLE LIQUID SHOCKWAVE SYSTEM
    const val = { baseFrequency: 0.0, scale: 15 };
    const turbTl = gsap.timeline({ paused: true });

    turbTl
      .to(val, {
        baseFrequency: 0.035,
        scale: 22,
        duration: 0.2,
        ease: "power2.out",
        onUpdate: () => {
          turb.setAttribute("baseFrequency", `0 ${val.baseFrequency}`);
          dispMap.setAttribute("scale", `${val.scale}`);
        },
      })
      .to(val, {
        baseFrequency: 0.0,
        scale: 0,
        duration: 0.45,
        ease: "power3.out",
        onUpdate: () => {
          turb.setAttribute("baseFrequency", `0 ${val.baseFrequency}`);
          dispMap.setAttribute("scale", `${val.scale}`);
        },
      });

    // 3. KINETIC 3D CHARACTER FLIP
    const charsTl = gsap.timeline({ paused: true });

    charsTl
      .to(
        chars1,
        {
          yPercent: -130,
          rotateX: 60,
          opacity: 0,
          duration: 0.4,
          stagger: { each: 0.015, from: "center" },
          ease: "power4.inOut",
        },
        0
      )
      .fromTo(
        chars2,
        { yPercent: 130, rotateX: -60, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.5,
          stagger: { each: 0.015, from: "center" },
          ease: "back.out(2.2)",
        },
        0.03
      );

    // 4. MOUSE EVENT HANDLERS
    const onMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Tightened Magnetic Movement
      const deltaX = (x - centerX) * 0.25;
      const deltaY = (y - centerY) * 0.25;
      xMagTo(deltaX);
      yMagTo(deltaY);

      // Subtle 3D Perspective Tilt (Restrained to max 6deg)
      const tiltX = ((y - centerY) / centerY) * -6; 
      const tiltY = ((x - centerX) / centerX) * 6;
      rotXTo(tiltX);
      rotYTo(tiltY);

      xGlowTo(x);
      yGlowTo(y);
      xFillTo(x);
      yFillTo(y);
    };

    const onMouseEnter = () => {
      turbTl.restart();
      charsTl.restart();

      gsap.to(glow, { opacity: 1, scale: 1, duration: 0.25 });
      gsap.to(fill, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
      gsap.to(borderBeam, { opacity: 1, duration: 0.3 });
      gsap.to(button, { scale: 1.02, duration: 0.3, ease: "power2.out" });
    };

    const onMouseLeave = () => {
      charsTl.reverse();

      // Elastic Snap Back to Center
      xMagTo(0);
      yMagTo(0);
      rotXTo(0);
      rotYTo(0);

      gsap.to(glow, { opacity: 0, scale: 0.2, duration: 0.3 });
      gsap.to(fill, { opacity: 0, scale: 0.2, duration: 0.35, ease: "power3.inOut" });
      gsap.to(borderBeam, { opacity: 0, duration: 0.3 });
      gsap.to(button, { 
        scale: 1, 
        rotationX: 0, 
        rotationY: 0, 
        duration: 0.45, 
        ease: "elastic.out(1, 0.5)" 
      });
    };

    // Refined click feedback
    const onClick = () => {
      gsap.fromTo(
        val,
        { baseFrequency: 0.05, scale: 35 },
        {
          baseFrequency: 0,
          scale: 0,
          duration: 0.5,
          ease: "power4.out",
          onUpdate: () => {
            turb.setAttribute("baseFrequency", `0 ${val.baseFrequency}`);
            dispMap.setAttribute("scale", `${val.scale}`);
          },
        }
      );
    };

    button.addEventListener("mousemove", onMouseMove);
    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);
    button.addEventListener("click", onClick);

    return () => {
      button.removeEventListener("mousemove", onMouseMove);
      button.removeEventListener("mouseenter", onMouseEnter);
      button.removeEventListener("mouseleave", onMouseLeave);
      button.removeEventListener("click", onClick);
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
              numOctaves="2"
              result="warp"
            />
            <feDisplacementMap
              ref={dispMapRef}
              xChannelSelector="R"
              yChannelSelector="G"
              scale="0"
              in="SourceGraphic"
              in2="warp"
            />
          </filter>
        </defs>
      </svg>

      <div className="[perspective:1000px] inline-block">
        <button
          ref={buttonRef}
          style={{
            filter: `url(#alyoxa-melt-${filterId})`,
            transformStyle: "preserve-3d",
          }}
          className={`group relative inline-flex items-center justify-center overflow-hidden rounded-xl border px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 hover:cursor-pointer ${
            isDark
              ? "border-neutral-800 bg-neutral-950 text-white shadow-2xl hover:border-neutral-500 hover:text-black"
              : "border-neutral-300 bg-neutral-100 text-neutral-950 shadow-lg hover:border-neutral-900 hover:text-white"
          } ${className}`}
          {...props}
        >
          {/* Dynamic Interactive Liquid Radial Fill */}
          <div
            ref={fillRef}
            className={`pointer-events-none absolute -left-20 -top-20 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 scale-0 transition-none ${
              isDark ? "bg-white" : "bg-neutral-950"
            }`}
          />

          {/* Inner Border Highlight */}
          <div
            ref={borderBeamRef}
            className={`pointer-events-none absolute inset-0 opacity-0 rounded-xl transition-opacity duration-300 ${
              isDark
                ? "shadow-[inset_0_0_12px_rgba(255,255,255,0.25)]"
                : "shadow-[inset_0_0_12px_rgba(0,0,0,0.15)]"
            }`}
          />

          {/* Cursor Ambient Glow */}
          <div
            ref={glowRef}
            className={`pointer-events-none absolute -left-16 -top-16 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-md transition-none ${
              isDark
                ? "bg-gradient-to-r from-white/60 via-neutral-300/30 to-transparent"
                : "bg-gradient-to-r from-black/40 via-neutral-600/20 to-transparent"
            }`}
          />

          {/* Kinetic Text Layer */}
          <span className="relative z-10 flex h-4 items-center justify-center overflow-hidden [perspective:800px] [transform:translateZ(8px)]">
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
      </div>
    </>
  );
}