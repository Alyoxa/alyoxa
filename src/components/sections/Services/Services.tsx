"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { animateServices, animateServiceDetail } from "./ServicesAnimations";
import { ArrowUpRight, ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import "./Services.css";
import SectionHeading from "@/components/ui/SectionHeading/SectionHeading";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import { useCardDialog } from "@/components/motion/useCardDialog";
import AlyoxaMark from "@/components/ui/AlyoxaMark/AlyoxaMark";

gsap.registerPlugin(useGSAP);

const services = [
  {
    id: "brand", number: "01", title: "Brand systems", lines: ["Brand", "systems"],
    statement: "A clear identity. An unmistakable presence.",
    description: "We turn what makes your business different into a brand people can recognise and connect with. From positioning to the smallest visual detail, we build a coherent system that gives every touchpoint the same distinct voice.",
    capabilities: ["Brand strategy & positioning", "Visual identity & art direction", "Typography & colour systems", "Brand guidelines & applications"],
    outcome: "A distinctive identity, with the tools and guidelines to use it consistently.",
  },
  {
    id: "digital", number: "02", title: "Digital experiences", lines: ["Digital", "experiences"],
    statement: "Built to be felt. Designed to be used.",
    description: "We create websites and digital experiences where expression meets purpose. Thoughtful structure, distinctive design, and considered development turn your online presence into a place people want to explore.",
    capabilities: ["Website strategy & design", "Web development & web apps", "Interactive experiences", "Responsive design systems"],
    outcome: "A cohesive digital experience that makes your story clear and the next step effortless.",
  },
  {
    id: "product", number: "03", title: "Product design", lines: ["Product", "design"],
    statement: "Less friction. More possibility.",
    description: "We help shape ideas into digital products that make sense in everyday use. By connecting user needs with business goals, we create intuitive interfaces and flexible systems that can evolve with your product.",
    capabilities: ["User journeys & UX design", "Interface & interaction design", "Prototyping & validation", "Component libraries & design systems"],
    outcome: "An intuitive product direction, ready to test, build, and grow.",
  },
  {
    id: "technology", number: "04", title: "Creative technology", lines: ["Creative", "technology"],
    statement: "Ambitious ideas. Made tangible.",
    description: "We explore what happens when creative thinking meets technical craft. From immersive web experiences to useful custom tools, we bring the right technology to ideas that need something beyond the expected.",
    capabilities: ["Creative development", "WebGL & 3D experiences", "Motion & interactive systems", "Custom tools & integrations"],
    outcome: "A working experience that brings an ambitious creative idea into the real world.",
  },
] as const;

type Service = (typeof services)[number];

function ServiceArtwork({ kind }: { kind: Service["id"] }) {
  return <div className={`services-art services-art--${kind}`} aria-hidden="true">
    <span className="services-art__image" />
    {kind === "product" && <div className="services-art__planes"><i /><i /><i /></div>}
    {kind === "technology" && <div className="services-art__planet" />}
    <span className="services-art__light" />
  </div>;
}

function ServiceDetail({ service, source, onClose, onSelect }: { service: Service; source: HTMLElement | null; onClose: () => void; onSelect: (service: Service) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const previousService = useRef(service.id);
  useEffect(() => {
    if (previousService.current !== service.id) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "instant" });
      titleRef.current?.focus({ preventScroll: true });
    }
    previousService.current = service.id;
  }, [service.id]);
  const index = services.findIndex((item) => item.id === service.id);
  const requestClose = useCardDialog({ dialogRef: ref, scrollRef, source, surface: "#111111", onClose });

  useGSAP(() => {
    if (!ref.current) return;
    return animateServiceDetail(ref.current);
  }, { scope: ref, dependencies: [service.id], revertOnUpdate: true });

  function changeService(next: Service) {
    onSelect(next);
  }

  return <dialog className="service-detail" ref={ref} aria-labelledby="service-detail-title" onCancel={(event) => { event.preventDefault(); requestClose(); }}>
    <div className="service-detail__scroll" ref={scrollRef}>
      <header className="service-detail__bar">
        <span className="service-detail__brand">ALYOXA<span> / SERVICES</span></span>
        <button className="service-detail__close" type="button" onClick={requestClose} autoFocus><span>All services</span><X size={20} /></button>
      </header>
      <div className={`service-detail__hero service-detail__hero--${service.id}`}>
        <ServiceArtwork kind={service.id} />
        <div className="service-detail__hero-content">
          <span className="services__label">{service.number} / OUR EXPERTISE</span>
          <h2 id="service-detail-title" ref={titleRef} tabIndex={-1}>{service.lines[0]}<br /><em>{service.lines[1]}.</em></h2>
          <p>{service.statement}</p>
        </div>
      </div>
      <section className="service-detail__overview" aria-labelledby="service-detail-overview">
        <div><span className="services__label">THE THINKING</span><h3 id="service-detail-overview">Clarity in the idea.<br /><em>Craft in every detail.</em></h3></div>
        <div><p className="service-detail__description">{service.description}</p><p className="service-detail__outcome">{service.outcome}</p></div>
      </section>
      <section className="service-detail__capabilities" aria-labelledby="service-detail-capabilities">
        <span className="services__label" id="service-detail-capabilities">WHAT WE CAN DO</span>
        <ul>{service.capabilities.map((capability) => <li key={capability}><span>{capability}</span><Plus size={18} strokeWidth={1} aria-hidden="true" /></li>)}</ul>
      </section>
      <div className="service-detail__contact"><p>Have something<br /><em>in mind?</em></p><BrandButton variant="light" href={`mailto:hello@alyoxa.com?subject=${encodeURIComponent(`Let's talk ${service.title.toLowerCase()}`)}`} label="Let’s make it happen" /></div>
      <footer className="service-detail__footer">
        <button type="button" onClick={() => changeService(services[(index + services.length - 1) % services.length])}><ChevronLeft size={18} /><span>Previous service</span></button>
        <span>{service.number} / 04</span>
        <button type="button" onClick={() => changeService(services[(index + 1) % services.length])}><span>Next service</span><ChevronRight size={18} /></button>
      </footer>
    </div>
  </dialog>;
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [sourceCard, setSourceCard] = useState<HTMLElement | null>(null);

  useGSAP(() => {
    if (sectionRef.current) return animateServices(sectionRef.current);
  }, { scope: sectionRef });

  return <section data-motion-pending ref={sectionRef} className="services" id="services" aria-labelledby="services-heading">
    <div className="services__container">
      <div className="services__intro">
        <div>
          <SectionEyebrow className="services__eyebrow" index="03" category="Services">Creative capabilities</SectionEyebrow>
          <SectionHeading className="services__heading" id="services-heading" lines={["Services", "that create", "real impact."]} />
        </div>
        <div className="services__description"><p>A focused set of creative and technology services. Built around your ambition. Designed to make a lasting impression.</p><span className="services__label">STRATEGY × DESIGN × TECHNOLOGY</span></div>
      </div>

      <div className="services__stage">
        <svg className="services__orbit" viewBox="0 0 1500 520" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M 25 305 C -45 185 270 125 620 130 C 1000 140 1240 -40 1430 75 C 1610 230 1310 445 890 470 C 460 510 105 425 25 305 Z" stroke="currentColor" /></svg>
        <Plus className="services__cross services__cross--one" strokeWidth={1} aria-hidden="true" /><Plus className="services__cross services__cross--two" strokeWidth={1} aria-hidden="true" />
        <div className="services__cards">
          {services.map((service) => <button type="button" key={service.id} className={`services__card services__card--${service.id}`} onClick={(event) => { setSourceCard(event.currentTarget); setSelectedService(service); }} aria-haspopup="dialog" aria-label={`Explore ${service.title}`}>
            <ServiceArtwork kind={service.id} />
            <span className="services__card-sheen" aria-hidden="true" /><AlyoxaMark className="brand-seal brand-seal--top" />
            <div className="services__card-content"><span className="services__number">{service.number}</span><h3>{service.lines[0]}<br />{service.lines[1]}<sup>®</sup></h3><span className="services__card-bottom"><ArrowUpRight size={26} strokeWidth={1.3} aria-hidden="true" /><span>Explore service</span></span></div>
          </button>)}
        </div>
        <div className="services__scroll-caption" aria-hidden="true">{services.map((service) => <p key={service.id} data-service={service.id}><span>{service.number} / 04</span><span>{service.statement}</span></p>)}</div>
      </div>

      <footer className="services__footer"><p><span className="services__linked-circles" aria-hidden="true" />Four disciplines. Endless possibilities.</p><span className="services__footer-rule" /><BrandButton variant="text" href="/services" label="Explore our capabilities" /></footer>
    </div>
    {selectedService && <ServiceDetail service={selectedService} source={sourceCard} onClose={() => setSelectedService(null)} onSelect={setSelectedService} />}
  </section>;
}
