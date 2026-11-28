"use client";

import { useRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type PointerEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import "./BrandButton.css";

type Appearance = {
  label: string;
  className?: string;
  variant?: "solid" | "light" | "outline" | "text";
  size?: "regular" | "small";
  shape?: "pill" | "orb";
  note?: string;
};
type AnchorProps = Appearance & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & { href: string };
type ButtonProps = Appearance & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & { href?: never };
type Props = AnchorProps | ButtonProps;

function isLink(props: Props): props is AnchorProps { return typeof props.href === "string"; }

/** Bronze sphere roll, copper trail, magnetic lean and travelling arrow, shared site-wide. */
export default function BrandButton(props: Props) {
  const lastPointer = useRef<string | null>(null);
  const { label, className = "", variant = "solid", size = "regular", shape = "pill", note } = props;
  const appearance = {
    className: `brand-button ${className}`,
    "data-variant": variant,
    "data-size": size,
    "data-shape": shape,
  };
  const magnet = useRef(0);
  /** Measures how far the bronze sphere must roll, and how far the label slides, for this button's real size. */
  function measureRoll(button: HTMLElement) {
    const icon = button.querySelector<HTMLElement>(".brand-button__icon");
    const text = button.querySelector<HTMLElement>(".brand-button__label");
    if (!icon || !text) return;
    const b = button.getBoundingClientRect(), i = icon.getBoundingClientRect(), t = text.getBoundingClientRect();
    const inset = b.right - i.right; // the sphere sits the same distance from the left edge after rolling
    const travel = i.left - (b.left + inset);
    const gap = i.left - t.right;
    button.style.setProperty("--brand-travel", `${(-travel).toFixed(1)}px`);
    button.style.setProperty("--brand-label-shift", `${(b.left + inset + i.width + gap - t.left).toFixed(1)}px`);
  }
  /** A gentle magnetic lean toward the cursor; springs back on leave (fine pointers only). */
  function lean(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = event.currentTarget, { clientX, clientY } = event;
    cancelAnimationFrame(magnet.current);
    magnet.current = requestAnimationFrame(() => {
      const b = el.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (clientX - b.left - b.width / 2) / (b.width / 2)));
      const y = Math.max(-1, Math.min(1, (clientY - b.top - b.height / 2) / (b.height / 2)));
      el.style.setProperty("--brand-mx", `${(x * 6).toFixed(1)}px`);
      el.style.setProperty("--brand-my", `${(y * 4).toFixed(1)}px`);
    });
  }
  function release(event: PointerEvent<HTMLElement>) {
    cancelAnimationFrame(magnet.current);
    event.currentTarget.style.setProperty("--brand-mx", "0px");
    event.currentTarget.style.setProperty("--brand-my", "0px");
  }
  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    measureRoll(event.currentTarget);
    // Measure only on entry, avoiding layout reads on every pointer movement.
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, (event.clientX - bounds.left) / bounds.width * 100));
    const y = Math.min(100, Math.max(0, (event.clientY - bounds.top) / bounds.height * 100));
    const origin = `${x.toFixed(1)}% ${y.toFixed(1)}%`;
    if (lastPointer.current !== origin) {
      event.currentTarget.style.setProperty("--brand-reveal-origin", origin);
      lastPointer.current = origin;
    }
  }
  const content = <>
    <span className="brand-button__label"><span className="brand-button__label-main">{label}</span><span className="brand-button__label-copy" aria-hidden="true">{label}</span></span>
    <span className="brand-button__icon" aria-hidden="true"><ArrowUpRight className="brand-button__arrow" size={18} strokeWidth={1.5} /><ArrowUpRight className="brand-button__arrow-copy" size={18} strokeWidth={1.5} /></span>
    {note && <span className="brand-button__note">{note}</span>}
  </>;
  if (isLink(props)) {
    const { label: _label, className: _className, variant: _variant, size: _size, shape: _shape, note: _note, onPointerEnter, onPointerMove, onPointerLeave, onFocus, ...attributes } = props;
    return <a {...attributes} {...appearance}
      onPointerEnter={(event) => { trackPointer(event); onPointerEnter?.(event); }}
      onPointerMove={(event) => { lean(event); onPointerMove?.(event); }}
      onPointerLeave={(event) => { release(event); onPointerLeave?.(event); }}
      onFocus={(event) => { measureRoll(event.currentTarget); onFocus?.(event); }}>{content}</a>;
  }
  const { label: _label, className: _className, variant: _variant, size: _size, shape: _shape, note: _note, onPointerEnter, onPointerMove, onPointerLeave, onFocus, ...attributes } = props;
  return <button {...attributes} {...appearance} type={attributes.type ?? "button"}
    onPointerEnter={(event) => { if (!props.disabled) trackPointer(event); onPointerEnter?.(event); }}
    onPointerMove={(event) => { if (!props.disabled) lean(event); onPointerMove?.(event); }}
    onPointerLeave={(event) => { release(event); onPointerLeave?.(event); }}
    onFocus={(event) => { measureRoll(event.currentTarget); onFocus?.(event); }}>{content}</button>;
}
