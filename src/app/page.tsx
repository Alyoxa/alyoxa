
import Navbar from "@/components/layout/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import Work from "@/components/sections/Work/Work";
import Services from "@/components/sections/Services/Services";
import Approach from "@/components/sections/Approach/Approach";
import About from "@/components/sections/About/About";
import Testimonials from "@/components/sections/Testimonials/Testimonials";
import Footer from "@/components/layout/Footer/Footer";
import ScrollJourney from "@/components/motion/ScrollJourney";
import Preloader from "@/components/motion/Preloader/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <div id="alyoxa-site">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Work />
        <Services />
        <Approach />
        <About />
        <Testimonials />
      </main>
      <Footer contactIndex="07" />
      </div>
      <ScrollJourney />
    </>
  );
}
