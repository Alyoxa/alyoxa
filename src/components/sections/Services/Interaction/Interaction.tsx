import React from 'react';

const ServiceInteraction: React.FC = () => {
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
            <span className="font-semibold text-black">04 / INTERACTION</span>
            <span className="text-black/30">//</span>
            <span className="text-[9px] text-black/40">SYS.SERV_04</span>
          </div>

          {/* Core Narrative & Headline */}
          <div className="my-auto space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl  font-bold tracking-tight text-black uppercase leading-[0.92]">
              INTERACTIONS<br />
              THAT FEEL<br />
              ALIVE.
            </h2>
            
            <div className="w-10 h-[1px] bg-black/20" />

            <p className="text-xs sm:text-sm md:text-base  text-black/75 leading-relaxed max-w-sm">
              We design motion and interactions that make digital experiences feel responsive, intuitive, and alive.
            </p>

            {/* Restrained Capabilities List */}
            <div className="pt-4 space-y-2">
              <div className="text-[9px] text-black/40 tracking-widest uppercase mb-3">
                [ CAPABILITIES ]
              </div>
              <ul className="space-y-1.5 text-[10px] sm:text-[11px] tracking-widest text-black/80 font-mono uppercase">
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>MOTION DESIGN</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>MICRO INTERACTIONS</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>SCROLL EXPERIENCES</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>TRANSITIONS</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-black/30">•</span>
                  <span>INTERACTIVE SYSTEMS</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Clean Studio Footer Metadata */}
          <div className="text-[9px] text-black/40 tracking-widest uppercase flex items-center gap-3 pt-2">
            <span>ALYOXA</span>
            <span>/</span>
            <span>MOTION LAB</span>
          </div>

        </div>

        {/* =========================================================
            RIGHT SIDE: Motion Laboratory Visual (7 Columns / 60–65% Width)
            ========================================================= */}
        <div className="lg:col-span-7 relative w-full h-[65vh] sm:h-[75vh] lg:h-[82vh] flex items-center justify-center">
          
          {/* Main Visual Canvas Container */}
          <div className="relative w-full h-full bg-[#F3F2EE]/60 border border-black/15 rounded-[16px] p-6 sm:p-8 overflow-hidden group">
            
            {/* -----------------------------------------------------
                LAYER 01: Motion Coordinate Grid & Radial Axes (Deepest)
                ----------------------------------------------------- */}
            <div data-layer="01" className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-8">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-black/20" />
                ))}
              </div>
              {/* Concentric Interaction Radii */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[280px] h-[280px] rounded-full border border-black/30 border-dashed" />
                <div className="w-[440px] h-[440px] rounded-full border border-black/15" />
              </div>
            </div>

            {/* -----------------------------------------------------
                LAYER 02: Frozen Physics Bezier Paths & Motion Vectors (Mid-Back)
                ----------------------------------------------------- */}
            <div data-layer="02" className="absolute inset-0 pointer-events-none z-10">
              <svg className="w-full h-full stroke-black/40 fill-none" strokeWidth="0.75">
                {/* Curved Cursor Vector Trajectory */}
                <path d="M 80,120 Q 220,60 380,240 T 520,380" strokeDasharray="3 3" />
                
                {/* Elastic Spring Motion Arc */}
                <path d="M 140,360 C 240,480 400,120 560,200" />
                
                {/* Vector Direction Anchors */}
                <circle cx="220" cy="60" r="3" className="fill-black/60" />
                <circle cx="380" cy="240" r="3" className="fill-black/60" />
                <circle cx="520" cy="380" r="4" className="fill-black" />
              </svg>
            </div>

            {/* -----------------------------------------------------
                LAYER 03: Layered Cards & Reactive Objects (Mid-Front)
                ----------------------------------------------------- */}
            <div data-layer="03" className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              
              {/* Primary Central Object (Active Hover State Specimen) */}
              <div className="relative w-56 sm:w-64 h-36 bg-[#F9F8F6] border border-black/30 rounded-[10px] p-4 shadow-xl flex flex-col justify-between -rotate-3 transition-transform duration-500 group-hover:rotate-0">
                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <span className="text-[7px] font-mono text-black/50">[ OBJECT_CORE ]</span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                    <span className="text-[7px] font-mono text-black/80 font-bold">ACTIVE</span>
                  </div>
                </div>
                
                <div className="space-y-1 my-auto">
                  <div className="text-xs  font-bold text-black tracking-tight">
                    REACTIVE_NODE
                  </div>
                  <div className="text-[8px] font-mono text-black/50">
                    PHYSICS // EASE_OUT_EXPO
                  </div>
                </div>

                <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
                  <div className="w-4/5 h-full bg-black" />
                </div>
              </div>

              {/* Secondary Ghosted Drag-State Card (Interaction Trail) */}
              <div className="absolute w-56 sm:w-64 h-36 border border-dashed border-black/25 rounded-[10px] p-4 flex flex-col justify-between translate-x-12 translate-y-8 rotate-6 bg-black/[0.015]">
                <div className="flex justify-between text-[7px] font-mono text-black/30">
                  <span>[ STATE // IDLE_OFFSET ]</span>
                  <span>Δt + 12ms</span>
                </div>
                <div className="w-12 h-12 rounded-full border border-dashed border-black/20 self-center flex items-center justify-center">
                  <span className="text-[6px] font-mono text-black/30">SPRING</span>
                </div>
              </div>

            </div>

            {/* -----------------------------------------------------
                LAYER 04: Vector Cursors & Interaction Tokens (Front)
                ----------------------------------------------------- */}
            <div data-layer="04" className="absolute inset-0 pointer-events-none z-30">
              
              {/* Simulated Vector Cursor Target */}
              <div className="absolute top-1/3 right-1/4 flex items-center gap-2">
                {/* SVG Blueprint Cursor */}
                <svg className="w-4 h-4 text-black drop-shadow" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3l7 18 3-7 7-3L3 3z" />
                </svg>
                <div className="bg-black text-white px-2 py-0.5 rounded text-[7px] font-mono uppercase tracking-widest">
                  POINTER // [HOVER]
                </div>
              </div>

              {/* State Transition Control Panel */}
              <div className="absolute bottom-8 left-8 bg-[#F9F8F6] border border-black/20 rounded-[8px] p-3 shadow-md space-y-2 max-w-[200px]">
                <div className="text-[7px] font-mono text-black/40 uppercase tracking-widest border-b border-black/10 pb-1">
                  INTERACTION_STATE
                </div>
                <div className="flex items-center justify-between text-[8px] font-mono">
                  <span className="text-black/30">IDLE</span>
                  <span className="text-black/30">→</span>
                  <span className="text-black/30">HOVER</span>
                  <span className="text-black/30">→</span>
                  <span className="font-bold text-black bg-black/5 px-1 rounded">ACTIVE</span>
                </div>
                <div className="w-full h-0.5 bg-black/10 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-3/4 bg-black" />
                </div>
              </div>

            </div>

            {/* -----------------------------------------------------
                LAYER 05: Technical Annotations & Vector Guides (Foreground)
                ----------------------------------------------------- */}
            <div data-layer="05" className="absolute inset-0 pointer-events-none z-40 p-4 sm:p-6 flex flex-col justify-between">
              
              {/* Top Annotation Bar */}
              <div className="flex justify-between items-start text-[8px] font-mono text-black/40 uppercase tracking-wider">
                <span>[ MOTION // MATRIX ]</span>
                <span>SYS.SERV_04</span>
              </div>

              {/* Center Right Response Badge */}
              <div className="self-end bg-[#F9F8F6] border border-black/15 rounded-[6px] px-2.5 py-1 text-[8px] font-mono text-black/70 uppercase">
                [ RESPONSE // 60FPS_FLUID ]
              </div>

              {/* Bottom Alignment Marker */}
              <div className="flex items-center justify-between text-[8px] font-mono text-black/40 uppercase tracking-widest pl-2 pr-4">
                <span>[ SCROLL // DYNAMICS ]</span>
                <span>ALYOXA.MOTION_ENGINE</span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ServiceInteraction;