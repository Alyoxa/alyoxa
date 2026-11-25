"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { LuArrowUpRight, LuArrowDown } from "react-icons/lu";
import { animateHero } from "./HeroAnimations";
import SectionEyebrow from "@/components/ui/SectionEyebrow/SectionEyebrow";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import "./Hero.css";

gsap.registerPlugin(useGSAP);

const projects = [
    { id: "lacuna", name: "LACUNA®", type: "BRAND + WEB", image: "/images/hero/lacuna.webp" },
    { id: "aetherform", name: "AETHERFORM®", type: "PRODUCT + WEB", image: "/images/hero/aetherform.webp" },
    { id: "tecton", name: "TECTON®", type: "DIGITAL EXPERIENCE", image: "/images/hero/tecton.webp" },
] as const;

function Headline({ overlay = false }: { overlay?: boolean }) {
    const TitleTag = overlay ? "div" : "h1";
    return (
        <div className={`hero__headline${overlay ? " hero__headline--white" : ""}`} aria-hidden={overlay || undefined}>
            <TitleTag id={overlay ? undefined : "hero-title"} className="hero__title" aria-label={overlay ? undefined : "We build brands that feel real."}>
                <span className="hero__title-line hero__title-line--one">WE BUILD</span>
                <span className="hero__title-line hero__title-line--two">BRANDS</span>
                <span className="hero__title-line hero__title-line--three">THAT FEEL</span>
                <span className="hero__title-line hero__title-line--four">REAL.</span>
            </TitleTag>
        </div>
    );
}

export default function Hero() {
    const heroRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const root = heroRef.current;
        if (!root) return;

        return animateHero(root);
    }, { scope: heroRef });

    return (
        <section data-motion-pending ref={heroRef} className="hero" id="home" aria-labelledby="hero-title">
            <div className="hero__container">
                <div className="hero__top">
                    <SectionEyebrow className="hero__eyebrow" index="01" category="Studio">Creative technology studio</SectionEyebrow>
                    <span className="hero__studio-note">Independent minds.<br />Extraordinary possibilities.</span>
                </div>

                <div className="hero__composition">
                    <div className="hero__decorations" aria-hidden="true">
                        <svg className="hero__orbit" viewBox="0 0 1600 700" preserveAspectRatio="none" fill="none">
                            <path
                                className="hero__orbit-base"
                                d="M80 440 C-20 270 470 120 850 145 C1250 170 1660 330 1510 490 C1280 710 390 680 80 440Z"
                                stroke="currentColor"
                                strokeWidth="0.8"
                            />
                            <path
                                className="hero__orbit-trace"
                                d="M80 440 C-20 270 470 120 850 145 C1250 170 1660 330 1510 490 C1280 710 390 680 80 440Z"
                                stroke="#B6A18C"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="hero__cross hero__cross--one" />
                        <span className="hero__cross hero__cross--two" />
                        <span className="hero__cross hero__cross--three" />
                    </div>

                    <div className="hero__projects">
                        {projects.map((project) => (
                            <Link href="#work" key={project.id} className={`hero__project hero__project--${project.id}`} aria-label={`${project.name} ${project.type}: explore our selected work`}>
                                <div className="hero__project-media"><Image src={project.image} alt={`${project.name} creative direction`} fill sizes={project.id === "lacuna" ? "(max-width: 700px) 85vw, 40vw" : "(max-width: 700px) 45vw, 22vw"} preload={project.id === "lacuna"} /></div>
                                <div className="hero__project-shade" />
                                <div className="hero__project-info">
                                    <span className="hero__project-name">{project.name}</span>
                                    <span className="hero__project-type">{project.type}</span>
                                    <LuArrowUpRight size={18} aria-hidden="true" />
                                </div>
                            </Link>
                        ))}
                    </div>

                    <Headline />
                    {/* The white copy is clipped to the same geometric outline as the LACUNA artwork. */}
                    <div className="hero__headline-mask" aria-hidden="true"><Headline overlay /></div>

                    <span className="hero__glass" aria-hidden="true" />
                    <span className="hero__copper" aria-hidden="true" />

                    <div className="hero__content">
                        <p className="hero__description">Distinctive by design.<br />We turn ambitious ideas into brands and digital experiences people <em>feel.</em></p>
                        <div className="hero__actions">
                            <BrandButton href="#work" className="hero__primary-cta" label="Explore work" />
                            <BrandButton href="#contact" className="hero__contact" variant="text" label="Have an idea?" />
                        </div>
                    </div>
                </div>
                <div className="hero__bottom"><span>Strategy. Design. Technology.</span><Link href="#work"><span>Scroll to discover</span><LuArrowDown size={17} aria-hidden="true" /></Link><span>Built to leave an impression.</span></div>
            </div>
        </section>
    );
}
