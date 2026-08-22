import React from 'react';

type WhyCardProps = {
  card: {
    number: string;
    label: string;
    system: string;
    annotations: {
      top: string;
      right: string;
      left: string;
      bottom: string;
    };
    description: string;
    statement: string;
    brand: string;
    footer: string;
  };
};

const WhyCard = ({ card }: WhyCardProps) => {
  return (
    <div className="relative w-full aspect-[4/5] min-h-[250px] max-w-[250px] mx-auto bg-[#F9F8F6] text-[#111111] p-4 sm:p-5 border border-black/15 flex flex-col justify-between font-mono select-none overflow-hidden group hover:border-black/50 transition-all duration-300 shadow-sm">
      
      {/* 1. Architectural Registration Marks (Corner Crosshairs) */}
      <span className="absolute top-1.5 left-2 text-[7px] font-mono text-black/30 pointer-events-none">+</span>
      <span className="absolute top-1.5 right-2 text-[7px] font-mono text-black/30 pointer-events-none">+</span>
      <span className="absolute bottom-1.5 left-2 text-[7px] font-mono text-black/30 pointer-events-none">+</span>
      <span className="absolute bottom-1.5 right-2 text-[7px] font-mono text-black/30 pointer-events-none">+</span>

      {/* 2. Right Side Architectural Ruler Ticks */}
      <div className="absolute right-0 top-1/4 bottom-1/4 w-1 flex flex-col justify-between opacity-20 pointer-events-none">
        <div className="w-full h-[1px] bg-black" />
        <div className="w-2/3 h-[1px] bg-black" />
        <div className="w-full h-[1px] bg-black" />
        <div className="w-2/3 h-[1px] bg-black" />
        <div className="w-full h-[1px] bg-black" />
      </div>

      {/* Background Architectural Grid Lines & Blueprint Box */}
      <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-35 transition-opacity duration-300">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40" />
        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/40" />
        <div className="absolute top-3.5 left-3.5 right-3.5 bottom-3.5 border border-dashed border-black/30" />
      </div>

      {/* Top Header Label & Live Status */}
      <div className="relative z-10 flex items-center justify-between text-[9px] tracking-widest text-black/60 uppercase">
        <span className="font-semibold text-black/90 tracking-wider">
          {card.number} / {card.label}
        </span>

        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-emerald-500 transition-colors duration-300 border border-black/10" />
          <span className="text-[7.5px] font-sans font-medium tracking-tight opacity-75">
            {card.system}
          </span>
        </div>
      </div>

      {/* Center Graphic Section */}
      <div className="relative z-10 my-auto py-2 flex items-center justify-center">
        
        {/* Technical Coordinate Micro-Badges */}
        <span className="absolute left-0 top-1 text-[6px] tracking-tighter text-black/30 font-mono pointer-events-none">
          SYS.LOC
        </span>
        <span className="absolute right-0 bottom-1 text-[6px] tracking-tighter text-black/30 font-mono pointer-events-none">
          R-200
        </span>

        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          
          {/* Abstract Typographic 'A' / Technical Geometry SVG */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full stroke-current text-black stroke-[1.25] fill-none"
          >
            {/* Outer Grid Markings & Target Rings */}
            <circle cx="100" cy="100" r="85" strokeDasharray="2 4" className="opacity-25" />
            <circle cx="100" cy="100" r="45" strokeDasharray="1 3" className="opacity-20" />
            <rect x="25" y="25" width="150" height="150" className="opacity-20" />

            {/* Architectural 'A' Form */}
            <path d="M 100,30 L 35,165 H 70 L 100,95 L 130,165 H 165 Z" className="stroke-[1.5]" />
            <line x1="60" y1="125" x2="140" y2="125" />

            {/* Precision Focal Points */}
            <circle cx="100" cy="30" r="3" className="fill-black stroke-none" />
            <circle cx="100" cy="95" r="2" className="fill-black stroke-none" />
            <circle cx="35" cy="165" r="1.5" className="fill-black stroke-none" />
            <circle cx="165" cy="165" r="1.5" className="fill-black stroke-none" />

            {/* Technical Leader Lines & Dimension Extensions */}
            <line x1="100" y1="30" x2="145" y2="15" strokeDasharray="1 2" className="opacity-50" />
            <line x1="140" y1="125" x2="175" y2="125" strokeDasharray="1 2" className="opacity-50" />
            <line x1="60" y1="125" x2="20" y2="140" strokeDasharray="1 2" className="opacity-50" />
            <line x1="100" y1="165" x2="100" y2="185" strokeDasharray="1 2" className="opacity-50" />

            {/* Axis End Nodes */}
            <line x1="145" y1="12" x2="145" y2="18" className="opacity-60" />
            <line x1="175" y1="122" x2="175" y2="128" className="opacity-60" />
          </svg>

          {/* Micro Annotations using card props */}
          <span className="absolute -top-1 -right-1 text-[7px] font-semibold tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [{card.annotations.top}]
          </span>

          <span className="absolute top-[58%] -right-3 text-[7px] font-semibold tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [{card.annotations.right}]
          </span>

          <span className="absolute bottom-4 -left-3 text-[7px] font-semibold tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [{card.annotations.left}]
          </span>

          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[7px] font-semibold tracking-tighter text-black/50 group-hover:text-black transition-colors">
            [{card.annotations.bottom}]
          </span>

        </div>
      </div>

      {/* Bottom Editorial Content & Compact Footer */}
      <div className="relative z-10 space-y-2.5">
        <div className="space-y-0.5 font-sans">
          <p className="text-[11px] sm:text-xs font-normal text-black/60 leading-snug">
            {card.description}
          </p>

          <p className="text-[11px] sm:text-xs font-bold text-black leading-snug tracking-tight">
            {card.statement}
          </p>
        </div>

        <div className="pt-2 border-t border-black/15 flex items-center justify-between text-[8px] tracking-widest text-black/50 uppercase font-mono">
          <span className="font-semibold">{card.brand}</span>
          <span className="opacity-80">{card.footer}</span>
        </div>
      </div>

    </div>
  );
};

export default WhyCard;