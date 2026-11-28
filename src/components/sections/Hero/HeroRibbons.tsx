"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { INTRO_DONE, INTRO_START } from "@/components/motion/Preloader/introState";
import { desktopRibbons, mobileRibbons, ribbonFrame, type RibbonDef, type RibbonLayout, type RibbonPointer } from "./ribbonGeometry";

gsap.registerPlugin(useGSAP);

const MOBILE_MQ = "(max-width: 700px)";

function Defs({ layout }: { layout: RibbonLayout }) {
  const { width: W, height: H } = layout;
  const p = `hero-ribbon-${layout.name}`;
  return <defs>
    <linearGradient id={`${p}-wash`} gradientUnits="userSpaceOnUse" x1="0" y1={H} x2={W} y2="0">
      <stop offset="0" stopColor="#f2e3d5" /><stop offset=".42" stopColor="#e8d0bc" /><stop offset=".68" stopColor="#f8efe6" /><stop offset="1" stopColor="#e0c1a8" />
    </linearGradient>
    <linearGradient id={`${p}-band`} gradientUnits="userSpaceOnUse" x1="0" y1={H * .7} x2={W} y2={H * .2}>
      <stop offset="0" stopColor="#efdccb" /><stop offset=".35" stopColor="#dfbfa4" /><stop offset=".6" stopColor="#f5e8dc" /><stop offset="1" stopColor="#d4ad8e" />
    </linearGradient>
    <linearGradient id={`${p}-crest`} gradientUnits="userSpaceOnUse" x1={W * .55} y1="0" x2={W} y2={H * .3}>
      <stop offset="0" stopColor="#efdccd" /><stop offset=".45" stopColor="#dbb89c" /><stop offset=".75" stopColor="#f3e4d7" /><stop offset="1" stopColor="#cfa485" />
    </linearGradient>
    <linearGradient id={`${p}-veil`} gradientUnits="userSpaceOnUse" x1="0" y1={H} x2={W} y2={H * .8}>
      <stop offset="0" stopColor="#ffffff" /><stop offset=".4" stopColor="#fbf6f0" /><stop offset=".7" stopColor="#efdfd0" /><stop offset="1" stopColor="#fdfaf6" />
    </linearGradient>
    <linearGradient id={`${p}-sheen`} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
      <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".3" stopColor="#fff" stopOpacity=".95" /><stop offset=".55" stopColor="#fff8f1" stopOpacity=".5" /><stop offset=".8" stopColor="#fff" stopOpacity=".95" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
    </linearGradient>
    <radialGradient id={`${p}-light`}><stop offset="0" stopColor="#fff" stopOpacity=".8" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></radialGradient>
  </defs>;
}

function Ribbons({ defs, layout }: { defs: RibbonDef[]; layout: RibbonLayout }) {
  const p = `hero-ribbon-${layout.name}`;
  return <>{defs.map((def) => {
    const f = ribbonFrame(def, 0);
    return <g key={def.id} opacity={def.opacity}>
      <path data-ribbon={def.id} data-part="body" d={f.body} fill={`url(#${p}-${def.gradient})`} />
      <path data-ribbon={def.id} data-part="shade" d={f.shade} fill="none" stroke="#c49f82" strokeOpacity=".22" strokeWidth="1" />
      <path data-ribbon={def.id} data-part="sheen" d={f.sheen} fill="none" stroke={`url(#${p}-sheen)`} strokeOpacity={def.sheen} strokeWidth="1.6" strokeLinecap="round" />
    </g>;
  })}</>;
}

function Field({ layout, layer }: { layout: RibbonLayout; layer: "back" | "front" }) {
  const p = `hero-ribbon-${layout.name}`;
  return <svg className="hero-ribbons__svg" data-layout={layout.name} viewBox={`0 0 ${layout.width} ${layout.height}`} preserveAspectRatio="xMidYMid slice" overflow="visible" focusable="false">
    {layer === "back" && <Defs layout={layout} />}
    <Ribbons defs={layer === "back" ? layout.back : layout.front} layout={layout} />
    {layer === "back" && <ellipse data-light cx={layout.width * .3} cy={layout.height * .4} rx={layout.width * .28} ry={layout.height * .34} fill={`url(#${p}-light)`} />}
  </svg>;
}

/** Living champagne ribbons for the hero: a back layer behind the cards and a front veil over their lower edges. */
export default function HeroRibbons() {
  const backRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const back = backRef.current, front = frontRef.current;
    const hero = back?.closest<HTMLElement>(".hero");
    if (!back || !front || !hero) return;
    const mm = gsap.matchMedia();
    mm.add({ any: "all", mobile: MOBILE_MQ, reduce: "(prefers-reduced-motion: reduce)", fine: "(hover: hover) and (pointer: fine)" }, (ctx) => {
      const { mobile, reduce, fine } = ctx.conditions as Record<string, boolean>;
      const layout = mobile ? mobileRibbons : desktopRibbons;
      const svgs = [back, front].map((layer) => layer.querySelector<SVGSVGElement>(`svg[data-layout="${layout.name}"]`)!);
      const ribbons = [...layout.back, ...layout.front].map((def) => {
        const host = layout.back.includes(def) ? svgs[0] : svgs[1];
        const part = (name: string) => host.querySelector<SVGPathElement>(`[data-ribbon="${def.id}"][data-part="${name}"]`)!;
        return { def, body: part("body"), sheen: part("sheen"), shade: part("shade") };
      });
      const light = svgs[0].querySelector<SVGEllipseElement>("[data-light]")!;
      const pointer: RibbonPointer = { x: layout.width / 2, y: layout.height / 2, strength: 0 };
      const target = { ...pointer };
      const motion = { speed: 0 };
      let clock = reduce ? 6 : 0;

      const draw = () => {
        for (const rb of ribbons) {
          const f = ribbonFrame(rb.def, clock, pointer);
          rb.body.setAttribute("d", f.body);
          rb.sheen.setAttribute("d", f.sheen);
          rb.shade.setAttribute("d", f.shade);
        }
        light.setAttribute("cx", String(layout.width * (.45 + .3 * Math.sin(clock * .07))));
        light.setAttribute("cy", String(layout.height * (.4 + .18 * Math.sin(clock * .05 + 1.3))));
      };
      draw();

      // Fade in with the hero's own intro, which waits for the preloader.
      const reveal = gsap.fromTo([back, front], { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? .4 : 2.6, ease: "power2.out", paused: true });
      const wake = gsap.to(motion, { speed: 1, duration: 4, ease: "power1.inOut", paused: true });
      const start = () => {
        if (document.documentElement.dataset.alyoxaIntro === "pending") return;
        reveal.play(); wake.play();
      };
      window.addEventListener(INTRO_START, start);
      window.addEventListener(INTRO_DONE, start);
      start();
      if (reduce) return () => { window.removeEventListener(INTRO_START, start); window.removeEventListener(INTRO_DONE, start); };

      // Redraw only while the hero is on screen and the tab is visible. Touch devices redraw at 30fps.
      let inView = true;
      const io = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; });
      io.observe(hero);
      let frame = 0;
      const tick = (_t: number, deltaMs: number) => {
        if (!inView || document.hidden) return;
        clock += Math.min(deltaMs / 1000, 1 / 20) * motion.speed;
        pointer.x += (target.x - pointer.x) * .04;
        pointer.y += (target.y - pointer.y) * .04;
        pointer.strength += (target.strength - pointer.strength) * .03;
        frame++;
        if (fine || frame % 2 === 0) draw();
      };
      gsap.ticker.add(tick);

      let removePointer = () => {};
      if (fine) {
        const moves = svgs.map((svg, i) => ({ x: gsap.quickTo(svg, "x", { duration: 2, ease: "power3.out" }), y: gsap.quickTo(svg, "y", { duration: 2, ease: "power3.out" }), d: i === 0 ? -10 : 18 }));
        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          const nx = (e.clientX / window.innerWidth) * 2 - 1, ny = (e.clientY / window.innerHeight) * 2 - 1;
          moves.forEach((m) => { m.x(nx * m.d); m.y(ny * m.d * .7); });
          const ctm = svgs[0].getScreenCTM();
          if (ctm) {
            const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
            target.x = pt.x; target.y = pt.y; target.strength = 1;
          }
        };
        const onLeave = () => { moves.forEach((m) => { m.x(0); m.y(0); }); target.strength = 0; };
        window.addEventListener("pointermove", onMove, { passive: true });
        document.documentElement.addEventListener("pointerleave", onLeave);
        removePointer = () => { window.removeEventListener("pointermove", onMove); document.documentElement.removeEventListener("pointerleave", onLeave); };
      }

      return () => {
        gsap.ticker.remove(tick);
        io.disconnect();
        removePointer();
        window.removeEventListener(INTRO_START, start);
        window.removeEventListener(INTRO_DONE, start);
      };
    });
    return () => mm.revert();
  });

  return <>
    <div ref={backRef} className="hero-ribbons hero-ribbons--back" aria-hidden="true">
      <Field layout={desktopRibbons} layer="back" /><Field layout={mobileRibbons} layer="back" />
    </div>
    <div ref={frontRef} className="hero-ribbons hero-ribbons--front" aria-hidden="true">
      <Field layout={desktopRibbons} layer="front" /><Field layout={mobileRibbons} layer="front" />
    </div>
  </>;
}
