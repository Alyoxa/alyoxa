"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import "./CardDialog.css";

type Options = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  scrollRef: RefObject<HTMLDivElement | null>;
  source: HTMLElement | null;
  surface: string;
  onClose: () => void;
};

/** Convert the card's CSS skew/rotation/scale into a viewport-space matrix. */
function cardFrame(source: HTMLElement) {
  const style = getComputedStyle(source);
  const bounds = source.getBoundingClientRect();
  const width = parseFloat(style.width) || source.offsetWidth;
  const height = parseFloat(style.height) || source.offsetHeight;
  const matrix = new DOMMatrixReadOnly(style.transform === "none" ? undefined : style.transform);
  const xs = [0, matrix.a * width, matrix.c * height, matrix.a * width + matrix.c * height];
  const ys = [0, matrix.b * width, matrix.d * height, matrix.b * width + matrix.d * height];
  const x = bounds.left - Math.min(...xs);
  const y = bounds.top - Math.min(...ys);
  return {
    width, height, borderRadius: style.borderRadius,
    borderColor: style.borderColor, boxShadow: style.boxShadow,
    transform: `matrix(${matrix.a},${matrix.b},${matrix.c},${matrix.d},${x},${y})`,
  };
}

/** One reversible card-to-dialog transition, shared by projects and services. */
export function useCardDialog({ dialogRef, scrollRef, source, surface, onClose }: Options) {
  const callbackRef = useRef(onClose);
  const closeRef = useRef<() => void>(() => {});
  useLayoutEffect(() => { callbackRef.current = onClose; }, [onClose]);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const scroll = scrollRef.current;
    if (!dialog || !scroll) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousDialogStyle = dialog.style.cssText;
    const previousScrollStyle = scroll.style.cssText;
    const previousScrollInert = scroll.inert;
    const previousVisibility = source?.style.visibility ?? "";
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let phase: "opening" | "open" | "closing" | "closed" = "opening";
    let timeline: gsap.core.Timeline | null = null;
    let closingFrame = 0;
    let ghost: HTMLElement | null = null;
    const backing = document.createElement("div");
    backing.className = "card-dialog__backing";
    backing.style.background = surface;
    backing.setAttribute("aria-hidden", "true");
    dialog.prepend(backing);
    dialog.classList.add("card-dialog");
    dialog.style.background = "transparent";
    scroll.style.background = surface;
    scroll.classList.add("card-dialog__content");
    scroll.inert = true;

    if (source && !reduced.matches) {
      const frame = cardFrame(source);
      ghost = source.cloneNode(true) as HTMLElement;
      ghost.classList.add("card-dialog__ghost");
      ghost.inert = true;
      ghost.setAttribute("aria-hidden", "true");
      ghost.removeAttribute("id");
      ghost.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      Object.assign(ghost.style, {
        position: "fixed", top: "0px", left: "0px", right: "auto", bottom: "auto",
        width: `${frame.width}px`, height: `${frame.height}px`, margin: "0px",
        minWidth: "0px", maxWidth: "none", minHeight: "0px", maxHeight: "none",
        transformOrigin: "0px 0px", transform: frame.transform,
        translate: "none", rotate: "none", scale: "none",
        visibility: "visible", opacity: "1", borderRadius: frame.borderRadius,
        borderColor: frame.borderColor, boxShadow: frame.boxShadow,
      });
      dialog.append(ghost);
      source.style.visibility = "hidden";
    }

    const viewport = () => {
      const bounds = dialog.getBoundingClientRect();
      return { width: bounds.width, height: bounds.height };
    };
    const focusClose = () => dialog.querySelector<HTMLElement>("[autofocus]")?.focus({ preventScroll: true });
    const showContent = () => {
      phase = "open";
      scroll.inert = previousScrollInert;
      gsap.set(scroll, { opacity: 1, y: 0 });
      gsap.set(backing, { opacity: 1 });
      if (ghost) gsap.set(ghost, { opacity: 0, visibility: "hidden" });
      focusClose();
      dialog.dataset.cardPhase = "open";
    };
    const restoreSource = () => { if (source) source.style.visibility = previousVisibility; };
    const finishClose = () => {
      if (phase === "closed") return;
      phase = "closed";
      restoreSource();
      dialog.close();
      callbackRef.current();
    };

    gsap.set(scroll, { opacity: reduced.matches ? 1 : 0, y: reduced.matches ? 0 : 16 });
    gsap.set(backing, { opacity: reduced.matches ? 1 : 0 });
    dialog.showModal();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    dialog.dataset.cardPhase = "opening";
    if (reduced.matches) showContent();
    else {
      timeline = gsap.timeline({ onComplete: showContent });
      if (ghost) {
        timeline.to(ghost, {
          ...viewport(), x: 0, y: 0, rotation: 0, skewX: 0, skewY: 0,
          scaleX: 1, scaleY: 1, borderRadius: 0, boxShadow: "none",
          duration: 1.05, ease: "power3.inOut",
        }, 0)
          .to(ghost.querySelectorAll(".work__project-content, .services__card-content, .portfolio-card__meta"), { opacity: 0, duration: .25 }, .15)
          .to(ghost, { opacity: 0, duration: .25 }, 1);
      }
      timeline.to(backing, { opacity: 1, duration: .45 }, .24)
        .to(scroll, { opacity: 1, y: 0, duration: .35, ease: "power3.out" }, ghost ? .9 : 0);
    }

    const close = () => {
      if (phase === "closing" || phase === "closed") return;
      if (reduced.matches) { timeline?.kill(); finishClose(); return; }
      if (phase === "opening" && timeline) {
        // Cancelling before the first frame cannot trigger reverse completion.
        if (timeline.time() <= .001) { timeline.kill(); finishClose(); return; }
        phase = "closing";
        dialog.dataset.cardPhase = "closing";
        timeline.eventCallback("onComplete", null);
        timeline.eventCallback("onReverseComplete", finishClose);
        timeline.timeScale(1.15).reverse();
        return;
      }
      phase = "closing";
      dialog.dataset.cardPhase = "closing";
      scroll.inert = true;
      timeline?.kill();
      // If a resize moved the original card away, return it to the viewport
      // beneath the opaque detail view before measuring the closing destination.
      if (source?.isConnected) {
        const bounds = source.getBoundingClientRect();
        if (bounds.bottom < 96 || bounds.top > innerHeight - 48) source.scrollIntoView({ block: "center", behavior: "instant" });
      }
      closingFrame = requestAnimationFrame(() => {
        if (phase !== "closing") return;
        timeline = gsap.timeline({ onComplete: finishClose });
        if (ghost && source?.isConnected) {
          const target = cardFrame(source);
          gsap.set(ghost, { ...viewport(), x: 0, y: 0, rotation: 0, skewX: 0, skewY: 0, scaleX: 1, scaleY: 1, borderRadius: 0, opacity: 1, visibility: "visible" });
          const metadata = ghost.querySelectorAll(".work__project-content, .services__card-content, .portfolio-card__meta");
          gsap.set(metadata, { opacity: 0 });
          timeline.to(scroll, { opacity: 0, y: 10, duration: .25 }, 0)
            .to(ghost, { ...target, duration: .95, ease: "power3.inOut" }, .08)
            .to(backing, { opacity: 0, duration: .45 }, .38)
            .to(metadata, { opacity: 1, duration: .3 }, .65);
        } else timeline.to(scroll, { opacity: 0, duration: .25 }).to(backing, { opacity: 0, duration: .15 }, 0);
      });
    };
    closeRef.current = close;
    const onReduced = () => {
      if (!reduced.matches) return;
      timeline?.kill();
      if (phase === "closing") finishClose();
      else if (phase !== "closed") showContent();
    };
    reduced.addEventListener("change", onReduced);
    return () => {
      cancelAnimationFrame(closingFrame);
      timeline?.kill();
      reduced.removeEventListener("change", onReduced);
      restoreSource();
      ghost?.remove();
      backing.remove();
      scroll.inert = previousScrollInert;
      scroll.classList.remove("card-dialog__content");
      scroll.style.cssText = previousScrollStyle;
      dialog.close();
      dialog.classList.remove("card-dialog");
      delete dialog.dataset.cardPhase;
      dialog.style.cssText = previousDialogStyle;
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
      closeRef.current = () => {};
    };
  }, [dialogRef, scrollRef, source, surface]);

  return () => closeRef.current();
}
