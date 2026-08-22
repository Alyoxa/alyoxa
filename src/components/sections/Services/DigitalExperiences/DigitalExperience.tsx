import React from 'react';

const ServiceDigitalExperience: React.FC = () => {
  return (
    <section className="relative w-full h-screen max-h-screen bg-[#F9F8F6] text-[#111111] px-4 sm:px-8 lg:px-10 py-6 lg:py-8 flex items-center justify-center overflow-hidden select-none">
      

      {/* Main Single-Viewport Grid Container */}
      <div className="relative z-10 w-full max-w-[1800px] h-full flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8 items-center justify-between">
        
        {/* =========================================================
            LEFT SIDE: Editorial Service Information (35–40% Width)
            ========================================================= */}
        <div className="lg:col-span-5 h-full flex flex-col justify-between py-4 z-20">
          
          {/* Top Identifier */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] tracking-widest text-black/60 uppercase">
            <span className="font-semibold text-black">01 / DIGITAL EXPERIENCE</span>
            <span className="text-black/30">//</span>
            <span className="text-[9px] text-black/40">SYS.SERV_01</span>
          </div>

          {/* Core Narrative & Headline */}
          <div className="my-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold tracking-tight text-black uppercase leading-[0.92]">
              DIGITAL<br />
              EXPERIENCES<br />
              THAT PERFORM.
            </h2>
            
            <div className="w-10 h-[1px] bg-black/20" />

            <p className="text-xs sm:text-sm md:text-base  text-black/75 leading-relaxed max-w-sm">
              We design digital experiences that turn complex ideas into clear, memorable, and intuitive interfaces.
            </p>

            {/* Restrained Capabilities List */}
            <div className="pt-4 space-y-2">
              <div className="text-[9px] text-black/40 tracking-widest uppercase mb-3">
                [ CAPABILITIES ]
              </div>
              <ul className="space-y-1.5 text-[10px] sm:text-[11px] tracking-widest text-black/80 font-mono uppercase">
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>STRATEGY</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>UX / UI DESIGN</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>RESPONSIVE DESIGN</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>DIGITAL DIRECTION</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Clean Studio Footer Detail */}
          <div className="text-[9px] text-black/40 tracking-widest uppercase flex items-center gap-3 pt-2">
            <span>ALYOXA</span>
            <span>/</span>
            <span>EXPERIENCE SYSTEM</span>
          </div>

        </div>

        {/* =========================================================
            RIGHT SIDE: Living Digital Product Artifact (60–65% Width)
            ========================================================= */}
        <div className="lg:col-span-7 relative w-full h-[65vh] sm:h-[75vh] lg:h-[82vh] flex items-center justify-center">
          
          {/* Main Visual Canvas Container */}
          <div className="relative w-full h-full bg-[#F3F2EE]/60 border border-black/15 rounded-[16px] p-6 sm:p-8 overflow-hidden group">
            
            {/* -----------------------------------------------------
                LAYER 01: Subtle Grid & Layout Guides (Deepest)
                ----------------------------------------------------- */}
            <div data-layer="01" className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute inset-x-8 top-0 bottom-0 grid grid-cols-12 gap-4">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="border-r border-black/30 h-full" />
                ))}
              </div>
              <div className="absolute top-1/3 inset-x-0 h-[1px] bg-black/40" />
              <div className="absolute top-2/3 inset-x-0 h-[1px] bg-black/40" />
            </div>

            {/* -----------------------------------------------------
                LAYER 02: Main Desktop Interface Frame (Mid-Back)
                ----------------------------------------------------- */}
            <div data-layer="02" className="absolute top-8 left-8 right-16 bottom-12 bg-[#F9F8F6] border border-black/20 rounded-[10px] shadow-sm flex flex-col overflow-hidden pointer-events-none">
              
              {/* Minimal Window Header */}
              <div className="px-4 py-3 border-b border-black/10 flex items-center justify-between bg-black/[0.02]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full border border-black/30" />
                  <span className="w-2 h-2 rounded-full border border-black/30" />
                  <span className="w-2 h-2 rounded-full border border-black/30" />
                </div>
                <span className="text-[8px] font-mono text-black/40 tracking-widest uppercase">
                  PRIMARY_VIEWPORT // 1440px
                </span>
                <span className="text-[8px] font-mono text-black/30">[GRID]</span>
              </div>

              {/* Interface Content System in Progress */}
              <div className="p-6 grid grid-cols-12 gap-6 items-start h-full">
                
                {/* Brand Editorial Module */}
                <div className="col-span-7 space-y-4 pt-2">
                  <span className="text-[8px] font-mono uppercase tracking-widest text-black/40 block">
                    MODULE // HERO_DIRECTIVE
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-normal italic text-black/90 leading-tight">
                    Architectural clarity for modern brands.
                  </h3>
                  <p className="text-[10px]  text-black/60 leading-relaxed max-w-xs">
                    Transforming complex operations into effortless digital touchpoints.
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <div className="px-3 py-1 bg-black text-white text-[8px] font-mono uppercase tracking-widest rounded">
                      EXPLORE
                    </div>
                    <div className="px-3 py-1 border border-black/20 text-[8px] font-mono uppercase tracking-widest rounded text-black/70">
                      SYSTEM_SPEC
                    </div>
                  </div>
                </div>

                {/* Abstract UI Component Fragment */}
                <div className="col-span-5 border border-black/10 rounded-[8px] p-3 bg-black/[0.015] space-y-3">
                  <div className="flex items-center justify-between border-b border-black/10 pb-2">
                    <span className="text-[7px] font-mono text-black/50">METRIC_NODE</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg  font-bold text-black">+140%</div>
                    <div className="text-[8px] font-mono text-black/40">FLOW_EFFICIENCY</div>
                  </div>
                  <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-black/60" />
                  </div>
                </div>

              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 03: Overlapping Mobile Responsive Viewport (Mid-Front)
                ----------------------------------------------------- */}
            <div data-layer="03" className="absolute bottom-6 right-6 w-36 sm:w-44 h-64 sm:h-72 bg-[#F9F8F6] border border-black/25 rounded-[16px] p-3 shadow-lg flex flex-col justify-between z-10 pointer-events-none">
              
              <div className="flex items-center justify-between border-b border-black/10 pb-2">
                <div className="w-6 h-1 bg-black/20 rounded-full" />
                <span className="text-[7px] font-mono text-black/40">RESPONSIVE</span>
              </div>

              {/* Mobile Card Content */}
              <div className="space-y-2 my-auto">
                <div className="w-full h-16 border border-dashed border-black/20 rounded-[6px] bg-black/[0.02] flex items-center justify-center">
                  <span className="text-[7px] font-mono text-black/30">[IMG_CONTAINER]</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded" />
                <div className="w-2/3 h-2 bg-black/15 rounded" />
              </div>

              <div className="w-8 h-1 bg-black/20 rounded-full mx-auto mt-2" />
            </div>

            {/* -----------------------------------------------------
                LAYER 04: Floating Typography & Token Elements (Front)
                ----------------------------------------------------- */}
            <div data-layer="04" className="absolute top-12 right-12 z-20 pointer-events-none">
              <div className="bg-[#F9F8F6] border border-black/15 rounded-[6px] px-3 py-1.5 shadow-sm text-[8px] font-mono text-black/80 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black/80" />
                <span>TYPE // SYSTEM_SERIF</span>
              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 05: Deliberate Technical Annotations (Foreground)
                ----------------------------------------------------- */}
            <div data-layer="05" className="absolute inset-0 pointer-events-none z-30 p-4 flex flex-col justify-between">
              
              {/* Top Bar Labels */}
              <div className="flex justify-between items-start text-[8px] font-mono text-black/40 uppercase tracking-wider">
                <span>[UX / FLOW]</span>
                <span>SYS.SERV_01</span>
              </div>

              {/* Responsive Anchor Annotation */}
              <div className="self-end text-[8px] font-mono text-black/40 uppercase tracking-widest pr-20 pb-2">
                [ BREAKPOINT // 375PX ]
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ServiceDigitalExperience;