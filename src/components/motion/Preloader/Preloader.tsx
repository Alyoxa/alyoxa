"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { iconPaths } from "./iconPaths";
import { INTRO_DONE, INTRO_SESSION_KEY, INTRO_START } from "./introState";
import "./Preloader.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
let activeIntroRun: object | null = null;

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const skipRef = useRef<() => void>(() => {});
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const arm = () => { if (document.documentElement.dataset.alyoxaIntro === "pending") setArmed(true); };
    const observer = new MutationObserver(arm);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-alyoxa-intro"] });
    arm();
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    if (!armed || !root || html.dataset.alyoxaIntro !== "pending") return;
    const run = {};
    activeIntroRun = run;
    const site = document.getElementById("alyoxa-site");
    const originalInert = site?.inert ?? false;
    if (site) site.inert = true;
    const q = gsap.utils.selector(root);
    const cover = root.querySelector<SVGSVGElement>(".brand-preloader__cover")!;
    const centre = root.querySelector<SVGGElement>(".brand-preloader__portal-centre")!;
    const portal = root.querySelector<SVGGElement>(".brand-preloader__portal-scale")!;
    const core = root.querySelector<SVGCircleElement>(".brand-preloader__portal-core")!;
    const paths = Array.from(root.querySelectorAll<SVGPathElement>(".brand-preloader__mark path"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let finished = false;
    let drawn = false;
    let assetsReady = false;
    let opening = false;
    let refreshFrame = 0;
    let assetDeadline = 0;
    let drawing: gsap.core.Timeline;
    let exit: gsap.core.Timeline;

    const layout = () => {
      const bounds = root.getBoundingClientRect();
      cover.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      centre.setAttribute("transform", `translate(${bounds.width / 2} ${bounds.height / 2})`);
      if (!opening) gsap.set(portal, { scale: root.querySelector(".brand-preloader__mark")!.getBoundingClientRect().width / 80.98, svgOrigin: "0 0" });
    };
    const finish = (remember = true) => {
      if (finished) return;
      finished = true;
      drawing?.kill();
      exit?.kill();
      clearTimeout(assetDeadline);
      html.dataset.alyoxaIntro = "ready";
      if (site) site.inert = originalInert;
      if (remember) { try { sessionStorage.setItem(INTRO_SESSION_KEY, "1"); } catch {} }
      if (root.contains(document.activeElement)) site?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
      window.dispatchEvent(new Event(INTRO_DONE));
      refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    skipRef.current = () => finish();
    const startExit = () => {
      if (finished || opening || !drawn || !assetsReady) return;
      opening = true;
      html.dataset.alyoxaIntro = "opening";
      exit.play(0);
    };
    layout();
    gsap.set(q(".brand-preloader__mark"), { opacity: 1 });
    gsap.set(centre, { opacity: 0 });
    gsap.set(core, { attr: { r: 0 } });
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length, fillOpacity: 0, strokeOpacity: 1 });
    });
    drawing = gsap.timeline({ onComplete: () => { drawn = true; startExit(); } });
    drawing.to(paths, { strokeDashoffset: 0, duration: .95, stagger: .055, ease: "power2.inOut" }, .08)
      .to(paths, { fillOpacity: 1, strokeOpacity: 0, duration: .28, stagger: .025, ease: "power2.out" }, .82)
      .from(q(".brand-preloader__word"), { opacity: 0, y: 10, duration: .6, ease: "power3.out" }, .35)
      .from(q(".brand-preloader__line"), { scaleX: 0, duration: .65, ease: "power2.inOut" }, .45)
      .call(() => window.dispatchEvent(new Event(INTRO_START)), [], .6);
    exit = gsap.timeline({ paused: true, onComplete: () => finish() });
    exit.to(q(".brand-preloader__mark"), { opacity: 0, duration: .22 }, 0)
      .to(q(".brand-preloader__word, .brand-preloader__line"), { opacity: 0, y: -8, duration: .25 }, 0)
      .to(centre, { opacity: 1, duration: .2 }, 0)
      .to(portal, { scale: () => Math.hypot(innerWidth, innerHeight) / 45, svgOrigin: "0 0", duration: 2.1, ease: "power3.inOut" }, .4)
      .to(core, { attr: { r: 70 }, duration: 1.7, ease: "power2.inOut" }, .85)
      .call(() => window.dispatchEvent(new Event(INTRO_START)), [], .12);

    const heroImages = Array.from(document.querySelectorAll<HTMLImageElement>(".hero__project-media img"));
    const ready = Promise.allSettled([document.fonts.ready, ...heroImages.map((image) => image.decode())]);
    const deadline = new Promise<void>((resolve) => { assetDeadline = window.setTimeout(resolve, 1800); });
    void Promise.race([ready, deadline]).then(() => {
      if (finished) return;
      assetsReady = true;
      startExit();
    });
    const onReduced = () => { if (reduced.matches) finish(); };
    const onFallback = () => { if (!finished && html.dataset.alyoxaIntro === "ready") finish(); };
    window.addEventListener("resize", layout);
    window.addEventListener(INTRO_DONE, onFallback);
    reduced.addEventListener("change", onReduced);
    return () => {
      window.removeEventListener("resize", layout);
      window.removeEventListener(INTRO_DONE, onFallback);
      reduced.removeEventListener("change", onReduced);
      const completed = finished;
      finished = true;
      drawing?.kill();
      exit?.kill();
      clearTimeout(assetDeadline);
      if (site) site.inert = originalInert;
      cancelAnimationFrame(refreshFrame);
      skipRef.current = () => {};
      // Strict Mode replays the effect immediately. Only a real unmount releases
      // the page here; a replacement run keeps control of its own introduction.
      queueMicrotask(() => {
        if (activeIntroRun !== run) return;
        activeIntroRun = null;
        if (!completed) {
          html.dataset.alyoxaIntro = "ready";
          window.dispatchEvent(new Event(INTRO_DONE));
        }
      });
    };
  }, { scope: rootRef, dependencies: [armed], revertOnUpdate: true });

  return <div className="brand-preloader" ref={rootRef}>
    <span className="brand-preloader__status" role="status">Opening Alyoxa</span>
    <svg className="brand-preloader__cover" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs><mask id="alyoxa-intro-window" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
        <rect width="100%" height="100%" fill="white" />
        <g className="brand-preloader__portal-centre" opacity="0"><g className="brand-preloader__portal-scale"><g transform="translate(-40.49 -29.505)">
          {iconPaths.map((path, index) => <path key={index} d={path.d} fill="black" />)}
          <circle className="brand-preloader__portal-core" cx="40.49" cy="12" r="0" fill="black" />
        </g></g></g>
      </mask></defs>
      <rect width="100%" height="100%" fill="white" mask="url(#alyoxa-intro-window)" />
    </svg>
    <svg className="brand-preloader__mark" viewBox="0 0 80.98 59.01" fill="none" aria-hidden="true">{iconPaths.map((path, index) => <path key={index} d={path.d} fill={path.fill} fillOpacity="0" stroke="#b6a18c" strokeWidth=".8" strokeLinejoin="round" />)}</svg>
    <span className="brand-preloader__word">ALYOXA</span><span className="brand-preloader__line" aria-hidden="true" />
    <button className="brand-preloader__skip" type="button" onClick={() => skipRef.current()}>Skip intro</button>
  </div>;
}
