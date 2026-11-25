import { pageMetadata } from "@/lib/seo";
import { PageStructuredData } from "@/components/seo/StructuredData";
import InnerPageMotion from "@/components/motion/InnerPageMotion/InnerPageMotion";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import BrandButton from "@/components/ui/BrandButton/BrandButton";
import "@/components/ui/InnerPageHeading/InnerPageHeading.css";
import WorkGallery from "./WorkGallery";
import "./work-page.css";
export const metadata = pageMetadata("/work");
export default function WorkPage() {
 return <div className="work-page" id="alyoxa-site"><Navbar page="work" /><PageStructuredData path="/work"/><main data-motion-pending id="main-content"><header className="work-page__hero work-page__wrap"><p className="work-page__eyebrow"><span>SELECTED EXPLORATIONS</span><span>BRAND / DIGITAL / PRODUCT</span></p><h1 className="inner-page-heading"><span className="inner-hero-line"><span className="inner-hero-ink">Ideas made</span></span><span className="inner-hero-line"><span className="inner-hero-ink"><em>unmistakable.</em></span></span></h1><div className="work-page__hero-bottom"><span>A POINT OF VIEW. IN EVERY PIXEL.</span><p>Different ambitions. Distinctive expressions. A look at the identities, experiences, and products we imagine into being.</p></div></header><WorkGallery /><section className="work-page__closing work-page__wrap"><p className="work-page__eyebrow">THE NEXT CHAPTER</p><h2>Your ambition.<br /><em>Our next collaboration.</em></h2><BrandButton href="/contact" label="Let's make it happen" /></section></main><InnerPageMotion selector=".work-page"/><Footer /></div>;
}
