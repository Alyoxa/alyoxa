"use client";

import { useRef } from "react";

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  className?: string;
  variant?: "dark" | "light";
}

export default function Button({
  label = "Let's Talk",
  onClick,
  className = "",
  variant = "dark",
}: ButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const arrowIconRef = useRef<SVGSVGElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);

  const isDark = variant === "dark";

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      data-button
      data-variant={variant}
      className={`
        relative
        isolate
        inline-flex
        items-center
        justify-between
        gap-3
        overflow-hidden
        rounded-xl
        border
        px-5
        py-3
        text-[13px]
        font-md
        tracking-[0.03em]
        cursor-pointer
        select-none

        ${
          isDark
            ? "border-zinc-800 bg-zinc-800 text-white"
            : "border-zinc-800 bg-transparent text-zinc-800"
        }

        ${className}
      `}
    >
      {/* GSAP Fill Layer */}
      <span
        ref={fillRef}
        data-button-fill
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          inset-0
          -z-10
          ${isDark ? " bg-zinc-800" : "bg-[#f9f8f6cb]"}
        `}
      />

      {/* Label */}
      <span
        ref={labelRef}
        data-button-label
        className="relative z-10 whitespace-nowrap"
      >
        {label}
      </span>

      {/* Arrow */}
      <span
        ref={arrowRef}
        data-button-arrow
        className={`
          relative
          z-10
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-full
          border

          ${isDark ? "border-white/30" : "border-zinc-800/30"}
        `}
      >
        <svg
          ref={arrowIconRef}
          data-button-arrow-icon
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 19L19 5M19 5H8M19 5V16"
          />
        </svg>
      </span>
    </button>
  );
}
