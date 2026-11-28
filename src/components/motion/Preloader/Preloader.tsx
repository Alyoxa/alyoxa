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
    const markEl = root.querySelector<SVGSVGElement>(".brand-preloader__mark")!;
    const centres = q(".brand-preloader__portal-centre") as unknown as SVGGElement[];
    const portals = q(".brand-preloader__portal-scale") as unknown as SVGGElement[];
    const core = root.querySelector<SVGCircleElement>(".brand-preloader__portal-core")!;
    const paths = q(".brand-preloader__outline") as unknown as SVGPathElement[];
    const sparks = q(".brand-preloader__spark") as unknown as SVGCircleElement[];
    const digitStrips = Array.from(root.querySelectorAll<HTMLElement>(".brand-preloader__digit-strip"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let finished = false;
    let drawn = false;
    let assetsReady = false;
    let opening = false;
    let refreshFrame = 0;
    let assetDeadline = 0;

    const layout = () => {
      const bounds = root.getBoundingClientRect();
      cover.setAttribute("viewBox", `0 0 ${bounds.width} ${bounds.height}`);
      centres.forEach((centre) => centre.setAttribute("transform", `translate(${bounds.width / 2} ${bounds.height / 2})`));
      if (!opening) gsap.set(portals, { scale: markEl.getBoundingClientRect().width / 80.98, svgOrigin: "0 0" });
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
    gsap.set(markEl, { opacity: 1 });
    gsap.set(centres, { opacity: 0 });
    gsap.set(core, { attr: { r: 0 } });
    gsap.set(q(".brand-preloader__half--l"), { x: -7 });
    gsap.set(q(".brand-preloader__half--r"), { x: 7 });
    gsap.set(q(".brand-preloader__fill"), { opacity: 0 });
    gsap.set(sparks, { opacity: 0 });
    const lengths = paths.map((path) => path.getTotalLength());
    paths.forEach((path, i) => gsap.set(path, { strokeDasharray: lengths[i], strokeDashoffset: lengths[i] }));

    // A spark rides the tip of each half's outline while it draws.
    const tip = { p: 0 };
    const placeSparks = () => sparks.forEach((spark, i) => {
      const path = paths[i * 2 + 1];
      const point = path.getPointAtLength(lengths[i * 2 + 1] * tip.p);
      spark.setAttribute("cx", String(point.x));
      spark.setAttribute("cy", String(point.y));
    });
    const count = { v: 0 };
    // Digits roll by transform: the text never repaints, so the first paint stays the page's largest content.
    const showCount = () => { String(Math.round(count.v)).padStart(3, "0").split("").forEach((digit, i) => { if (digitStrips[i]) digitStrips[i].style.transform = `translateY(${-Number(digit)}em)`; }); };

    const drawing = gsap.timeline({ onComplete: () => { drawn = true; startExit(); } });
    drawing.to(count, { v: 86, duration: 2.1, ease: "power1.inOut", onUpdate: showCount }, 0)
      // The counter is painted with the first frame (no fade-in): it is the page's largest early content.
      .to(sparks, { opacity: 1, duration: .2 }, .1)
      .to(paths, { strokeDashoffset: 0, duration: 1.15, stagger: .06, ease: "power2.inOut" }, .1)
      .to(tip, { p: 1, duration: 1.15, ease: "power2.inOut", onUpdate: placeSparks }, .16)
      .to(sparks, { opacity: 0, attr: { r: 4 }, duration: .35 }, 1.2)
      .to(q(".brand-preloader__fill"), { opacity: 1, duration: .45, stagger: .04, ease: "power2.out" }, 1.05)
      .to(paths, { strokeOpacity: 0, duration: .5 }, 1.25)
      .to(q(".brand-preloader__half"), { x: 0, duration: .75, ease: "back.out(2.2)" }, 1.25)
      .fromTo(q(".brand-preloader__ring"), { attr: { r: 6 }, opacity: .9 }, { attr: { r: 64 }, opacity: 0, duration: 1.1, ease: "power2.out" }, 1.42)
      .fromTo(q(".brand-preloader__shine"), { x: 0 }, { x: 120, duration: .9, ease: "power2.inOut" }, 1.5)
      .from(q(".brand-preloader__letter"), { opacity: 0, yPercent: 110, duration: .7, stagger: .045, ease: "expo.out" }, .5)
      .from(q(".brand-preloader__line"), { scaleX: 0, duration: .8, ease: "power2.inOut" }, .75)
      .call(() => window.dispatchEvent(new Event(INTRO_START)), [], .6);

    const exit = gsap.timeline({ paused: true, onComplete: () => finish() });
    exit.to(count, { v: 100, duration: .35, ease: "power2.out", onUpdate: showCount }, 0)
      .to(q(".brand-preloader__word, .brand-preloader__line, .brand-preloader__meta, .brand-preloader__skip"), { opacity: 0, y: -10, duration: .35, stagger: .03 }, .2)
      .to(centres, { opacity: 1, duration: .01 }, .3)
      .to(markEl, { opacity: 0, duration: .35 }, .32)
      .to(portals, { scale: () => Math.hypot(innerWidth, innerHeight) / 40, rotation: 8, svgOrigin: "0 0", duration: 2, ease: "expo.inOut" }, .45)
      .to(q(".brand-preloader__rim"), { opacity: 0, duration: .7 }, 1.1)
      .to(core, { attr: { r: 70 }, duration: 1.6, ease: "power2.inOut" }, .85)
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

  const halves = [{ side: "l", paths: [iconPaths[0], iconPaths[1]] }, { side: "r", paths: [iconPaths[2], iconPaths[3]] }];
  return <div className="brand-preloader" ref={rootRef}>
    <span className="brand-preloader__status" role="status">Opening Alyoxa</span>
    <svg className="brand-preloader__cover" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="alyoxa-intro-glow" cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor="#3a2416" /><stop offset=".45" stopColor="#140d09" /><stop offset="1" stopColor="#080605" />
        </radialGradient>
        <mask id="alyoxa-intro-window" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
          <rect width="100%" height="100%" fill="white" />
          <g className="brand-preloader__portal-centre" opacity="0"><g className="brand-preloader__portal-scale"><g transform="translate(-40.49 -29.505)">
            {iconPaths.map((path, index) => <path key={index} d={path.d} fill="black" />)}
            <circle className="brand-preloader__portal-core" cx="40.49" cy="12" r="0" fill="black" />
          </g></g></g>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#alyoxa-intro-glow)" mask="url(#alyoxa-intro-window)" />
      {/* A bronze rim traces the window's edge as it opens. */}
      <g className="brand-preloader__portal-centre brand-preloader__rim" opacity="0"><g className="brand-preloader__portal-scale"><g transform="translate(-40.49 -29.505)">
        {[iconPaths[1], iconPaths[3]].map((path, index) => <path key={index} d={path.d} fill="none" stroke="#e0b088" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />)}
      </g></g></g>
    </svg>
    <span className="brand-preloader__grain" aria-hidden="true" />
    <svg className="brand-preloader__mark" viewBox="0 0 80.98 59.01" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="alyoxa-intro-face" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6d8b4" /><stop offset=".45" stopColor="#c58c5c" /><stop offset="1" stopColor="#6f3c1f" /></linearGradient>
        <linearGradient id="alyoxa-intro-fold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#93583a" /><stop offset="1" stopColor="#341a0c" /></linearGradient>
        <linearGradient id="alyoxa-intro-shine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <radialGradient id="alyoxa-intro-spark"><stop offset="0" stopColor="#fff" /><stop offset=".35" stopColor="#ffd9ae" /><stop offset="1" stopColor="#e0a070" stopOpacity="0" /></radialGradient>
        <mask id="alyoxa-intro-shine-mask" style={{ maskType: "alpha" }}>{iconPaths.map((path, index) => <path key={index} d={path.d} fill="#000" />)}</mask>
      </defs>
      <circle className="brand-preloader__ring" cx="40.49" cy="34" r="0" fill="none" stroke="#d9a77c" strokeWidth=".5" opacity="0" />
      {halves.map((half) => (
        <g key={half.side} className={`brand-preloader__half brand-preloader__half--${half.side}`}>
          {half.paths.map((path, index) => <path key={`f${index}`} className="brand-preloader__fill" d={path.d} fill={index === 0 ? "url(#alyoxa-intro-fold)" : "url(#alyoxa-intro-face)"} />)}
          {half.paths.map((path, index) => <path key={`o${index}`} className="brand-preloader__outline" d={path.d} stroke="#d9a77c" strokeWidth=".7" strokeLinejoin="round" strokeLinecap="round" />)}
        </g>
      ))}
      <g mask="url(#alyoxa-intro-shine-mask)"><rect className="brand-preloader__shine" x="-34" y="-5" width="24" height="70" fill="url(#alyoxa-intro-shine)" transform="skewX(-18)" /></g>
      {halves.map((half) => <circle key={half.side} className="brand-preloader__spark" r="2.6" fill="url(#alyoxa-intro-spark)" />)}
    </svg>
    <span className="brand-preloader__word" aria-hidden="true">{"ALYOXA".split("").map((letter, index) => <span key={index} className="brand-preloader__letter">{letter}</span>)}</span>
    <span className="brand-preloader__line" aria-hidden="true" />
    <div className="brand-preloader__meta" aria-hidden="true">
      <span className="brand-preloader__count"><span className="brand-preloader__count-value">{[0, 1, 2].map((column) => <span key={column} className="brand-preloader__digit"><span className="brand-preloader__digit-strip">{"0123456789".split("").map((digit) => <span key={digit}>{digit}</span>)}</span></span>)}</span><sup>%</sup></span>
      <span className="brand-preloader__tagline">Creative Technology Studio</span>
    </div>
    <button className="brand-preloader__skip" type="button" onClick={() => skipRef.current()}>Skip intro</button>
  </div>;
}
