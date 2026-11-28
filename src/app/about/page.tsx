import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import "@/components/ui/InnerPageHeading/InnerPageHeading.css";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import StudioMotion from "./StudioMotion";
import "./about-page.css";
import AlyoxaMark from "@/components/ui/AlyoxaMark/AlyoxaMark";

export const metadata = pageMetadata("/about");

const principles = [
  { number: "01", title: "Start with purpose.", text: "Before we make anything, we ask what it needs to do. Understanding your business, your audience, and your ambition gives the creative work a clear direction." },
  { number: "02", title: "Make it distinctive.", text: "We look for the idea that belongs to you. Then we carry it through the identity, interface, and smallest interaction, so every part feels connected." },
  { number: "03", title: "Build it to work.", text: "An expressive experience should also be useful. We consider clarity, accessibility, performance, and how your digital presence will evolve." },
];
const expertise = [
  { title: "Brand systems", text: "Positioning, visual identity, art direction, and the guidelines that bring a brand together." },
  { title: "Digital experiences", text: "Websites and interactive experiences that connect a distinctive point of view with a clear user journey." },
  { title: "Product design", text: "Thoughtful user experiences, interfaces, prototypes, and flexible design systems." },
  { title: "Creative technology", text: "Creative development, motion, immersive experiences, and custom digital tools." },
];

export default function AboutPage() {
  return <div className="studio-page" id="alyoxa-site">
    <Navbar page="about" />
    <PageStructuredData path="/about"/><main data-motion-pending id="main-content">
      <header className="studio-page__hero studio-page__wrap">
        <p className="studio-page__kicker" data-studio-reveal><span>THE STUDIO</span><span>Independent thinking. Collective ambition.</span></p>
        <h1 className="inner-page-heading" data-studio-reveal><span className="inner-hero-line"><span className="inner-hero-ink">Good ideas deserve</span></span><span className="inner-hero-line"><span className="inner-hero-ink">to become <em>real.</em></span></span></h1>
        <div className="studio-page__hero-bottom" data-studio-reveal><span className="studio-page__annotation">STRATEGY / DESIGN / TECHNOLOGY</span><p>We are Alyoxa. A creative partner for ambitious brands, bringing clear thinking and considered craft to the things people see, use, and remember.</p></div>
      </header>
      <figure className="studio-page__visual studio-page__wrap" data-studio-reveal>
        <div className="studio-page__image"><Image src="/images/hero/aetherform.webp" alt="Sculptural flowing metallic forms, an expression of Alyoxa's creative direction" width={1672} height={941} sizes="(max-width: 800px) 100vw, 92vw" priority /><span aria-hidden="true">Different perspectives.<br /><em>One clear direction.</em></span></div>
        <figcaption><span>ALYOXA / A SHARED POINT OF VIEW</span><span>01 / THE STUDIO</span></figcaption>
      </figure>
      <section className="studio-page__story studio-page__wrap" aria-labelledby="studio-story">
        <p className="studio-page__kicker" data-studio-reveal>WHY WE CREATE</p>
        <div><h2 id="studio-story" data-studio-reveal>A strong idea.<br />Every detail <em>connected.</em></h2><div className="studio-page__story-copy" data-studio-reveal><p>A brand is experienced in many ways: a first impression, a website, a product, a small moment of interaction. We believe those moments should speak the same language.</p><p>That is why we bring strategy, design, and technology into the same conversation. We work with you to understand what matters, find a clear creative direction, and turn it into an experience with purpose.</p></div></div>
      </section>
      <section className="studio-page__beliefs" aria-labelledby="studio-beliefs"><div className="studio-page__wrap">
        <div className="studio-page__section-top" data-studio-reveal><p className="studio-page__kicker">OUR POINT OF VIEW</p><h2 id="studio-beliefs">The thinking<br />behind <em>the making.</em></h2></div>
        <div className="studio-page__principles">{principles.map(item => <article key={item.number} data-studio-reveal><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div></section>
      <section className="studio-page__expertise studio-page__wrap" aria-labelledby="studio-expertise">
        <div className="studio-page__expertise-intro"><div data-studio-reveal><p className="studio-page__kicker">CONNECTED DISCIPLINES</p><h2 id="studio-expertise">One partner.<br /><em>A wider perspective.</em></h2><p className="studio-page__support">From the first question to the final detail, we connect the disciplines your idea needs.</p><BrandButton href="/services" variant="text" label="Explore our services" /><p className="studio-page__stack-note"><span aria-hidden="true">&#8595;</span> FOUR DISCIPLINES. ONE CONNECTED VISION.</p></div></div>
        <div className="studio-page__card-stack">{expertise.map((item, index) => <article className={`discipline-card discipline-card--${index + 1}`} key={item.title}>
          <div className="discipline-card__surface">
            <div className="discipline-card__art" aria-hidden="true"><i /><i /><i /></div><AlyoxaMark className="brand-seal" />
            <div className="discipline-card__meta"><span>0{index + 1} / 04</span><span>ALYOXA / EXPERTISE</span></div>
            <div className="discipline-card__copy"><h3>{item.title}</h3><p>{item.text}</p></div>
            <span className="discipline-card__signature" aria-hidden="true">{["Define the difference.", "Make every moment matter.", "Clarity in every interaction.", "Bring possibility to life."][index]}</span>
          </div>
        </article>)}</div>
      </section>
      <section className="studio-page__partnership studio-page__wrap" aria-labelledby="studio-partnership" data-studio-reveal><p className="studio-page__kicker">HOW WE WORK TOGETHER</p><h2 id="studio-partnership">Your ambition.<br /><em>Our shared project.</em></h2><p>We value open conversations, clear direction, and thoughtful feedback. You bring the knowledge of your business. We bring creative thinking and technical craft. Together, we shape what comes next.</p><BrandButton href="/work" label="See our work" /></section>
    </main>
    <Footer />
    <StudioMotion />
  </div>;
}
