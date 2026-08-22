import React from 'react';

export interface TestimonialItem {
  id: string;
  clientName: string;
  country: string;
  projectName: string;
  projectType: string;
  role: string;
  testimonial: string;
}

interface TestimonialCardProps {
  testimonial: TestimonialItem;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto bg-[#F9F8F6] text-[#111111] p-6 sm:p-10 md:p-12 rounded-[24px] border border-black/15 flex flex-col justify-between font-mono select-none overflow-hidden group hover:border-black/40 transition-all duration-300 shadow-sm">
      
      {/* 1. Architectural Registration Corner Marks */}
      <span className="absolute top-3 left-3 text-[8px] font-mono text-black/30 pointer-events-none">+</span>
      <span className="absolute top-3 right-3 text-[8px] font-mono text-black/30 pointer-events-none">+</span>
      <span className="absolute bottom-3 left-3 text-[8px] font-mono text-black/30 pointer-events-none">+</span>
      <span className="absolute bottom-3 right-3 text-[8px] font-mono text-black/30 pointer-events-none">+</span>

      {/* 2. Background Structural Grid & Dotted Axis Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-30 transition-opacity duration-300">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/40" />
        <div className="absolute left-1/3 top-0 h-full w-[1px] bg-black/40" />
        <div className="absolute top-6 left-6 right-6 bottom-6 border border-dashed border-black/30 rounded-[16px]" />
      </div>

      {/* 3. Top Index Header Row */}
      <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-[11px] tracking-widest text-black/60 uppercase pb-6 border-b border-black/10">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-black/90">{testimonial.id} / CLIENT STORY</span>
          <span className="text-black/30">//</span>
          <span className="text-[9px] tracking-wider text-black/50">{testimonial.country}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors duration-300 border border-black/10" />
          <span className="text-[9px] font-sans font-medium tracking-tight opacity-70">
            SYS.{testimonial.id}
          </span>
        </div>
      </div>

      {/* 4. Center Content Block */}
      <div className="relative z-10 my-8 sm:my-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* Left Meta Specs */}
        <div className="md:col-span-4 space-y-3">
          <div className="inline-block px-2.5 py-1 bg-black/5 rounded-full border border-black/10 text-[9px] font-mono text-black/70 tracking-tight uppercase">
            {testimonial.projectType}
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-sans font-bold tracking-tight text-black uppercase leading-none pt-1">
            {testimonial.projectName}
          </h3>

          <div className="text-[9px] text-black/40 font-mono tracking-tighter uppercase">
            SPEC.REF // ARCHIVE_{testimonial.id}
          </div>
        </div>

        {/* Right Editorial Testimonial Narrative */}
        <div className="md:col-span-8 relative pl-0 md:pl-6 border-l-0 md:border-l border-black/10">
          
          {/* Subtle Abstract Quotation Symbol */}
          <div className="absolute -top-6 -left-2 text-5xl font-serif text-black/10 pointer-events-none select-none">
            “
          </div>

          <p className="relative z-10 text-sm sm:text-base md:text-lg font-sans font-normal text-black/80 leading-relaxed sm:leading-relaxed">
            “{testimonial.testimonial}”
          </p>

        </div>

      </div>

      {/* 5. Bottom Metadata Row & Studio Footer */}
      <div className="relative z-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[9px] sm:text-[10px] tracking-widest text-black/60 uppercase">
        
        {/* Client Identity */}
        <div className="flex items-center gap-3">
          <span className="font-sans font-bold text-black text-xs tracking-tight">
            {testimonial.clientName}
          </span>
          <span className="text-black/30">•</span>
          <span className="font-mono text-black/50">
            {testimonial.role}
          </span>
        </div>

        {/* Studio Branding Stamp */}
        <div className="flex items-center gap-2 font-mono text-black/40 text-[8px] sm:text-[9px]">
          <span>ALYOXA</span>
          <span>/</span>
          <span>DIGITAL EXPERIENCE STUDIO</span>
        </div>

      </div>

    </div>
  );
};

export default TestimonialCard;