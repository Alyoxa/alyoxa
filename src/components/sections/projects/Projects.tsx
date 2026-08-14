import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section className=" overflow-x-hidden z-10">
      {projects.map((project, index) => (
        <div key={index} className="grid grid-cols-12 min-h-screen relative">
          <h2
            className="
    absolute
    right-[-18%]
    max-w-7xl
    text-[17vw]
    font-black
    uppercase
    text-zinc-200
    opacity-50
    whitespace-nowrap
    pointer-events-none
    select-none
    z-0
  "
          >
            {project.name}
          </h2>

          <div className="col-span-5 z-10 flex items-center justify-start ">
            <Image
              src={project.desktopImage}
              alt="Project Desktop Image"
              width={650}
              height={650}
            />
          </div>
          <div className="col-span-4 z-10 flex flex-col justify-center items-start gap-2">
            <div className="flex flex-col">
              <span className="bg-zinc-900 w-fit rounded-lg text-white px-3 uppercase">
                {project.subtitle}
              </span>
              <h2 className=" text-6xl text-zinc-800 font-bold uppercase pt-2">
                {project.title}
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              <p className="py-4 text-start max-w-md">{project.overview}</p>
              <div className="flex gap-1">
                {project.service.map((services, index) => (
                  <span key={index} className="bg-zinc-900 text-white px-2 rounded-lg">
                    {services}
                  </span>
                ))}
              </div>

              <div className="flex items-center pt-8">
                <Link
                  href={project.href}
                  className="
                group
                inline-flex
                items-center
                gap-2
                border
                border-zinc-800
                rounded-lg
                px-8
                py-[14px]
                transition-all
                duration-300
                hover:bg-zinc-900
                hover:text-white
                "
                >
                  <span>Open Experience</span>
                  <ArrowUpRight
                    className="
                          h-5
                          w-5
                          transition-transform
                          duration-500
                          ease-out
                          group-hover:translate-x-1
                          group-hover:-translate-y-1 "
                  />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-span-3 z-10 flex items-center justify-center text-white">
            <Image
              src={project.mobileImage}
              width={240}
              height={240}
              alt="Project Mobile image"
            />
          </div>
        </div>
      ))}
    </section>
  );
}
