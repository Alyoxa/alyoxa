"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import alyoxaLogo from "@/assets/images/logo/alyoxaLogo.png";
import { AlyoxaTrademarkButton } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function MobileNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const links = menuLinksRef.current?.querySelectorAll("li");

    if (!overlay || !links) return;

    if (isMenuOpen) {
      gsap.to(overlay, {
        clipPath: "circle(150% at 50% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
        pointerEvents: "auto",
      });
      gsap.fromTo(
        links,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.45,
          ease: "power3.out",
          delay: 0.15,
        }
      );
    } else {
      gsap.to(overlay, {
        clipPath: "circle(0% at 50% 0%)",
        duration: 0.45,
        ease: "power4.inOut",
        pointerEvents: "none",
      });
    }
  }, [isMenuOpen]);

  return (
    <div className="block lg:hidden">
      {/* Floating Center Pill (Fixed) */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-3.5 rounded-full border border-white/10 bg-neutral-950/90 px-6 py-3 text-white backdrop-blur-2xl shadow-2xl transition-transform active:scale-95"
          aria-label="Toggle Mobile Navigation"
        >
          <Image src={alyoxaLogo} alt="ALYOXA" className="h-3.5 w-auto invert brightness-200" />
          <span className="h-3.5 w-[1px] bg-white/20" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-200">
            {isMenuOpen ? "CLOSE" : "MENU"}
          </span>
          <div className="flex flex-col gap-1 w-3.5">
            <span
              className={`h-[1.5px] w-full bg-white transition-transform duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-[2.5px]" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-full bg-white transition-transform duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Fullscreen Mobile Drawer Overlay */}
      <div
        ref={overlayRef}
        style={{ clipPath: "circle(0% at 50% 0%)" }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-neutral-950 text-white backdrop-blur-2xl pointer-events-none"
      >
        <nav className="text-center">
          <ul ref={menuLinksRef} className="flex flex-col space-y-6">
            {NAV_LINKS.map((link) => (
              <li key={`mobile-${link.label}`}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-black uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>


<div className="mt-10">
  <AlyoxaTrademarkButton
    text="+44 7440 779802"
    variant="light"
    onClick={() => {
      setIsMenuOpen(false);
      window.open(
        "https://wa.me/447440779802",
        "_blank",
        "noopener,noreferrer"
      );
    }}
  />
</div>

      </div>
    </div>
  );
}