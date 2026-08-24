import { useEffect, useRef } from "react";
import { initializeTestimonialsTransition } from "@/components/animations/testimonials/testimonialsTransition";


export default function ContactTransition() {

  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cleanup = initializeTestimonialsTransition(containerRef.current);
    return () => cleanup();
  }, []);
    return (

<section ref={containerRef} className="relative">
<div 
  data-tt="stage" 
  className="h-screen flex items-center justify-center overflow-hidden px-4 md:px-0 "
>
  <div className="flex flex-col items-start select-none gap-0 sm:gap-9">
    {/* Line 1 */}
    <h2 
      data-tt="line-1" 
      className="text-[10vw] md:text-[8vw] font-bold text-zinc-800 leading-none tracking-tight origin-left"
    >
     LET&apos;S BUILD
    </h2>

    {/* Line 2 — OUR with preserved masked-text styling */}
    <h2 
      data-tt="line-2" 
      className="masked-text w-full overflow-visible text-[10vw] md:text-[8vw] font-black italic leading-none tracking-tight origin-left"
    >
      SOMETHING
    </h2>

    {/* Line 3 */}
    <h2 
      data-tt="line-3" 
      className="text-[10vw] md:text-[8vw] font-bold text-zinc-800 leading-none tracking-tight origin-left"
    >
       WORTH
    </h2>

    {/* Line 4 */}
    <h2 
      data-tt="line-4" 
      className="text-[10vw] md:text-[8vw] font-bold text-zinc-800 leading-none tracking-tight origin-left"
    >
      REMEMBERING.
    </h2>
  </div>
</div>
</section>
    );
  }