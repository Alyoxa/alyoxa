import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import "./insights.css";

export default function InsightsLayout({ children }: { children: React.ReactNode }) {
  return <div className="journal" id="alyoxa-site">
    <a href="#main-content" className="journal__skip">Skip to content</a>
    <Navbar page="insights" />
    {children}
    <Footer showCta={false} />
  </div>;
}
