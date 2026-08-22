"use client";

interface PreloaderProps {
  onComplete?: () => void;
}

import { useEffect, useState } from "react";
import { initializePreloader } from "../animations/preloader/Preloader";


export default function Preloader({ onComplete }: PreloaderProps) {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const cleanup = initializePreloader(() => {
      setShowPreloader(false);
      onComplete?.();
    });

    return cleanup;
  }, [onComplete]);

  if (!showPreloader) return null;


  return (
    <section
      data-preloader="container"
      className="
        fixed
        inset-0
        z-[99999]
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#F9F8F6]
      "
    >
      <div
        data-preloader="wordmark"
        className="
          w-full
          max-w-[1200px]
          px-6
          sm:px-10
          lg:px-16
        "
      >
        <svg
          data-preloader="svg"
          viewBox="0 0 201.46 37.04"
          className="block h-auto w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="ALYOXA"
          role="img"
        >
          {/* A — first */}
          <path
            data-preloader-letter="a-1" className="opacity-0"
            d="m3.49,35.8c-.24.74-.92,1.24-1.7,1.24h0c-1.23,0-2.09-1.21-1.69-2.37L10.85,3.65c.25-.72.93-1.2,1.69-1.2l.93,0c.76,0,1.44.48,1.69,1.2l10.81,31.02c.4,1.16-.46,2.37-1.69,2.37h0c-.76,0-1.44-.48-1.69-1.2l-2.56-7.41c-.25-.72-.93-1.2-1.69-1.2h-7.25c-2.89,0-5.45,1.86-6.33,4.61m13.68-8.09l-4.98-14.95c-.18-.55-.34-1.31-.47-2.28h-.11c-.16,1.08-.32,1.84-.51,2.28l-6.14,18.42,12.2-3.48Z"
            fill="#0F1218"
          />

          {/* L */}
          <path
            data-preloader-letter="l" className="opacity-0"
            d="m54.44,37.04h-11.16c-1.74,0-3.15-1.41-3.15-3.15V4.16c0-.94.76-1.71,1.71-1.71h0c.94,0,1.71.76,1.71,2.72v26.26c0,.73,1.41,2.14,3.15,2.14h7.75c.94,0,1.71.76,1.71,1.71v.07c0,.94-.76,1.71-1.71,1.71Z"
            fill="#0F1218"
          />

          {/* Y */}
        
            <path className="opacity-0"
            data-preloader-letter="y"
              d="m85.62,4.8l-9.01,19.12c-.1.22-.16.46-.16.7v10.77c0,.91-.74,1.65-1.65,1.65h-.16c-.91,0-1.65-.74-1.65-1.65v-10.73c0-.24-.05-.47-.15-.69l-8.82-19.19c-.5-1.09.3-2.34,1.5-2.34h.28c.65,0,1.24.38,1.5.97l6.66,14.84c.08.19.34.88.76,2.07h.06c.14-.5.42-1.19.85-2.07l6.99-14.87c.27-.58.85-.95,1.49-.95h0c1.21,0,2.01,1.26,1.49,2.35Z"
              fill="#2B2B2A"
            />
       

          {/* O */}
          <path className="opacity-0"
            data-preloader-letter="o"
            d="m96.73,18.28c0-5.55,1.35-9.98,4.05-13.3,2.7-3.32,6.38-4.98,11.04-4.98,4.29,0,7.75,1.62,10.38,4.85s3.94,7.42,3.94,12.56c0,5.53-1.33,9.97-3.98,13.31-2.66,3.34-6.27,5.02-10.85,5.02s-7.9-1.63-10.57-4.88c-2.67-3.25-4-7.44-4-12.58Zm3.6-.35c0,4.18,1,7.62,2.99,10.32,1.99,2.69,4.65,4.04,7.96,4.04,3.54,0,6.31-1.27,8.29-3.82s2.98-6.04,2.98-10.49-.96-8.08-2.87-10.64c-2.64-3.55-6.8-4.65-12.47-3.3-4.59,2.97-6.88,7.6-6.88,13.89Z"
            fill="#0F1218"
          />

          {/* X */}
          <path className="opacity-0"
            data-preloader-letter="x"
            d="m159.47,36.93h-.23c-.63,0-1.2-.34-1.5-.89l-6.8-12.48c-.21-.38-.46-.93-.74-1.67h-.08c-.17.44-.42.99-.74,1.67l-7.01,12.5c-.3.54-.87.87-1.49.87h-.21c-1.33,0-2.15-1.45-1.47-2.59l8.39-13.94c.32-.53.33-1.18.03-1.72l-7.72-13.79c-.64-1.14.19-2.55,1.49-2.55h.26c.64,0,1.22.35,1.51.91l6,11.38c.52.99.9,1.79,1.12,2.4h.08c.48-1.1.9-1.93,1.25-2.51l6.23-11.29c.3-.55.88-.88,1.5-.88h0c1.31,0,2.14,1.42,1.49,2.56l-7.86,13.75c-.3.53-.3,1.17,0,1.7l7.99,14.03c.65,1.14-.17,2.56-1.49,2.56Z"
            fill="#0F1218"
          />

          {/* A — second */}
          <path className="opacity-0"
            data-preloader-letter="a-2"
            d="m178.88,35.69c-.24.74-.92,1.24-1.7,1.24h0c-1.23,0-2.09-1.21-1.69-2.37l10.75-31.02c.25-.72.93-1.2,1.69-1.2h.93c.76,0,1.44.48,1.69,1.2l10.81,31.02c.4,1.16-.46,2.37-1.69,2.37h0c-.76,0-1.44-.48-1.69-1.2l-2.56-7.41c-.25-.72-.93-1.2-1.69-1.2h-7.25c-2.89,0-5.45,1.86-6.33,4.61m13.68-8.09l-4.98-14.95c-.18-.55-.34-1.31-.47-2.28h-.11c-.16,1.08-.32,1.84-.51,2.28l-6.14,18.42,12.2-3.48Z"
            fill="#0F1218"
          />
        </svg>
      </div>
    </section>
  );
}