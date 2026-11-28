"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import { studioContact } from "@/lib/studioContact";
import "./Navbar.css";
import SocialLinks from "@/components/ui/SocialLinks/SocialLinks";

gsap.registerPlugin(useGSAP);

const navLinks = [
  { label: "Work", id: "work", number: "02", detail: "Selected projects" },
  { label: "Services", id: "services", number: "03", detail: "What we do" },
  { label: "Approach", id: "approach", number: "04", detail: "How we think" },
  { label: "About", id: "about", number: "05", detail: "The studio" },
];
/* What the menu's preview card shows for each link. About uses the brand mark rather than repeating a photo. */
const previews: { src: string; tone?: "warm" | "mark" }[] = [
  { src: "/images/hero/lacuna.webp" },
  { src: "/images/hero/aetherform.webp", tone: "warm" },
  { src: "/images/hero/tecton.webp", tone: "warm" },
  { src: "/images/logo-icon.svg", tone: "mark" },
];
const sectionIds = ["home", ...navLinks.map((link) => link.id), "testimonials", "contact"];
const sectionNames: Record<string, string> = { insights: "Insights", testimonials: "Client perspectives", home: "The studio", work: "Work", services: "Services", approach: "Approach", about: "About", contact: "Let’s talk" };
const PREVIEW_SHAPE = "polygon(7% 0%, 100% 0%, 93% 100%, 0% 100%)";
const PREVIEW_HIDDEN = "polygon(7% 100%, 100% 100%, 93% 100%, 0% 100%)";

export default function Navbar({ page = "home" }: { page?: "home" | "about" | "services" | "work" | "approach" | "contact" | "insights" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(page);
  const [hovered, setHovered] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const sphereTrackRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const openRef = useRef(false);
  const keyboardOpenRef = useRef(false);

  // The menu points at the section being read (or the current page) until a link is hovered.
  const sectionIndex = navLinks.findIndex((link) => link.id === activeSection);
  const pageIndex = navLinks.findIndex((link) => link.id === page);
  const activeIndex = hovered ?? (sectionIndex >= 0 ? sectionIndex : Math.max(0, pageIndex));

  useGSAP(() => {
    const panel = menuRef.current;
    if (!panel) return;
    // The curtain grows out of the menu button, so the island appears to open into the whole screen.
    const origin = () => {
      const b = buttonRef.current?.getBoundingClientRect();
      const x = b && b.width ? b.left + b.width / 2 : window.innerWidth - 48;
      const y = b && b.height ? b.top + b.height / 2 : 48;
      const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      return { x, y, r };
    };
    const q = gsap.utils.selector(panel);
    timelineRef.current = gsap.timeline({ paused: true })
      .set(panel, { autoAlpha: 1 }, 0)
      .fromTo(panel, { clipPath: () => { const o = origin(); return `circle(0px at ${o.x}px ${o.y}px)`; } }, {
        clipPath: () => { const o = origin(); return `circle(${o.r}px at ${o.x}px ${o.y}px)`; },
        duration: 1, ease: "expo.inOut",
      }, 0)
      .fromTo(q(".studio-menu__rule"), { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: "expo.out", stagger: .06 }, .42)
      .fromTo(q(".studio-menu__label"), { yPercent: 112 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: .07 }, .45)
      .fromTo(q(".studio-menu__number, .studio-menu__detail"), { autoAlpha: 0 }, { autoAlpha: 1, duration: .6, stagger: .05 }, .7)
      .fromTo(q(".studio-menu__preview-shape"), { clipPath: PREVIEW_HIDDEN }, { clipPath: PREVIEW_SHAPE, duration: 1.15, ease: "expo.inOut" }, .38)
      .fromTo(q(".studio-menu__reveal"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .7, ease: "power3.out", stagger: .06 }, .62)
      .fromTo(q(".studio-menu__sphere"), { scale: 0 }, { scale: 1, duration: .8, ease: "back.out(2.2)" }, .85);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finishOnReduce = () => {
      if (reduced.matches) timelineRef.current?.progress(openRef.current ? 1 : 0).pause();
    };
    reduced.addEventListener("change", finishOnReduce);
    return () => { reduced.removeEventListener("change", finishOnReduce); timelineRef.current = null; };
  });

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
    // Re-measure the button position each time the curtain starts from closed.
    if (menuOpen && timeline.progress() === 0) timeline.invalidate();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timeline.progress(menuOpen ? 1 : 0).pause();
      if (menuOpen && keyboardOpenRef.current) {
        menuRef.current?.querySelector<HTMLAnchorElement>("nav a")?.focus({ preventScroll: true });
        keyboardOpenRef.current = false;
      }
    } else if (menuOpen) timeline.timeScale(1).play();
    else timeline.timeScale(1.6).reverse();
  }, [menuOpen]);

  // The page behind a full-screen menu must not scroll. Compensate for the scrollbar so nothing shifts.
  useEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const gutter = window.innerWidth - html.clientWidth;
    const previous = { overflow: html.style.overflow, padding: document.body.style.paddingRight };
    html.style.overflow = "hidden";
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    return () => { html.style.overflow = previous.overflow; document.body.style.paddingRight = previous.padding; };
  }, [menuOpen]);

  // The bronze sphere glides to the active row.
  useEffect(() => {
    const place = () => {
      const row = listRef.current?.children[activeIndex] as HTMLElement | undefined;
      if (!row || !sphereTrackRef.current) return;
      sphereTrackRef.current.style.setProperty("--menu-sphere-y", `${(row.offsetTop + row.offsetHeight / 2).toFixed(1)}px`);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [activeIndex, menuOpen]);

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
    // The menu now lives beside the header (a transformed header would trap a full-screen layer), so both count as "inside".
    const inside = (target: EventTarget | null) => headerRef.current?.contains(target as Node) || menuRef.current?.contains(target as Node);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        buttonRef.current?.focus({ preventScroll: true });
      }
    };
    const onPointer = (event: PointerEvent) => { if (!inside(event.target)) setMenuOpen(false); };
    const onFocus = (event: FocusEvent) => { if (!inside(event.target)) setMenuOpen(false); };
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

  const close = () => setMenuOpen(false);

  return <>
    <div className="alyoxa-nav-space" aria-hidden="true" />
    <header ref={headerRef} className={`island-nav${compact ? " is-compact" : ""}${menuOpen ? " is-open" : ""}`}>
      <div className="island-nav__shell">
        <Link href="/#home" className="island-nav__logo" aria-label="Alyoxa home" onClick={(event) => navigate(event, "home")}><Image src="/images/logo.svg" alt="ALYOXA" width={175} height={33} priority /></Link>
        <nav ref={desktopNavRef} className="island-nav__links" aria-label="Main navigation" aria-hidden={compact} inert={compact}>
          {navLinks.map((link) => <a href={`/${link.id}`} key={link.id} aria-current={page === link.id ? "page" : undefined} onClick={close}>{link.label}</a>)}
        </nav>
        <div className="island-nav__location" aria-hidden="true"><span className="island-nav__location-mark" /><span key={activeSection}>{sectionNames[activeSection]}</span></div>
        <BrandButton href="/contact" className="island-nav__cta" size="small" label="Start a project" onClick={close} />
        <button ref={buttonRef} type="button" className="island-nav__toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="alyoxa-island-menu" onClick={(event) => { keyboardOpenRef.current = event.detail === 0; setMenuOpen((previous) => !previous); }}>
          <svg className="island-nav__progress" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20" /></svg><span className="island-nav__toggle-lines" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
    </header>

    {/* Full-screen menu. Rendered beside the header: the header's transform would otherwise clip a fixed layer to it. */}
    <div ref={menuRef} className="studio-menu" id="alyoxa-island-menu" role="dialog" aria-modal="true" aria-label="Site menu" inert={!menuOpen} aria-hidden={!menuOpen}>
      <svg className="studio-menu__orbit" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
        <ellipse cx="900" cy="520" rx="820" ry="250" transform="rotate(-11 900 520)" />
      </svg>
      <div className="studio-menu__inner">
        <div className="studio-menu__head studio-menu__reveal"><span className="studio-menu__head-rule" aria-hidden="true" /><span>Menu</span><span className="studio-menu__head-divider" aria-hidden="true" /><span>Explore the studio</span></div>

        <nav className="studio-menu__nav" aria-label="Explore Alyoxa" onMouseLeave={() => setHovered(null)}>
          <span ref={sphereTrackRef} className="studio-menu__sphere-track" aria-hidden="true"><span className="studio-menu__sphere" /></span>
          <ol ref={listRef} className="studio-menu__list" data-hovering={hovered !== null || undefined}>
            {navLinks.map((link, index) => <li key={link.id} className="studio-menu__item" data-active={index === activeIndex || undefined}>
              <span className="studio-menu__rule" aria-hidden="true" />
              <a className="studio-menu__link" href={`/${link.id}`} aria-current={page === link.id ? "page" : undefined}
                onMouseEnter={() => setHovered(index)} onFocus={() => setHovered(index)} onClick={close}>
                <span className="studio-menu__number">{link.number}</span>
                <span className="studio-menu__mask"><span className="studio-menu__label">{link.label}</span></span>
                <span className="studio-menu__detail">{link.detail}</span>
              </a>
            </li>)}
          </ol>
        </nav>

        <figure className="studio-menu__preview" aria-hidden="true">
          <span className="studio-menu__preview-shape">
            {previews.map((preview, index) => <span key={preview.src} className="studio-menu__frame" data-tone={preview.tone} data-active={index === activeIndex || undefined}>
              <Image src={preview.src} alt="" fill sizes="(max-width: 1024px) 1px, 34vw" />
            </span>)}
          </span>
          <figcaption className="studio-menu__caption studio-menu__reveal"><span>{navLinks[activeIndex].number}</span><span>{navLinks[activeIndex].detail}</span></figcaption>
        </figure>

        <div className="studio-menu__foot">
          <div className="studio-menu__contact studio-menu__reveal"><span>Something on your mind?</span><a href={`mailto:${studioContact.email}`} onClick={close}>{studioContact.email}<ArrowUpRight size={17} aria-hidden="true" /></a></div>
          <SocialLinks tone="dark" className="studio-menu__socials studio-menu__reveal" onNavigate={close} />
          <div className="studio-menu__legal studio-menu__reveal"><Link href="/privacy-policy" onClick={close}>Privacy</Link><span aria-hidden="true">/</span><Link href="/terms-and-conditions" onClick={close}>Terms</Link></div>
          <BrandButton href="/contact" className="studio-menu__start studio-menu__reveal" variant="light" label="Start a project" onClick={close} />
        </div>
      </div>
    </div>
  </>;
}
