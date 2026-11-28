import { useId } from "react";
import "./AlyoxaMark.css";

/* The ALYOXA icon as two halves, so they can be animated together (bronze by default). */
export default function AlyoxaMark({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={className} viewBox="0 0 80.98 59.01" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-face`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f3d2ad" /><stop offset=".45" stopColor="#c28a5c" /><stop offset="1" stopColor="#7a4526" />
        </linearGradient>
        <linearGradient id={`${id}-fold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8d5432" /><stop offset="1" stopColor="#3e2010" />
        </linearGradient>
        <linearGradient id={`${id}-shine`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".75" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${id}-clip`} style={{ maskType: "alpha" }}><use href={`#${id}-l`} /><use href={`#${id}-r`} /></mask>
      </defs>
      <g className="alyoxa-mark__half alyoxa-mark__half--l" id={`${id}-l`}>
        <path fill={`url(#${id}-face)`} d="m.35,53.74c.26-.01-1.72-1.64,1.57-6.54L26.75,6.49S30.37-.91,38.73.09c0,0,1.38-.19.86,3.58,0,.27-.14,11.09-.14,11.36,0,0,0,.28,0,.28,0,0,0,0,0,0,0,0-.07.07-.1.12-.03.04-.06.07-.06.08-.09.12-9.15,12.51-13.11,17.73-2.79,3.68-4.31,5.41-6.54,7.93-3.13,3.54-6.47,5.58-12.79,9.97-.57.4-1.62,1.11-3.15,1.72-1.34.53-2.52.76-3.34.87Z" />
        <path fill={`url(#${id}-fold)`} d="m38.86,15.78c1.55.78-19.43,37.07-22.58,40.58-.12.13-.23.24-.23.24-1.84,1.87-4.47,2.38-6.94,2.38-.73.06-3.03.16-5.34-1.3-2.44-1.55-3.32-3.82-3.55-4.5,1.71-.53,3.13-1.05,4.2-1.46.37-.14,1.15-.44,2.13-.9.63-.3,1.61-.85,1.61-.85,0,0,1.73-1.25,1.98-1.43,2.29-1.66,4.96-3.61,7.92-6.3.75-.68,1.44-1.34,2.16-2.07,2.41-2.45,4.01-4.52,4.75-5.51,6.18-8.19,13.03-19.32,13.89-18.88Z" />
      </g>
      <g className="alyoxa-mark__half alyoxa-mark__half--r" id={`${id}-r`}>
        <path fill={`url(#${id}-face)`} d="m80.62,53.74c-.26-.01,1.72-1.64-1.57-6.54L54.23,6.49S50.6-.91,42.25.09c0,0-1.38-.19-.86,3.58,0,.27.14,11.09.14,11.36,0,0,0,.28,0,.28,0,0,0,0,0,0,0,0,.07.07.1.12.03.04.06.07.06.08.09.12,9.15,12.51,13.11,17.73,2.79,3.68,4.31,5.41,6.54,7.93,3.13,3.54,6.47,5.58,12.79,9.97.57.4,1.62,1.11,3.15,1.72,1.34.53,2.52.76,3.34.87Z" />
        <path fill={`url(#${id}-fold)`} d="m42.11,15.78c-1.55.78,19.43,37.07,22.58,40.58.12.13.23.24.23.24,1.84,1.87,4.47,2.38,6.94,2.38.73.06,3.03.16,5.34-1.3,2.44-1.55,3.32-3.82,3.55-4.5-1.71-.53-3.13-1.05-4.2-1.46-.37-.14-1.15-.44-2.13-.9-.63-.3-1.61-.85-1.61-.85,0,0-1.73-1.25-1.98-1.43-2.29-1.66-4.96-3.61-7.92-6.3-.75-.68-1.44-1.34-2.16-2.07-2.41-2.45-4.01-4.52-4.75-5.51-6.18-8.19-13.03-19.32-13.89-18.88Z" />
      </g>
      <g mask={`url(#${id}-clip)`}>
        <rect className="alyoxa-mark__shine" x="-30" y="-5" width="26" height="70" fill={`url(#${id}-shine)`} transform="skewX(-18)" />
      </g>
    </svg>
  );
}
