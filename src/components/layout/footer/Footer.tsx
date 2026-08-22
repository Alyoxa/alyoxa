import Image from "next/image";
import alyoxaFooterLogo from "@/assets/images/logo/alyoxaFooterLogo.png";
import { Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full h-screen  text-[#111111] px-6 sm:px-12 md:px-16 lg:px-20 pt-10  flex flex-col  select-none border-t border-black/10 overflow-hidden">
      {/* =========================================================
            ARCHITECTURAL BACKGROUND SVG & GRID MATRIX
            ========================================================= */}
      <div
        data-footer="bg-architecture"
        className="absolute inset-0 pointer-events-none z-0"
      >
        <svg
          className="absolute inset-0 w-full h-full stroke-black/[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="footer-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 60 0 L 0 0 0 60" fill="none" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>

        <div className="absolute inset-y-0 left-6 sm:left-12 md:left-16 lg:left-20 w-[1px] bg-black/[0.06]" />
        <div className="absolute inset-y-0 right-6 sm:right-12 md:right-16 lg:right-20 w-[1px] bg-black/[0.06]" />
        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-black/[0.04]" />

        <svg
          className="absolute top-6 left-8 w-5 h-5 stroke-black/20"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1"
        >
          <path d="M12 0v24M0 12h24" />
        </svg>
        <svg
          className="absolute top-6 right-8 w-5 h-5 stroke-black/20"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1"
        >
          <path d="M12 0v24M0 12h24" />
        </svg>
      </div>

      {/* =========================================================
            NAVIGATION, COORDINATES & INQUIRIES
            ========================================================= */}
      <div className="relative z-10 w-full max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Navigation */}
          <div data-footer="navigation" className="md:col-span-4 space-y-3">
            <span className="inline-flex w-fit items-center rounded-lg bg-zinc-900 px-3 py-1.5 text-[12px] font-medium uppercase tracking-normal text-white">
              NAVIGATION
            </span>
            <nav className="flex flex-col space-y-2 text-sm sm:text-base tracking-wider uppercase font-medium text-black/80">
              <a
                href="#work"
                className="hover:text-black hover:translate-x-1 transition-all duration-200 w-fit"
              >
                WORK
              </a>
              <a
                href="#services"
                className="hover:text-black hover:translate-x-1 transition-all duration-200 w-fit"
              >
                SERVICES
              </a>
              <a
                href="#about"
                className="hover:text-black hover:translate-x-1 transition-all duration-200 w-fit"
              >
                ABOUT
              </a>
              <a
                href="#contact"
                className="hover:text-black hover:translate-x-1 transition-all duration-200 w-fit"
              >
                CONTACT
              </a>
            </nav>
          </div>

          {/* Social */}
          <div data-footer="social" className="md:col-span-4 space-y-3">
            <span className="inline-flex w-fit items-center rounded-lg bg-zinc-900 px-3 py-1.5 text-[12px] font-medium uppercase tracking-normal text-white">
              SOCIAL
            </span>
            <ul className="flex flex-col space-y-2 text-sm sm:text-base tracking-wider uppercase font-medium text-black/80">
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 hover:text-black transition-colors"
                >
                  <svg
                    className="w-4 h-4 stroke-black/40 group-hover:stroke-black transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="4" />
                    <line x1="8" y1="11" x2="8" y2="16" />
                    <line x1="8" y1="8" x2="8" y2="8.01" />
                    <path d="M12 16v-3a2 2 0 0 1 4 0v3" />
                  </svg>
                  <span>LINKEDIN</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 hover:text-black transition-colors"
                >
                  <svg
                    className="w-4 h-4 stroke-black/40 group-hover:stroke-black transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>INSTAGRAM</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 hover:text-black transition-colors"
                >
                  <svg
                    className="w-4 h-4 stroke-black/40 group-hover:stroke-black transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span>FACEBOOK</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Email */}
          <div data-footer="email" className="md:col-span-3 space-y-3">
            <span className="inline-flex w-fit items-center rounded-lg bg-zinc-900 px-3 py-1.5 text-[12px] font-medium uppercase tracking-normal text-white">
              DIRECT INQUIRIES
            </span>
            <a
              href="mailto:hello@alyoxa.com"
              className="group inline-flex items-center gap-2 text-lg sm:text-xl font-medium text-black hover:text-black/60 transition-colors tracking-tight"
            >
              <span className="underline underline-offset-4 decoration-black/30 group-hover:decoration-black transition-colors">
                hello@alyoxa.com
              </span>
              <svg
                className="w-5 h-5 stroke-current fill-none transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================
            HIGH-RES BRAND LOGO ASSET (COMPACT & RESPONSIVE)
            ========================================================= */}
      <div
        data-footer="wordmark"
        className="relative left-1/2 z-10 flex w-screen -translate-x-1/2 items-center justify-center overflow-hidden border-y border-black/[0.06] "
      >
        <Image
          src={alyoxaFooterLogo}
          alt="ALYOXA"
          className="h-auto w-[92vw] max-w-none select-none object-contain pointer-events-none"
          priority
        />
      </div>
      {/* =========================================================
            BOTTOM METADATA
            ========================================================= */}
<div
  data-footer="meta"
  className="relative z-10 w-screen left-1/2 -translate-x-1/2 bg-zinc-900 text-white"
>
  <div className="mx-auto flex w-full flex-col items-center justify-between gap-2 px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-white/60 sm:flex-row lg:px-10">
    <div>© 2026 ALYOXA</div>
    <div className="text-white/70">DIGITAL EXPERIENCE STUDIO</div>
    <div>BUILT WITH INTENTION.</div>
  </div>
</div>
    </footer>
  );
}
