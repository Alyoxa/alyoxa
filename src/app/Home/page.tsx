import Navbar from "@/components/layout/Navbar/NavBar";
import WhyAlyoxaSection from "@/components/sections/About/WhyAlyoxaSection";
import Approach from "@/components/sections/Approach/Approach";
import HeroBanner from "@/components/sections/Hero/Hero";
import ProjectsSection from "@/components/sections/projects/Projects";
import TransitionSection from "@/components/sections/Transition/TransitionSection";

export default function TheHome(){




    return(
    <section className="min-h-screen">
        <Navbar />
        <HeroBanner />
        <TransitionSection />
        <ProjectsSection />
        <Approach />
        <WhyAlyoxaSection />
    </section>
    );




}