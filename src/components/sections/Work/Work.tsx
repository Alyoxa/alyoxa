
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import ProjectCaseStudy from "./ProjectCaseStudy";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import { animateWork, animateWorkFilter } from "./WorkAnimations";
import "./Work.css";

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

const categories: Category[] = [
  "All Works",
  "Branding",
  "Digital",
  "Product",
  "Web",
];

const projects: Project[] = [
  {
    id: "tecton",
    name: "TECTON®",
    type: "DIGITAL EXPERIENCE",
    image: "/images/hero/tecton.webp",
    categories: ["Digital", "Product"],
    description: "An exploration of form, texture, and digital interaction. The direction brings a sculptural visual language into a focused product experience, with expressive imagery and a clear, considered interface.",
    liveUrl: null,
    screenshots: [],
  },
  {
    id: "lacuna",
    name: "LACUNA®",
    type: "BRAND + WEB",
    image: "/images/hero/lacuna.webp",
    categories: ["Branding", "Web"],
    description: "An expressive brand and web direction built around atmosphere and identity. Editorial typography, cinematic imagery, and a restrained layout come together to give the brand a distinctive digital presence.",
    liveUrl: null,
    screenshots: [],
  },
  {
    id: "aetherform",
    name: "AETHERFORM®",
    type: "PRODUCT + WEB",
    image: "/images/hero/aetherform.webp",
    categories: ["Product", "Web"],
    description: "A product and web direction shaped by fluid forms and quiet precision. A minimal interface gives the imagery room to breathe, creating a cohesive visual experience across screen sizes.",
    liveUrl: null,
    screenshots: [],
  },
];

export default function Work() {
  const workRef = useRef<HTMLElement>(null);
  const previousCategory = useRef<Category>("All Works");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sourceCard, setSourceCard] = useState<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<Category>("All Works");

  const visibleProjects = projects.filter(
    (project) =>
      activeCategory === "All Works" ||
      project.categories.includes(activeCategory)
  );

  useGSAP(() => {
    if (workRef.current) return animateWork(workRef.current);
  }, { scope: workRef });

  useGSAP(() => {
    if (previousCategory.current === activeCategory || !workRef.current) return;
    previousCategory.current = activeCategory;
    return animateWorkFilter(workRef.current, visibleProjects.map((project) => project.id));
  }, { scope: workRef, dependencies: [activeCategory] });

  return (
    <section
      data-motion-pending
      ref={workRef}
      className="work"
      id="work"
      aria-labelledby="work-heading"
    >
      <div className="work__container">
        <div className="work__intro">
          <div className="work__intro-left">
            <SectionEyebrow className="work__eyebrow" index="02" category="Work">Selected projects</SectionEyebrow>

            <SectionHeading className="work__heading" id="work-heading" lines={["Selected", "works that", "deliver."]} />
          </div>

          <span className="work__intro-cross" aria-hidden="true" />

          <div className="work__description">
            <p>
              A collection of projects where strategy, design,
              and technology come together to create
              measurable impact.
            </p>
          </div>
        </div>

        <div className="work__stage">
          <svg
            className="work__orbit"
            viewBox="0 0 1500 550"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M 16 300 C -65 175, 350 135, 695 145 C 1030 155, 1270 -75, 1440 80 C 1630 275, 1260 440, 835 488 C 490 530, 100 450, 16 300 Z"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>

          <span className="work__cross work__cross--one" aria-hidden="true" />
          <span className="work__cross work__cross--two" aria-hidden="true" />
          <span className="work__cross work__cross--three" aria-hidden="true" />

          <div className="work__projects">
            {projects.map((project) => (
              <article
                key={project.id}
                className={`work__project work__project--${project.id}`}
                aria-label={`${project.name}: ${project.type}`}
                data-project={project.id}
                aria-hidden={!visibleProjects.includes(project)}
                inert={!visibleProjects.includes(project)}
              >
                <button
                  type="button"
                  className="work__project-trigger"
                  aria-label={`Explore ${project.name} case study`}
                  aria-haspopup="dialog"
                  onClick={(event) => {
                    setSourceCard(event.currentTarget.closest<HTMLElement>(".work__project"));
                    setSelectedProject(project);
                  }}
                />
                <div
                  className="work__project-image"
                  style={{
                    backgroundImage: `url("${project.image}")`,
                  }}
                  role="img"
                  aria-label={`${project.name} project artwork`}
                />

                <div className="work__project-overlay" />

                <div className="work__project-content">
                  <h3>{project.name}</h3>
                  <p>{project.type}</p>
                  <ArrowUpRight
                    size={23}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                </div>
              </article>
            ))}
          </div>

          <span className="work__glass work__glass--left" aria-hidden="true" />
          <span className="work__glass work__glass--right" aria-hidden="true" />
          <span className="work__sphere" aria-hidden="true" />
        </div>

        <div className="work__footer">
          <div className="work__filters" role="group" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`work__filter ${
                  activeCategory === category
                    ? "work__filter--active"
                    : ""
                }`}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

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
          nextProject={projects[(projects.findIndex((project) => project.id === selectedProject.id) + 1) % projects.length]}
          onClose={() => setSelectedProject(null)}
          onNext={setSelectedProject}
        />
      )}
    </section>
  );
}
