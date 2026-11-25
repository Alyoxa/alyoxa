import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import InnerPageMotion from "@/components/motion/InnerPageMotion/InnerPageMotion";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import ContactForm from "./ContactForm";
import "@/components/ui/InnerPageHeading/InnerPageHeading.css";
import "./contact-page.css";
export const metadata = pageMetadata("/contact");
export default function ContactPage(){return <div className="contact-page" id="alyoxa-site"><Navbar page="contact"/><PageStructuredData path="/contact"/><main data-motion-pending id="main-content" className="contact-page__wrap"><header className="contact-page__hero"><p className="contact-page__eyebrow"><span>LET&apos;S MAKE SOMETHING MATTER</span><span>YOUR NEXT CHAPTER / STARTS HERE</span></p><h1 className="inner-page-heading"><span className="inner-hero-line"><span className="inner-hero-ink">Big ambition.</span></span><span className="inner-hero-line"><span className="inner-hero-ink"><em>Small first step.</em></span></span></h1></header><ContactForm/></main><InnerPageMotion selector=".contact-page"/><Footer showCta={false}/></div>}
