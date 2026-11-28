"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "./Work";
import "./ProjectCaseStudy.css";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import { useCardDialog } from "@/components/motion/useCardDialog";

type Props = {
  project: Project;
  source: HTMLElement | null;
  nextProject: Project;
  onClose: () => void;
  onNext: (project: Project) => void;
};

export default function ProjectCaseStudy({ project, source, nextProject, onClose, onNext }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousProject = useRef(project.id);

  const requestClose = useCardDialog({ dialogRef, scrollRef, source, surface: "#fafafa", onClose });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
    if (previousProject.current !== project.id) titleRef.current?.focus({ preventScroll: true });
    previousProject.current = project.id;
  }, [project.id]);

  return (
    <dialog ref={dialogRef} className="case-study" aria-labelledby="case-study-title" onCancel={(event) => { event.preventDefault(); requestClose(); }}>
      <div className="case-study__scroll" ref={scrollRef}>
        <header className="case-study__bar">
          <span className="case-study__brand">ALYOXA<span> / SELECTED WORK</span></span>
          <button type="button" className="case-study__close" onClick={requestClose} autoFocus aria-label="Close case study">
            <span>Back to work</span><X size={20} strokeWidth={1.5} />
          </button>
        </header>

        <div className="case-study__body" key={project.id}>
          <div className="case-study__intro">
            <p className="case-study__eyebrow">{project.type}{project.isConcept ? " / CONCEPT PROJECT" : ""}</p>
            <h2 id="case-study-title" ref={titleRef} tabIndex={-1} className="case-study__title">{project.name.replace("®", "")}{!project.isConcept && <sup>®</sup>}</h2>
            <div className="case-study__summary">
              <p>A distinct point of view.<br /><em>A considered digital experience.</em></p>
              <span className="case-study__index">ALYOXA / {project.id.toUpperCase()}</span>
            </div>
          </div>

          <figure className={`case-study__cover case-study__cover--${project.id}`}>
            <Image src={project.image} alt={`${project.name} creative direction artwork`} width={1672} height={941} sizes="100vw" priority />
            <figcaption><span>{project.name}</span><span>Creative direction</span></figcaption>
          </figure>

          <section className="case-study__overview" aria-labelledby="case-study-overview">
            <div><p className="case-study__eyebrow" id="case-study-overview">THE PROJECT</p><h3>Designed to<br /><em>leave an impression.</em></h3></div>
            <div className="case-study__details">
              <p className="case-study__description">{project.description}</p>
              <dl className="case-study__facts"><div><dt>Discipline</dt><dd>{project.categories.join(" / ")}</dd></div><div><dt>Studio</dt><dd>Alyoxa</dd></div></dl>
              {project.liveUrl ? (
                <BrandButton className="case-study__visit" href={project.liveUrl} target="_blank" rel="noopener noreferrer" label="Visit site" aria-label="Visit site (opens in a new tab)" />
              ) : <BrandButton className="case-study__visit" disabled title="The live project URL has not been added yet" label="Visit site" note="Coming soon" />}
            </div>
          </section>

          {project.screenshots.length > 0 && <section className="case-study__gallery" aria-label={`${project.name} website screenshots`}>
            <p className="case-study__eyebrow">THE EXPERIENCE</p>
            {project.screenshots.map((screenshot) => <figure key={screenshot.src}><div className="case-study__browser"><i /><i /><i /></div><Image src={screenshot.src} alt={screenshot.alt} width={1600} height={1000} sizes="(max-width: 700px) 100vw, 90vw" /><figcaption>{screenshot.caption}</figcaption></figure>)}
          </section>}

          <button className="case-study__next" type="button" onClick={() => onNext(nextProject)}>
            <span><span className="case-study__eyebrow">NEXT PROJECT</span><span className="case-study__next-name">{nextProject.name}</span></span>
            <span className="case-study__next-icon"><ArrowUpRight strokeWidth={1} /></span>
          </button>
          <footer className="case-study__footer"><span>ALYOXA</span><span>Strategy. Design. Technology.</span></footer>
        </div>
      </div>
    </dialog>
  );
}
