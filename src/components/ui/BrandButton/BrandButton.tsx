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

/** The copper reveal, rolling label, and travelling arrow are shared site-wide. */
export default function BrandButton(props: Props) {
  const lastPointer = useRef<string | null>(null);
  const { label, className = "", variant = "solid", size = "regular", shape = "pill", note } = props;
  const appearance = {
    className: `brand-button ${className}`,
    "data-variant": variant,
    "data-size": size,
    "data-shape": shape,
  };
  function trackPointer(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
    const { label: _label, className: _className, variant: _variant, size: _size, shape: _shape, note: _note, onPointerEnter, ...attributes } = props;
    return <a {...attributes} {...appearance} onPointerEnter={(event) => { trackPointer(event); onPointerEnter?.(event); }}>{content}</a>;
  }
  const { label: _label, className: _className, variant: _variant, size: _size, shape: _shape, note: _note, onPointerEnter, ...attributes } = props;
  return <button {...attributes} {...appearance} type={attributes.type ?? "button"} onPointerEnter={(event) => { if (!props.disabled) trackPointer(event); onPointerEnter?.(event); }}>{content}</button>;
}
