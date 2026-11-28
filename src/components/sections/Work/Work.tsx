"use client";

import { useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import ProjectCaseStudy from "./ProjectCaseStudy";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import { workProjects } from "@/app/work/projects";
import { animateWork } from "./WorkAnimations";
import "./Work.css";
import AlyoxaMark from "@/components/ui/AlyoxaMark/AlyoxaMark";

gsap.registerPlugin(useGSAP);

type Category = "All Works" | "Branding" | "Digital" | "Product" | "Web";

export type Project = {
  id: string;
  name: string;
  type: string;
  image: string;
  categories: Category[];
  description: string;
  isConcept?: boolean;
  liveUrl: string | null;
  screenshots: { src: string; alt: string; caption: string }[];
};

/* The homepage slider shows the projects with photographic artwork. Content lives in one place
   (src/app/work/projects.ts), shared with the /work page: replace concepts there with real work. */
const featured = workProjects.filter((project) => !project.image.endsWith(".svg"));
const pad = (n: number) => String(n).padStart(2, "0");
const typeLabel = (project: Project) => project.type.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export default function Work() {
  const workRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sourceCard, setSourceCard] = useState<HTMLElement | null>(null);

  const open = (index: number, source: HTMLElement | null) => {
    setSourceCard(source);
    setSelectedProject(featured[index]);
  };

  useGSAP(() => {
    if (workRef.current) return animateWork(workRef.current, { onActive: setActive, onOpen: open });
  }, { scope: workRef });

  const last = featured.length - 1;

  return (
    <section data-motion-pending ref={workRef} className="work" id="work" aria-labelledby="work-heading">
      <div className="work__container">
        <div className="work__intro">
          <div className="work__intro-left">
            <SectionEyebrow className="work__eyebrow" index="02" category="Work">Selected projects</SectionEyebrow>
            <SectionHeading className="work__heading" id="work-heading" lines={["Selected", "works that", "deliver."]} />
          </div>
          <span className="work__intro-cross" aria-hidden="true" />
          <div className="work__description">
            <p>A collection of projects where strategy, design, and technology come together to create measurable impact.</p>
          </div>
        </div>
      </div>

      <div className="work__slider">
        {/* The stage: drag, swipe, trackpad, arrow keys, or click a side card. */}
        <div className="work__viewport" tabIndex={0} role="group" aria-roledescription="carousel" aria-label="Selected projects. Use the left and right arrow keys to browse.">
          <ul className="work__track">
            {featured.map((project, i) => (
              <li key={project.id} className="work__slide" data-index={i} style={{ "--i": i } as CSSProperties}
                aria-roledescription="slide" aria-label={`${i + 1} of ${featured.length}: ${project.name}`} aria-hidden={i !== active}>
                <div className="work__card" data-index={i}>
                  <Image src={project.image} alt="" fill draggable={false} sizes="(max-width: 700px) 82vw, (max-width: 1024px) 66vw, 46vw" preload={i === 0} />
                  <span className="work__card-shade" /><AlyoxaMark className="brand-seal brand-seal--slant" />
                  <span className="work__card-label">
                    <span className="work__card-name">{project.name}</span>
                    <span className="work__card-type">{project.type}</span>
                    <ArrowUpRight size={20} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="work__card-dim" />
                </div>
              </li>
            ))}
          </ul>
          <span className="work__drag" aria-hidden="true"><span>Drag</span></span>
        </div>

        <div className="work__bar">
          <div className="work__info" aria-live="polite">
            {featured.map((project, i) => (
              <div key={project.id} className="work__entry" data-active={i === active || undefined} aria-hidden={i !== active}>
                <p className="work__tag">{project.isConcept ? "Concept project" : "Client project"}<span aria-hidden="true" />{typeLabel(project)}</p>
                <h3 className="work__name">{project.name}</h3>
                <p className="work__desc">{project.description}</p>
              </div>
            ))}
          </div>

          <div className="work__controls">
            <div className="work__nav">
              <p className="work__count" aria-hidden="true">
                <span className="work__digits"><span className="work__strip">{featured.map((_, i) => <span key={i}>{pad(i + 1)}</span>)}</span></span>
                <span className="work__total">/ {pad(featured.length)}</span>
              </p>
              <div className="work__arrows">
                <button type="button" className="work__arrow" data-step="-1" aria-label="Previous project" disabled={featured.length < 3 && active === 0}><ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" /></button>
                <button type="button" className="work__arrow" data-step="1" aria-label="Next project" disabled={featured.length < 3 && active === last}><ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" /></button>
              </div>
            </div>
            <span className="work__progress" aria-hidden="true"><span className="work__progress-sphere" /></span>
            <BrandButton className="work__open" label="View case study" aria-haspopup="dialog"
              onClick={() => open(active, workRef.current?.querySelector<HTMLElement>(`.work__card[data-index="${active}"]`) ?? null)} />
          </div>
        </div>
      </div>

      <div className="work__container work__container--footer">
        <div className="work__footer">
          <span className="work__footer-rule" aria-hidden="true" />
          <div className="work__footer-actions">
            <BrandButton className="work__view-all" href="/work" label="View all projects" />
            <BrandButton className="work__showreel" variant="text" href="#contact" label="Discuss a project" />
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectCaseStudy
          project={selectedProject}
          source={sourceCard}
          nextProject={featured[(featured.findIndex((project) => project.id === selectedProject.id) + 1) % featured.length]}
          onClose={() => setSelectedProject(null)}
          onNext={setSelectedProject}
        />
      )}
    </section>
  );
}
