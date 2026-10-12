"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import alyoxaLogo from "@/assets/images/logo/alyoxaLogo.png";
import { AlyoxaTrademarkButton } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function DesktopNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fullNavRef = useRef<HTMLDivElement>(null);
  const burgerPillRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // 1. Initial States (Hide pill completely with display: "none")
      gsap.set(fullNavRef.current, { y: -100, opacity: 0 });
      gsap.set(burgerPillRef.current, {
        y: -30,
        opacity: 0,
        display: "none",
        pointerEvents: "none"
      });

      // 2. Sequential Scroll Trigger
      const st = ScrollTrigger.create({
        start: "top -80px",
        onEnter: () => {
          const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

          // Step A: Hide full navbar completely first
          tl.to(fullNavRef.current, {
            y: -30,
            opacity: 0,
            duration: 0.2,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(fullNavRef.current, { pointerEvents: "none" });
            }
          })
            // Step B: Set pill display active, then drop it in cleanly
            .set(burgerPillRef.current, { display: "flex", pointerEvents: "auto" })
            .to(burgerPillRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.25,
              ease: "power2.out",
            });
        },
        onLeaveBack: () => {
          setIsMenuOpen(false);
          const tl = gsap.timeline({ defaults: { overwrite: "auto" } });

          // Step A: Hide burger pill quickly first so it disappears before full nav drops
          tl.to(burgerPillRef.current, {
            y: -20,
            opacity: 0,
            duration: 0.15,
            ease: "power2.in",
            onComplete: () => {
              gsap.set(burgerPillRef.current, { display: "none", pointerEvents: "none" });
            }
          })
            // Step B: Bring main navbar back into place
            .set(fullNavRef.current, { pointerEvents: "auto" })
            .to(fullNavRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power3.out",
            });
        },
      });

      // 3. Entrance Sequence
      const playEntrance = () => {
        gsap.to(fullNavRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        });
      };

      const handleComplete = () => playEntrance();
      window.addEventListener("preloaderComplete", handleComplete);

      const fallback = setTimeout(() => {
        if (gsap.getProperty(fullNavRef.current, "opacity") === 0) {
          playEntrance();
        }
      }, 2500);

      return () => {
        window.removeEventListener("preloaderComplete", handleComplete);
        clearTimeout(fallback);
        st.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Overlay Drawer Control
  useEffect(() => {
    const overlay = overlayRef.current;
    const links = menuLinksRef.current?.querySelectorAll("li");

    if (!overlay || !links) return;

    if (isMenuOpen) {
      gsap.to(overlay, {
        clipPath: "circle(150% at 50% 0%)",
        duration: 0.65,
        ease: "power4.inOut",
        pointerEvents: "auto",
      });
      gsap.fromTo(
        links,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    } else {
      gsap.to(overlay, {
        clipPath: "circle(0% at 50% 0%)",
        duration: 0.5,
        ease: "power4.inOut",
        pointerEvents: "none",
      });
    }
  }, [isMenuOpen]);

  return (
    <div ref={containerRef} className="hidden lg:block">
      <header className="fixed top-0 left-0 right-0 z-50 w-full px-12 py-8 pointer-events-none">
        <div
          ref={fullNavRef}
          className="mx-auto flex max-w-8xl items-center justify-between pointer-events-auto"
        >
          <Link href="/" className="inline-block transition-transform duration-300 hover:scale-[1.02]">
            <Image src={alyoxaLogo} alt="ALYOXA" className="h-auto w-56" priority />
          </Link>

          <nav>
            <ul className="flex items-center space-x-10 rounded-xl border border-black/5 bg-white/40 px-8 py-3.5 backdrop-blur-md shadow-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group relative block text-sm font-medium tracking-wide text-neutral-800 transition-colors hover:text-black"
                  >
                    <span>{link.label}</span>
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black transition-all duration-300 ease-out group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>


          <div>
            <AlyoxaTrademarkButton
              text="+44 7440 779802"
              variant="dark"
              onClick={() => {
                window.open(
                  "https://wa.me/447440779802",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            />
          </div>

        </div>

        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50">
          <button
            ref={burgerPillRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="pointer-events-none opacity-0 -translate-y-12 scale-80 flex items-center gap-3.5 rounded-full border border-white/10 bg-neutral-950 px-6 py-3 text-white backdrop-blur-2xl shadow-2xl transition-transform hover:scale-105 active:scale-95"
            aria-label="Toggle Desktop Navigation"
          >
            <Image src={alyoxaLogo} alt="ALYOXA" className="h-3.5 w-auto invert brightness-200" />
            <span className="h-3.5 w-[1px] bg-white/20" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-200">
              {isMenuOpen ? "CLOSE" : "MENU"}
            </span>
            <div className="flex flex-col gap-1 w-3.5">
              <span
                className={`h-[1.5px] w-full bg-white transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-[2.5px]" : ""
                  }`}
              />
              <span
                className={`h-[1.5px] w-full bg-white transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""
                  }`}
              />
            </div>
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        style={{ clipPath: "circle(0% at 50% 0%)" }}
        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-neutral-950 text-white backdrop-blur-2xl pointer-events-none"
      >
        <nav className="text-center">
          <ul ref={menuLinksRef} className="flex flex-col space-y-6">
            {NAV_LINKS.map((link) => (
              <li key={`desktop-overlay-${link.label}`}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-5xl font-black uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>


        <div className="mt-12">
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