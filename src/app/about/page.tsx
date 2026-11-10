// import AboutAnimations from "@/components/animations/about/aboutAnimations";
import type { Metadata } from "next";
import AboutFounder from "@/components/about/AboutFounder";
import AboutHero from "@/components/about/AboutHero";

import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/Navbar/NavBar";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-[#fcf7f1]" data-about-page>
    {/* <AboutAnimations /> */}
    <Navbar />
    <AboutHero />
    <AboutFounder />
    <Footer />
    </main>
  );
}
