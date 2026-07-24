import Navbar from "@/components/layout/Navbar/NavBar";
import HeroBanner from "@/components/sections/Hero/Hero";
import TransitionSection from "@/components/sections/Transition/TransitionSection";

export default function TheHome(){




    return(
    <section className="min-h-screen">
        <Navbar />
        <HeroBanner />
        <TransitionSection />
    </section>
    );




}