import React from 'react';

const ServiceBrandSystems: React.FC = () => {
  return (
    <section className="relative w-full h-screen max-h-screen bg-[#F9F8F6] text-[#111111] px-4 sm:px-8 lg:px-10 py-6 lg:py-8 flex items-center justify-center overflow-hidden select-none">
   
      
      {/* Main Single-Viewport Container */}
      <div className="relative z-10 w-full max-w-[1800px] h-full flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-between">
      
        
        {/* =========================================================
            LEFT SIDE: Service Narrative (35–40% Width)
            ========================================================= */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between py-4 z-20">
          
          {/* Top Identifier */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] tracking-widest text-black/60 uppercase">
            <span className="font-semibold text-black">02 / BRAND SYSTEMS</span>
            <span className="text-black/30">//</span>
            <span className="text-[9px] text-black/40">SYS.SERV_02</span>
          </div>

          {/* Core Narrative & Headline */}
          <div className="my-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl   font-bold tracking-tight text-black uppercase leading-[0.92]">
              BRANDS<br />
              BUILT TO
              BE REMEMBERED.
            </h2>
            
            <div className="w-10 h-[1px] bg-black/20" />

            <p className="text-xs sm:text-sm md:text-base   text-black/75 leading-relaxed max-w-sm">
              We build distinctive visual systems that give brands clarity, consistency, and a presence people recognize.
            </p>

            {/* Restrained Capabilities List */}
            <div className="pt-4 space-y-2">
              <div className="text-[9px] text-black/40 tracking-widest uppercase mb-3">
                [ CAPABILITIES ]
              </div>
              <ul className="space-y-1.5 text-[10px] sm:text-[11px] tracking-widest text-black/80 font-mono uppercase">
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>BRAND STRATEGY</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>VISUAL IDENTITY</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>TYPOGRAPHY</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>ART DIRECTION</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>DESIGN SYSTEMS</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Clean Studio Footer Metadata */}
          <div className="text-[9px] text-black/40 tracking-widest uppercase flex items-center gap-3 pt-2">
            <span>ALYOXA</span>
            <span>/</span>
            <span>BRAND SYSTEM</span>
          </div>

        </div>

        {/* =========================================================
            RIGHT SIDE: Identity Construction Board (60–65% Width)
            ========================================================= */}
        <div className="lg:col-span-7 relative w-full h-[65vh] sm:h-[75vh] lg:h-[82vh] flex items-center justify-center">
          
          {/* Main Visual Board Frame */}
          <div className="relative w-full h-full bg-[#F3F2EE]/60 border border-black/15 rounded-[16px] p-6 sm:p-10 overflow-hidden group">
            
            {/* -----------------------------------------------------
                LAYER 01: Background Identity Grid (Deepest)
                ----------------------------------------------------- */}
            <div data-layer="01" className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-black/20" />
                ))}
              </div>
              {/* Radial Drafting Axis */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[320px] h-[320px] rounded-full border border-black/20 border-dashed" />
                <div className="w-[480px] h-[480px] rounded-full border border-black/10" />
              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 02: Large Monogram / Identity Mark (Mid-Back)
                ----------------------------------------------------- */}
            <div data-layer="02" className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                {/* Oversized Constructivist Monogram 'A' */}
                <span className="text-[140px] sm:text-[180px] lg:text-[220px]   font-black tracking-tighter text-black/85 leading-none select-none">
                  A
                </span>
                {/* Structural Geometry Circle Intersections */}
                <div className="absolute -top-4 w-32 h-32 rounded-full border border-black/30 border-dashed pointer-events-none" />
                <div className="absolute bottom-6 -right-6 w-24 h-24 rounded-full border border-black/40 pointer-events-none" />
              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 03: Construction Geometry & Tangent Lines (Mid)
                ----------------------------------------------------- */}
            <div data-layer="03" className="absolute inset-0 pointer-events-none z-10">
              {/* Tangent Construction Rays */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/30 border-b border-dashed border-black/20" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-black/30 border-r border-dashed border-black/20" />
              
              {/* Alignment Vector Anchors */}
              <div className="absolute top-12 left-12 w-2 h-2 border border-black/60 rounded-full" />
              <div className="absolute bottom-12 right-12 w-2 h-2 border border-black/60 rounded-full" />
            </div>

            {/* -----------------------------------------------------
                LAYER 04: Typography System Specimen (Mid-Front)
                ----------------------------------------------------- */}
            <div data-layer="04" className="absolute top-8 left-8 bg-[#F9F8F6] border border-black/15 rounded-[8px] p-4 shadow-sm z-20 pointer-events-none max-w-[180px] space-y-2">
              <div className="flex items-center justify-between border-b border-black/10 pb-1.5">
                <span className="text-[7px] font-mono text-black/40 uppercase tracking-widest">
                  [TYPE / SYSTEM]
                </span>
                <span className="text-[8px] font-mono text-black/80 font-bold">Aa</span>
              </div>
              <div className="space-y-1">
                <div className="text-xs   font-bold text-black tracking-tight">Satoshi</div>
                <div className="text-[7px] font-mono text-black/50 tracking-wider uppercase">
                  DISPLAY / BODY / LABEL
                </div>
              </div>
              <div className="pt-1 text-[8px]   text-black/70 leading-none">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 05: Brand Tokens & Annotations (Foreground)
                ----------------------------------------------------- */}
            <div data-layer="05" className="absolute inset-0 pointer-events-none z-30 p-6 sm:p-8 flex flex-col justify-between">
              
              {/* Top Header Row */}
              <div className="flex justify-between items-start text-[8px] font-mono text-black/50 uppercase tracking-wider">
                <span>[IDENTITY / FORM]</span>
                <span>SYS.SERV_02</span>
              </div>

              {/* Bottom Right Brand Token Matrix */}
              <div className="self-end bg-[#F9F8F6] border border-black/15 rounded-[8px] p-3 shadow-sm flex items-center gap-3 text-[8px] font-mono text-black/70">
                <div className="flex flex-col gap-1 border-r border-black/10 pr-3">
                  <span className="text-[6px] text-black/40">[BRAND / VOICE]</span>
                  <span className="font-bold text-black">CLARITY</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 bg-black/5 border border-black/10 rounded">TYPE</span>
                  <span className="px-1.5 py-0.5 bg-black/5 border border-black/10 rounded">GRID</span>
                  <span className="px-1.5 py-0.5 bg-black/5 border border-black/10 rounded">FORM</span>
                </div>
              </div>

              {/* Bottom Left System Logic Tag */}
              <div className="text-[8px] font-mono text-black/40 uppercase tracking-widest">
                [GRID / LOGIC] // OPTICAL_ALIGNMENT
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ServiceBrandSystems;