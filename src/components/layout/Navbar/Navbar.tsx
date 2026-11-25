"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import "./Navbar.css";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Work", id: "work", number: "02", detail: "Selected projects" },
  { label: "Services", id: "services", number: "03", detail: "What we do" },
  { label: "Approach", id: "approach", number: "04", detail: "How we think" },
  { label: "About", id: "about", number: "05", detail: "The studio" },
];
const sectionIds = ["home", ...navLinks.map((link) => link.id), "testimonials", "contact"];
const sectionNames: Record<string, string> = { testimonials: "Client perspectives", home: "The studio", work: "Work", services: "Services", approach: "Approach", about: "About", contact: "Let’s talk" };

export default function Navbar({ page = "home" }: { page?: "home" | "about" | "services" | "work" | "approach" | "contact" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(page);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);
  const keyboardOpenRef = useRef(false);

  useGSAP(() => {
    const panel = menuRef.current;
    if (!panel) return;
    timelineRef.current = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } })
      .fromTo(panel, { autoAlpha: 0, y: -10, scale: .94, clipPath: "inset(0% 0% 65% 45% round 26px)" }, {
        autoAlpha: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 26px)", duration: .55,
      })
      .fromTo(panel.querySelectorAll(".island-panel__reveal"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: .4, stagger: .045 }, .12);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finishOnReduce = () => {
      if (reduced.matches) timelineRef.current?.progress(openRef.current ? 1 : 0).pause();
    };
    reduced.addEventListener("change", finishOnReduce);
    return () => { reduced.removeEventListener("change", finishOnReduce); timelineRef.current = null; };
  }, { scope: headerRef });

  useEffect(() => {
    openRef.current = menuOpen;
    const timeline = timelineRef.current;
    if (!timeline) return;
    timeline.eventCallback("onComplete", () => {
      if (openRef.current && keyboardOpenRef.current) {
        menuRef.current?.querySelector<HTMLAnchorElement>("nav a")?.focus({ preventScroll: true });
        keyboardOpenRef.current = false;
      }
    });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timeline.progress(menuOpen ? 1 : 0).pause();
      if (menuOpen && keyboardOpenRef.current) {
        menuRef.current?.querySelector<HTMLAnchorElement>("nav a")?.focus({ preventScroll: true });
        keyboardOpenRef.current = false;
      }
    } else if (menuOpen) timeline.timeScale(1).play();
    else timeline.timeScale(1.5).reverse();
  }, [menuOpen]);

  useEffect(() => {
    let frame = 0;
    let isCompact = false;
    const update = () => {
      frame = 0;
      const scroll = window.scrollY;
      // Different entry/exit points prevent flicker near the top of the page.
      const nextCompact = isCompact ? scroll > 32 : scroll > 96;
      if (nextCompact !== isCompact) {
        isCompact = nextCompact;
        setCompact(nextCompact);
      }
      // Desktop uses inline links at the top and the disclosure only in the
      // capsule. Close it before its trigger disappears on scroll or resize.
      if (!nextCompact && window.matchMedia("(min-width: 1025px)").matches && openRef.current) {
        setMenuOpen(false);
        if (menuRef.current?.contains(document.activeElement)) {
          headerRef.current?.querySelector<HTMLAnchorElement>(".island-nav__logo")?.focus({ preventScroll: true });
        }
      }
      let current: string = page;
      const readingLine = Math.min(window.innerHeight * .3, 240);
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= readingLine) current = id;
      });
      setActiveSection(current);
      const scrollRange = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollRange > 0 ? Math.min(1, Math.max(0, scroll / scrollRange)) : 0;
      headerRef.current?.style.setProperty("--nav-progress", String(progress));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, [page]);

  useEffect(() => {
    if (compact && desktopNavRef.current?.contains(document.activeElement)) {
      buttonRef.current?.focus({ preventScroll: true });
    } else if (!compact && window.matchMedia("(min-width: 1025px)").matches && document.activeElement === buttonRef.current) {
      headerRef.current?.querySelector<HTMLAnchorElement>(".island-nav__logo")?.focus({ preventScroll: true });
    }
  }, [compact]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        buttonRef.current?.focus({ preventScroll: true });
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const onFocus = (event: FocusEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("focusin", onFocus);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPointer); document.removeEventListener("focusin", onFocus); };
  }, [menuOpen]);

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    // Preserve browser gestures such as opening a link in a new tab.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    const destination = document.getElementById(id);
    if (!destination) return;
    event.preventDefault();
    setMenuOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = id === "home" ? 0 : Math.max(0, destination.getBoundingClientRect().top + window.scrollY - 112);
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top, behavior: reduced ? "instant" : "smooth" });
    requestAnimationFrame(() => {
      if (!destination.hasAttribute("tabindex")) destination.setAttribute("tabindex", "-1");
      destination.focus({ preventScroll: true });
    });
  }

  return <>
    <div className="alyoxa-nav-space" aria-hidden="true" />
    <header ref={headerRef} className={`island-nav${compact ? " is-compact" : ""}${menuOpen ? " is-open" : ""}`}>
      <div className="island-nav__shell">
        <Link href="/#home" className="island-nav__logo" aria-label="Alyoxa home" onClick={(event) => navigate(event, "home")}><Image src="/images/logo.svg" alt="ALYOXA" width={175} height={33} priority /></Link>
        <nav ref={desktopNavRef} className="island-nav__links" aria-label="Main navigation" aria-hidden={compact} inert={compact}>
          {navLinks.map((link) => <a href={`/${link.id}`} key={link.id} aria-current={page === link.id ? "page" : undefined} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
        </nav>
        <div className="island-nav__location" aria-hidden="true"><span className="island-nav__location-mark" /><span key={activeSection}>{sectionNames[activeSection]}</span></div>
        <BrandButton href="/contact" className="island-nav__cta" size="small" label={compact ? "Let’s talk" : "Start a project"} onClick={() => setMenuOpen(false)} />
        <button ref={buttonRef} type="button" className="island-nav__toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="alyoxa-island-menu" onClick={(event) => { keyboardOpenRef.current = event.detail === 0; setMenuOpen((previous) => !previous); }}>
          <svg className="island-nav__progress" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" /></svg><span className="island-nav__toggle-lines" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <div ref={menuRef} className="island-panel" id="alyoxa-island-menu" inert={!menuOpen} aria-hidden={!menuOpen}>
        <div className="island-panel__top island-panel__reveal"><span>Explore the studio</span><span>ALYOXA®</span></div>
        <nav aria-label="Explore Alyoxa">{navLinks.map((link) => <a className="island-panel__link island-panel__reveal" href={`/${link.id}`} key={link.id} aria-current={page === link.id ? "page" : undefined} onClick={() => setMenuOpen(false)}><span className="island-panel__number">{link.number}</span><span className="island-panel__label">{link.label}<small>{link.detail}</small></span><span className="island-panel__arrow"><ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" /></span></a>)}</nav>
        <div className="island-panel__contact island-panel__reveal"><span>Something on your mind?</span><a href="mailto:hello@alyoxa.com" onClick={() => setMenuOpen(false)}>hello@alyoxa.com <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        <BrandButton href="/contact" className="island-panel__start island-panel__reveal" variant="light" label="Let’s make it happen" onClick={() => setMenuOpen(false)} />
        <div className="island-panel__legal island-panel__reveal"><Link href="/privacy-policy" onClick={() => setMenuOpen(false)}>Privacy</Link><span aria-hidden="true">/</span><Link href="/terms-and-conditions" onClick={() => setMenuOpen(false)}>Terms</Link></div>
      </div>
    </header>
  </>;
}
