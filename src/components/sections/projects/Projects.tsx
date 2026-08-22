// components/sections/ProjectsSection.tsx
"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import { initProjectsAnimation } from "@/components/animations/projects/projects";


export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(1);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;
      const cleanup = initProjectsAnimation(
        sectionRef.current,
        trackRef.current,
        projects.length,
        (slide) => setActiveSlide(slide)
      );
      return () => {
        if (cleanup) cleanup();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full overflow-hidden"
    >
      {/* HORIZONTAL TRACK */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row lg:h-screen lg:w-max"
      >
        {projects.map((project, index) => (
          <div
            key={index}
            data-project-card="true"
            className="relative flex h-auto min-h-screen w-full flex-col justify-center px-6 py-16 lg:h-screen lg:w-screen lg:px-16 lg:py-0"
          >
            {/* Background Watermark Title */}
            <h2
              data-parallax="bg-text"
              className="pointer-events-none absolute right-[-5%] top-[10%] z-0 select-none text-[22vw] font-black uppercase leading-none text-zinc-200/40 lg:top-[12%] lg:text-[15vw]"
            >
              {project.name}
            </h2>

            {/* Layout Grid */}
            <div className="relative z-10 grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-6">
              {/* Laptop Image */}
              <div
                data-parallax="laptop"
                className="col-span-1 flex items-center justify-center lg:col-span-5 lg:justify-start"
              >
                <div className="relative w-full max-w-[550px] lg:max-w-[650px]">
                  <Image
                    src={project.desktopImage}
                    alt={`${project.title} Desktop`}
                    width={650}
                    height={650}
                    priority={index === 0}
                    className="h-auto w-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Information */}
              <div className="col-span-1 flex flex-col items-start justify-center gap-4 lg:col-span-4 lg:gap-3">
                <div className="flex flex-col items-start gap-2">
                  <span className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white lg:text-sm">
                    {project.subtitle}
                  </span>
                  <h3 className="pt-1 text-3xl font-black uppercase text-zinc-900 sm:text-4xl lg:text-5xl xl:text-5 xl">
                    {project.title}
                  </h3>
                </div>

                <p className="max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base lg:py-2">
                  {project.overview}
                </p>

                {/* Services */}
                <div className="flex flex-wrap gap-2">
                  {project.service.map((svc, i) => (
                    <span
                      key={i}
                      className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white"
                    >
                      {svc}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4 lg:pt-6">
                  <Link
                    href={project.href}
                    className="group inline-flex items-center gap-3 rounded-lg border border-zinc-800 px-8 py-3.5 transition-all duration-300 hover:bg-zinc-900 hover:text-white"
                  >
                    <span className="text-sm font-semibold tracking-wide">
                      Open Experience
                    </span>
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              {/* Mobile Image */}
              <div
                data-parallax="phone"
                className="col-span-1 flex items-center justify-center lg:col-span-3"
              >
                <div className="relative w-full max-w-[180px] sm:max-w-[220px] lg:max-w-[240px]">
                  <Image
                    src={project.mobileImage}
                    alt={`${project.title} Mobile`}
                    width={240}
                    height={240}
                    className="h-auto w-full object-contain drop-shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM-RIGHT PROGRESS BAR (Desktop) */}
      <div className="pointer-events-none fixed bottom-8 right-8 z-30 hidden items-center gap-4 rounded-full border border-zinc-300/60 bg-white/70 px-5 py-2.5 backdrop-blur-md lg:flex">
        <span className="text-xs font-bold tracking-wider text-zinc-900">
          0{activeSlide}
        </span>
        <div className="h-[2px] w-16 overflow-hidden rounded-full bg-zinc-200">
          <div
            className="h-full bg-zinc-900 transition-all duration-300 ease-out"
            style={{
              width: `${(activeSlide / projects.length) * 100}%`,
            }}
          />
        </div>
        <span className="text-xs font-bold tracking-wider text-zinc-400">
          0{projects.length}
        </span>
      </div>
    </section>
  );
}