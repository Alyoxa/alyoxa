import type { Metadata } from "next";
import "@/components/ui/InnerPageHeading/InnerPageHeading.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import ServicesMotion from "./ServicesMotion";
import "./services-page.css";

export const metadata: Metadata = {
 title: "Services", description: "Brand strategy, digital experiences, product design, and creative technology. Discover how Alyoxa brings ambitious ideas to life.",
 alternates: { canonical: "/services" }, openGraph: { title: "Services | ALYOXA", description: "Clear thinking. Distinctive design. Technology with purpose.", url: "/services" },
};
const disciplines = [
 { id: "brand", title: "Brand systems", phrase: "Be unmistakably you.", description: "Find the idea that makes your business different, then give it a visual language people recognise. We connect positioning and expression into one coherent brand.", deliverables: ["Brand strategy & positioning", "Visual identity & art direction", "Typography & colour systems", "Brand guidelines & applications"], outcome: "A clear identity and a system to carry it forward." },
 { id: "digital", title: "Digital experiences", phrase: "Make the first impression last.", description: "Your website is where your brand becomes an experience. We bring story, interaction, and development together to make it expressive, intuitive, and useful.", deliverables: ["Website strategy & design", "Web development & web apps", "Interactive experiences", "Responsive design systems"], outcome: "A digital presence with personality and a clear next step." },
 { id: "product", title: "Product design", phrase: "Less friction. More possibility.", description: "Turn a promising idea into a product people can understand and use. We connect user needs and business goals through considered journeys, interfaces, and systems.", deliverables: ["User journeys & UX design", "Interface & interaction design", "Prototyping & validation", "Component libraries & design systems"], outcome: "A considered product direction, ready to test and build." },
 { id: "technology", title: "Creative technology", phrase: "Take the idea further.", description: "Some ideas call for a different kind of execution. We bring creative development and technical exploration together to make ambitious interactions tangible.", deliverables: ["Creative development", "WebGL & 3D experiences", "Motion & interactive systems", "Custom tools & integrations"], outcome: "A working experience that makes your ambition tangible." },
];
export default function ServicesPage() {
 return <div className="services-page" id="alyoxa-site"><Navbar page="services" /><main data-motion-pending id="main-content">
  <header className="services-page__hero services-page__wrap">
   <p className="services-page__eyebrow" data-service-reveal><span>OUR CAPABILITIES</span><span>FOUR DISCIPLINES / ONE SHARED AMBITION</span></p>
   <h1 className="inner-page-heading" data-service-reveal><span className="inner-hero-line"><span className="inner-hero-ink">From <em>what if.</em></span></span><span className="inner-hero-line"><span className="inner-hero-ink">To <em>what's next.</em></span></span></h1>
   <div className="services-page__hero-bottom" data-service-reveal><span>STRATEGY. DESIGN. TECHNOLOGY.</span><p>For brands ready to move forward. We connect clear thinking, distinctive design, and thoughtful technology to bring your next chapter to life.</p></div>
   <nav className="services-page__index" aria-label="Choose a service">{disciplines.map((service,index) => <a href={`#${service.id}`} key={service.id}><span>0{index+1}</span>{service.title}<span aria-hidden="true">&#8599;</span></a>)}</nav>
  </header>
  <div className="services-page__chapters services-page__wrap">{disciplines.map((service,index) => <section className={`service-chapter service-chapter--${service.id}`} id={service.id} key={service.id} aria-labelledby={`${service.id}-title`}>
   <div className="service-chapter__visual"><div className="service-chapter__art" aria-hidden="true"><i /><i /><i /><span>0{index+1}</span></div><div className="service-chapter__visual-caption"><span>ALYOXA / {service.id.toUpperCase()}</span><span>0{index+1} / 04</span></div></div>
   <div className="service-chapter__content"><p className="services-page__eyebrow" data-service-reveal>0{index+1} / THE DISCIPLINE</p><h2 id={`${service.id}-title`} data-service-reveal>{service.title}</h2><p className="service-chapter__phrase" data-service-reveal><em>{service.phrase}</em></p><p className="service-chapter__description" data-service-reveal>{service.description}</p><div className="service-chapter__deliverables" data-service-reveal><h3>WHAT WE CAN CREATE</h3><ul>{service.deliverables.map(item => <li key={item}><span aria-hidden="true">+</span>{item}</li>)}</ul></div><p className="service-chapter__outcome" data-service-reveal><span>THE OUTCOME</span>{service.outcome}</p><BrandButton href="/contact" variant="text" label="Let's talk about it" /></div>
  </section>)}</div>
  <section className="services-page__collaboration services-page__wrap" aria-labelledby="services-together"><div data-service-reveal><p className="services-page__eyebrow">BUILT AROUND YOUR AMBITION</p><h2 id="services-together">The right thinking.<br /><em>The right combination.</em></h2></div><div data-service-reveal><p>You may need a new identity, a better digital experience, or a partner to connect it all. We shape the scope around your goals and the stage your business is at.</p><ol><li><span>01</span><div><h3>Find the direction</h3><p>Understand your ambition, audience, and the opportunity ahead.</p></div></li><li><span>02</span><div><h3>Connect the disciplines</h3><p>Define the right mix of strategy, design, and development.</p></div></li><li><span>03</span><div><h3>Make it happen</h3><p>Create, refine, and bring the experience into the world.</p></div></li></ol><BrandButton href="/contact" label="Shape your project" /></div></section>
  <section className="services-page__work services-page__wrap" data-service-reveal><p className="services-page__eyebrow">FROM THINKING TO MAKING</p><h2>See how it<br /><em>comes together.</em></h2><BrandButton href="/work" label="Explore our work" /></section>
 </main><Footer /><ServicesMotion /></div>;
}
