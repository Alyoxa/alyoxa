


export default function WhyAlyoxaSection(){

    return(
<section className="min-h-screen overflow-hidden px-8">
  <div className="grid min-h-screen grid-cols-3 items-center gap-12">

    {/* LEFT */}
    <div className="flex flex-col gap-16">
      {/* Card 01 */}

      <div className="relative w-full aspect-[4/5] min-h-[250px] max-w-[250px] mx-auto bg-[#F9F8F6] text-[#111111] p-4 sm:p-5 border border-black/10 flex flex-col justify-between font-mono select-none overflow-hidden group hover:border-black/40 transition-all duration-300">
      
      {/* Background Architectural Grid Lines & Corner Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/40" />
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-dashed border-black/30" />
      </div>

      {/* Top Header Label & Live Status Spice */}
      <div className="relative z-10 flex items-center justify-between text-[9px] tracking-widest text-black/60 uppercase">
        <span className="font-semibold text-black/80">01 / PHILOSOPHY</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-black/30 group-hover:bg-emerald-500 transition-colors duration-300" />
          <span className="text-[7.5px] font-sans tracking-tighter opacity-70">SYS.01</span>
        </div>
      </div>

      {/* Center Graphic Section - Scaled Down */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
          
          {/* Abstract Typographic 'A' / Technical Geometry */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full stroke-current text-black stroke-[1.25] fill-none"
          >
            {/* Outer Grid Markings */}
            <circle cx="100" cy="100" r="85" strokeDasharray="2 4" className="opacity-30" />
            <rect x="25" y="25" width="150" height="150" className="opacity-20" />

            {/* Architectural 'A' Form */}
            <path d="M 100,30 L 35,165 H 70 L 100,95 L 130,165 H 165 Z" />
            <line x1="60" y1="125" x2="140" y2="125" />
            <circle cx="100" cy="30" r="3" className="fill-black" />
            <circle cx="100" cy="95" r="2" className="fill-black" />

            {/* Technical Leader Lines */}
            <line x1="100" y1="30" x2="145" y2="15" strokeDasharray="1 2" className="opacity-40" />
            <line x1="140" y1="125" x2="175" y2="125" strokeDasharray="1 2" className="opacity-40" />
            <line x1="60" y1="125" x2="20" y2="140" strokeDasharray="1 2" className="opacity-40" />
            <line x1="100" y1="165" x2="100" y2="185" strokeDasharray="1 2" className="opacity-40" />
          </svg>

          {/* Micro Annotations */}
          <span className="absolute -top-1 -right-1 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [FORM]
          </span>
          <span className="absolute top-[58%] -right-3 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [FUNCTION]
          </span>
          <span className="absolute bottom-4 -left-3 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [EXPERIENCE]
          </span>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [DETAIL]
          </span>
        </div>
      </div>

      {/* Bottom Editorial Content & Compact Footer */}
      <div className="relative z-10 space-y-2.5">
        <div className="space-y-0.5 font-sans">
          <p className="text-[11px] sm:text-xs font-normal text-black/60 leading-snug">
            We don't build websites to fill screens.
          </p>
          <p className="text-[11px] sm:text-xs font-semibold text-black leading-snug tracking-tight">
            We build experiences people remember.
          </p>
        </div>

        <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[8px] tracking-widest text-black/40 uppercase">
          <span>ALYOXA</span>
          <span>DIGITAL EXPERIENCE STUDIO</span>
        </div>
      </div>
    </div> 



      {/* Card 03 */}

      <div className="relative w-full aspect-[4/5] min-h-[250px] max-w-[250px] mx-auto bg-[#F9F8F6] text-[#111111] p-4 sm:p-5 border border-black/10 flex flex-col justify-between font-mono select-none overflow-hidden group hover:border-black/40 transition-all duration-300">
      
      {/* Background Architectural Grid Lines & Corner Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/40" />
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-dashed border-black/30" />
      </div>

      {/* Top Header Label & Live Status Spice */}
      <div className="relative z-10 flex items-center justify-between text-[9px] tracking-widest text-black/60 uppercase">
        <span className="font-semibold text-black/80">01 / PHILOSOPHY</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-black/30 group-hover:bg-emerald-500 transition-colors duration-300" />
          <span className="text-[7.5px] font-sans tracking-tighter opacity-70">SYS.01</span>
        </div>
      </div>

      {/* Center Graphic Section - Scaled Down */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
          
          {/* Abstract Typographic 'A' / Technical Geometry */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full stroke-current text-black stroke-[1.25] fill-none"
          >
            {/* Outer Grid Markings */}
            <circle cx="100" cy="100" r="85" strokeDasharray="2 4" className="opacity-30" />
            <rect x="25" y="25" width="150" height="150" className="opacity-20" />

            {/* Architectural 'A' Form */}
            <path d="M 100,30 L 35,165 H 70 L 100,95 L 130,165 H 165 Z" />
            <line x1="60" y1="125" x2="140" y2="125" />
            <circle cx="100" cy="30" r="3" className="fill-black" />
            <circle cx="100" cy="95" r="2" className="fill-black" />

            {/* Technical Leader Lines */}
            <line x1="100" y1="30" x2="145" y2="15" strokeDasharray="1 2" className="opacity-40" />
            <line x1="140" y1="125" x2="175" y2="125" strokeDasharray="1 2" className="opacity-40" />
            <line x1="60" y1="125" x2="20" y2="140" strokeDasharray="1 2" className="opacity-40" />
            <line x1="100" y1="165" x2="100" y2="185" strokeDasharray="1 2" className="opacity-40" />
          </svg>

          {/* Micro Annotations */}
          <span className="absolute -top-1 -right-1 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [FORM]
          </span>
          <span className="absolute top-[58%] -right-3 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [FUNCTION]
          </span>
          <span className="absolute bottom-4 -left-3 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [EXPERIENCE]
          </span>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [DETAIL]
          </span>
        </div>
      </div>

      {/* Bottom Editorial Content & Compact Footer */}
      <div className="relative z-10 space-y-2.5">
        <div className="space-y-0.5 font-sans">
          <p className="text-[11px] sm:text-xs font-normal text-black/60 leading-snug">
            We don't build websites to fill screens.
          </p>
          <p className="text-[11px] sm:text-xs font-semibold text-black leading-snug tracking-tight">
            We build experiences people remember.
          </p>
        </div>

        <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[8px] tracking-widest text-black/40 uppercase">
          <span>ALYOXA</span>
          <span>DIGITAL EXPERIENCE STUDIO</span>
        </div>
      </div>
    </div> 


    </div>

    {/* CENTER */}
    <div className="flex items-center justify-center">
      <h2 className="why-title text-6xl font-black">
        WHY ALYOXA
      </h2>
    </div>

    {/* RIGHT */}
    <div className="flex flex-col gap-16">
      {/* Card 02 */}

      <div className="relative w-full aspect-[4/5] min-h-[250px] max-w-[250px] mx-auto bg-[#F9F8F6] text-[#111111] p-4 sm:p-5 border border-black/10 flex flex-col justify-between font-mono select-none overflow-hidden group hover:border-black/40 transition-all duration-300">
      
      {/* Background Architectural Grid Lines & Corner Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/40" />
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-dashed border-black/30" />
      </div>

      {/* Top Header Label & Live Status Spice */}
      <div className="relative z-10 flex items-center justify-between text-[9px] tracking-widest text-black/60 uppercase">
        <span className="font-semibold text-black/80">01 / PHILOSOPHY</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-black/30 group-hover:bg-emerald-500 transition-colors duration-300" />
          <span className="text-[7.5px] font-sans tracking-tighter opacity-70">SYS.01</span>
        </div>
      </div>

      {/* Center Graphic Section - Scaled Down */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
          
          {/* Abstract Typographic 'A' / Technical Geometry */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full stroke-current text-black stroke-[1.25] fill-none"
          >
            {/* Outer Grid Markings */}
            <circle cx="100" cy="100" r="85" strokeDasharray="2 4" className="opacity-30" />
            <rect x="25" y="25" width="150" height="150" className="opacity-20" />

            {/* Architectural 'A' Form */}
            <path d="M 100,30 L 35,165 H 70 L 100,95 L 130,165 H 165 Z" />
            <line x1="60" y1="125" x2="140" y2="125" />
            <circle cx="100" cy="30" r="3" className="fill-black" />
            <circle cx="100" cy="95" r="2" className="fill-black" />

            {/* Technical Leader Lines */}
            <line x1="100" y1="30" x2="145" y2="15" strokeDasharray="1 2" className="opacity-40" />
            <line x1="140" y1="125" x2="175" y2="125" strokeDasharray="1 2" className="opacity-40" />
            <line x1="60" y1="125" x2="20" y2="140" strokeDasharray="1 2" className="opacity-40" />
            <line x1="100" y1="165" x2="100" y2="185" strokeDasharray="1 2" className="opacity-40" />
          </svg>

          {/* Micro Annotations */}
          <span className="absolute -top-1 -right-1 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [FORM]
          </span>
          <span className="absolute top-[58%] -right-3 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [FUNCTION]
          </span>
          <span className="absolute bottom-4 -left-3 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [EXPERIENCE]
          </span>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [DETAIL]
          </span>
        </div>
      </div>

      {/* Bottom Editorial Content & Compact Footer */}
      <div className="relative z-10 space-y-2.5">
        <div className="space-y-0.5 font-sans">
          <p className="text-[11px] sm:text-xs font-normal text-black/60 leading-snug">
            We don't build websites to fill screens.
          </p>
          <p className="text-[11px] sm:text-xs font-semibold text-black leading-snug tracking-tight">
            We build experiences people remember.
          </p>
        </div>

        <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[8px] tracking-widest text-black/40 uppercase">
          <span>ALYOXA</span>
          <span>DIGITAL EXPERIENCE STUDIO</span>
        </div>
      </div>
    </div> 


      {/* Card 04 */}


      <div className="relative w-full aspect-[4/5] min-h-[250px] max-w-[250px] mx-auto bg-[#F9F8F6] text-[#111111] p-4 sm:p-5 border border-black/10 flex flex-col justify-between font-mono select-none overflow-hidden group hover:border-black/40 transition-all duration-300">
      
      {/* Background Architectural Grid Lines & Corner Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/40" />
        <div className="absolute top-4 left-4 right-4 bottom-4 border border-dashed border-black/30" />
      </div>

      {/* Top Header Label & Live Status Spice */}
      <div className="relative z-10 flex items-center justify-between text-[9px] tracking-widest text-black/60 uppercase">
        <span className="font-semibold text-black/80">01 / PHILOSOPHY</span>
        <div className="flex items-center gap-1.5">
          <span className="w-1 h-1 rounded-full bg-black/30 group-hover:bg-emerald-500 transition-colors duration-300" />
          <span className="text-[7.5px] font-sans tracking-tighter opacity-70">SYS.01</span>
        </div>
      </div>

      {/* Center Graphic Section - Scaled Down */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 ease-out">
          
          {/* Abstract Typographic 'A' / Technical Geometry */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full stroke-current text-black stroke-[1.25] fill-none"
          >
            {/* Outer Grid Markings */}
            <circle cx="100" cy="100" r="85" strokeDasharray="2 4" className="opacity-30" />
            <rect x="25" y="25" width="150" height="150" className="opacity-20" />

            {/* Architectural 'A' Form */}
            <path d="M 100,30 L 35,165 H 70 L 100,95 L 130,165 H 165 Z" />
            <line x1="60" y1="125" x2="140" y2="125" />
            <circle cx="100" cy="30" r="3" className="fill-black" />
            <circle cx="100" cy="95" r="2" className="fill-black" />

            {/* Technical Leader Lines */}
            <line x1="100" y1="30" x2="145" y2="15" strokeDasharray="1 2" className="opacity-40" />
            <line x1="140" y1="125" x2="175" y2="125" strokeDasharray="1 2" className="opacity-40" />
            <line x1="60" y1="125" x2="20" y2="140" strokeDasharray="1 2" className="opacity-40" />
            <line x1="100" y1="165" x2="100" y2="185" strokeDasharray="1 2" className="opacity-40" />
          </svg>

          {/* Micro Annotations */}
          <span className="absolute -top-1 -right-1 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [FORM]
          </span>
          <span className="absolute top-[58%] -right-3 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [FUNCTION]
          </span>
          <span className="absolute bottom-4 -left-3 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [EXPERIENCE]
          </span>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [DETAIL]
          </span>
        </div>
      </div>

      {/* Bottom Editorial Content & Compact Footer */}
      <div className="relative z-10 space-y-2.5">
        <div className="space-y-0.5 font-sans">
          <p className="text-[11px] sm:text-xs font-normal text-black/60 leading-snug">
            We don't build websites to fill screens.
          </p>
          <p className="text-[11px] sm:text-xs font-semibold text-black leading-snug tracking-tight">
            We build experiences people remember.
          </p>
        </div>

        <div className="pt-2 border-t border-black/10 flex items-center justify-between text-[8px] tracking-widest text-black/40 uppercase">
          <span>ALYOXA</span>
          <span>DIGITAL EXPERIENCE STUDIO</span>
        </div>
      </div>
    </div> 

    </div>

  </div>
</section>
    )




}