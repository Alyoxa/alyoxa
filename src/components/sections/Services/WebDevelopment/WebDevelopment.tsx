import React from "react";

const ServiceWebDevelopment: React.FC = () => {
  return (
    <section className="relative w-full h-screen max-h-screen bg-[#F9F8F6] text-[#111111] px-4 sm:px-8 lg:px-10 py-6 lg:py-8 flex items-center justify-center overflow-hidden select-none">
      {/* Main Single-Viewport Container */}
      <div className="relative z-10 w-full max-w-[1800px] h-full flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-between">
        {/* =========================================================
            LEFT SIDE: Service Narrative (5 Columns / 35–40% Width)
            ========================================================= */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between py-4 z-20">
          {/* Top Identifier */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] tracking-widest text-black/60 uppercase">
            <span className="font-semibold text-black">
              03 / WEB DEVELOPMENT
            </span>
            <span className="text-black/30">//</span>
            <span className="text-[9px] text-black/40">SYS.SERV_03</span>
          </div>

          {/* Core Narrative & Headline */}
          <div className="my-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black uppercase leading-[0.92]">
              BUILT
              <br /> FOR THE <br /> DIGITAL WORLD.
            </h2>

            <div className="w-10 h-[1px] bg-black/20" />

            <p className="text-xs sm:text-sm md:text-base  text-black/75 leading-relaxed max-w-sm">
              We engineer fast, responsive websites and applications that turn
              thoughtful design into reliable digital products.
            </p>

            {/* Restrained Capabilities List */}
            <div className="pt-4 space-y-2">
              <div className="text-[9px] text-black/40 tracking-widest uppercase mb-3">
                [ CAPABILITIES ]
              </div>
              <ul className="space-y-1.5 text-[10px] sm:text-[11px] tracking-widest text-black/80 font-mono uppercase">
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>FRONTEND DEVELOPMENT</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>NEXT.JS / REACT</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>RESPONSIVE SYSTEMS</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>PERFORMANCE</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>CMS / INTEGRATIONS</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Clean Studio Footer Metadata */}
          <div className="text-[9px] text-black/40 tracking-widest uppercase flex items-center gap-3 pt-2">
            <span>ALYOXA</span>
            <span>/</span>
            <span>WEB ENGINEERING</span>
          </div>
        </div>

        {/* =========================================================
            RIGHT SIDE: Web System Architecture Visual (7 Columns / 60–65% Width)
            ========================================================= */}
        <div className="lg:col-span-7 relative w-full h-[65vh] sm:h-[75vh] lg:h-[82vh] flex items-center justify-center">
          {/* Main Visual Board Frame */}
          <div className="relative w-full h-full bg-[#F3F2EE]/60 border border-black/15 rounded-[16px] p-6 sm:p-8 overflow-hidden group">
            {/* -----------------------------------------------------
                LAYER 01: Underlying Code & DOM Structural Grid (Deepest)
                ----------------------------------------------------- */}
            <div
              data-layer="01"
              className="absolute inset-0 pointer-events-none opacity-20"
            >
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
                {Array.from({ length: 72 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-r border-b border-black/20 relative"
                  >
                    {i % 11 === 0 && (
                      <span className="absolute top-1 left-1 text-[5px] font-mono text-black/40">
                        DOM_NODE_{i}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <div className="absolute top-1/2 inset-x-0 h-[1px] bg-black/40 border-b border-dashed border-black/20" />
            </div>

            {/* -----------------------------------------------------
                LAYER 02: Primary Desktop Web Frame (Mid-Back)
                ----------------------------------------------------- */}
            <div
              data-layer="02"
              className="absolute top-6 left-6 right-12 bottom-10 bg-[#F9F8F6] border border-black/20 rounded-[10px] shadow-sm flex flex-col overflow-hidden pointer-events-none"
            >
              {/* Browser Chrome Header */}
              <div className="px-4 py-2.5 border-b border-black/10 flex items-center justify-between bg-black/[0.02]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full border border-black/30" />
                  <span className="w-2 h-2 rounded-full border border-black/30" />
                  <span className="w-2 h-2 rounded-full border border-black/30" />
                </div>
                <div className="px-3 py-0.5 bg-black/5 rounded text-[8px] font-mono text-black/60 border border-black/10 flex items-center gap-2">
                  <span>https://alyoxa.engineering/app</span>
                  <span className="text-black/30">200_OK</span>
                </div>
                <span className="text-[7px] font-mono text-black/40">
                  [ SYSTEM ]
                </span>
              </div>

              {/* Web Content Layout Blueprint */}
              <div className="p-5 grid grid-cols-12 gap-4 items-start h-full">
                {/* Hero Block Container */}
                <div className="col-span-8 space-y-3 pt-1 border border-dashed border-black/20 p-3 rounded-[6px] bg-black/[0.01]">
                  <div className="flex items-center justify-between text-[7px] font-mono text-black/40">
                    <span>COMPONENT // HERO_ROOT</span>
                    <span>SSR_RENDERED</span>
                  </div>
                  <div className="w-3/4 h-4 bg-black/80 rounded-[2px]" />
                  <div className="w-1/2 h-2 bg-black/20 rounded-[2px]" />
                  <div className="pt-2 flex items-center gap-2">
                    <div className="w-16 h-4 bg-black rounded-[2px]" />
                    <div className="w-16 h-4 border border-black/30 rounded-[2px]" />
                  </div>
                </div>

                {/* Performance & Component Specs Module */}
                <div className="col-span-4 border border-black/15 rounded-[6px] p-3 space-y-2 bg-[#F9F8F6]">
                  <span className="text-[7px] font-mono text-black/50 block border-b border-black/10 pb-1">
                    [ PERFORMANCE ]
                  </span>
                  <div className="space-y-1">
                    <div className="text-xs  font-bold text-black flex items-center justify-between">
                      <span>LCP</span>
                      <span className="font-mono text-[9px] text-black/60">
                        0.8s
                      </span>
                    </div>
                    <div className="text-xs  font-bold text-black flex items-center justify-between">
                      <span>FPS</span>
                      <span className="font-mono text-[9px] text-black/60">
                        60.0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Abstract Modular Card Grid */}
                <div className="col-span-12 grid grid-cols-3 gap-3 pt-1">
                  {Array.from({ length: 3 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="border border-black/10 p-2.5 rounded-[4px] space-y-1.5 bg-black/[0.01]"
                    >
                      <div className="w-full h-8 border border-dashed border-black/20 rounded-[2px] bg-black/5 flex items-center justify-center">
                        <span className="text-[6px] font-mono text-black/40">
                          [ COMPONENT_{idx + 1} ]
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-black/30 rounded-[1px]" />
                      <div className="w-2/3 h-1.5 bg-black/15 rounded-[1px]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 03: Overlapping Mobile Viewport Frame (Mid-Front)
                ----------------------------------------------------- */}
            <div
              data-layer="03"
              className="absolute bottom-5 right-5 w-36 sm:w-40 h-60 sm:h-64 bg-[#F9F8F6] border border-black/25 rounded-[14px] p-3 shadow-lg flex flex-col justify-between z-10 pointer-events-none"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-1.5">
                <div className="w-5 h-1 bg-black/20 rounded-full" />
                <span className="text-[7px] font-mono text-black/50">
                  [ RESPONSIVE ]
                </span>
              </div>

              {/* Mobile DOM Structure */}
              <div className="space-y-2 my-auto">
                <div className="w-full h-14 border border-dashed border-black/20 rounded-[4px] bg-black/[0.02] flex items-center justify-center">
                  <span className="text-[6px] font-mono text-black/30">
                    [ HERO_MOBILE ]
                  </span>
                </div>
                <div className="w-full h-1.5 bg-black/30 rounded-[1px]" />
                <div className="w-3/4 h-1.5 bg-black/20 rounded-[1px]" />
                <div className="w-1/2 h-1.5 bg-black/15 rounded-[1px]" />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-black/10 text-[6px] font-mono text-black/40">
                <span>375PX</span>
                <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 04: Component Token Badges (Mid-Front)
                ----------------------------------------------------- */}
            <div
              data-layer="04"
              className="absolute top-10 right-10 z-20 pointer-events-none"
            >
              <div className="bg-[#F9F8F6] border border-black/15 rounded-[6px] px-2.5 py-1 shadow-sm text-[8px] font-mono text-black/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black/70" />
                <span>NEXT.JS // RSC_HYDRATED</span>
              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 05: Technical Annotations & Alignment Guides (Foreground)
                ----------------------------------------------------- */}
            <div
              data-layer="05"
              className="absolute inset-0 pointer-events-none z-30 p-4 sm:p-6 flex flex-col justify-between"
            >
              {/* Top Annotation Bar */}
              <div className="flex justify-between items-start text-[8px] font-mono text-black/40 uppercase tracking-wider">
                <span>[ GRID // 12_COL ]</span>
                <span>SYS.SERV_03</span>
              </div>

              {/* Dimension / Measurement Lines */}
              <div className="absolute left-3 top-1/4 bottom-1/4 flex flex-col items-center justify-between">
                <div className="w-1.5 h-[1px] bg-black/40" />
                <div className="h-full w-[1px] border-l border-dashed border-black/25" />
                <span className="text-[6px] font-mono text-black/40 -rotate-90 my-2">
                  100VH_CONTAINER
                </span>
                <div className="h-full w-[1px] border-l border-dashed border-black/25" />
                <div className="w-1.5 h-[1px] bg-black/40" />
              </div>

              {/* Bottom Annotations */}
              <div className="flex items-center justify-between text-[8px] font-mono text-black/40 uppercase tracking-widest pl-4">
                <span>[ ENGINE // VERCEL_EDGE ]</span>
                <span className="pr-16">[ CODE → PRODUCT ]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceWebDevelopment;
