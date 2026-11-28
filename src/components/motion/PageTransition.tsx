"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import AlyoxaMark from "@/components/ui/AlyoxaMark/AlyoxaMark";
import "./PageTransition.css";

/* Between pages a dark curtain opens as a circle from the click point (like the menu),
   the route changes underneath, then the curtain lifts away. */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const pending = useRef<string | null>(null);

  useEffect(() => {
    const curtain = ref.current;
    if (!curtain) return;
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname) return;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      pending.current = url.pathname;
      router.prefetch(href);
      gsap.killTweensOf(curtain);
      gsap.set(curtain, { "--x": `${e.clientX}px`, "--y": `${e.clientY}px`, "--r": "0%", "--lift": "0%", visibility: "visible" });
      curtain.classList.add("is-active");
      gsap.to(curtain, { "--r": "150%", duration: .75, ease: "power3.inOut", onComplete: () => router.push(href) });
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [router]);

  useEffect(() => {
    const curtain = ref.current;
    if (!curtain || pending.current !== pathname) return;
    pending.current = null;
    window.scrollTo(0, 0);
    gsap.to(curtain, { "--lift": "100%", duration: .9, delay: .15, ease: "expo.inOut", onComplete: () => { gsap.set(curtain, { visibility: "hidden" }); curtain.classList.remove("is-active"); } });
  }, [pathname]);

  return (
    <div ref={ref} className="page-curtain" aria-hidden="true">
      <AlyoxaMark className="page-curtain__mark" />
    </div>
  );
}
