"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar/NavBar";
import WhyAlyoxaSection from "@/components/sections/whyalyoxa/WhyAlyoxaSection";
import Approach from "@/components/sections/Approach/Approach";

import ProjectsSection from "@/components/sections/projects/Projects";
import TransitionSection from "@/components/sections/Transition/TransitionSection";
import TestimonialsSection from "@/components/sections/Testimonials/TestimonialsSection";
import Services from "@/components/sections/Services/Services";
import ContactSection from "@/components/sections/Contact/ContactSection";
import Footer from "@/components/layout/footer/Footer";
import Preloader from "@/components/Preloader/Preloader";
import HeroBanner from "@/components/sections/Hero/Hero";

export default function TheHome(){

    const [isPreloading, setIsPreloading] = useState(true);

    return(
    <section className="min-h-screen">
      <Preloader
        onComplete={() => setIsPreloading(false)}
      />

      <Navbar />

      <HeroBanner
        isPreloading={isPreloading}
      />
    
        <TransitionSection />
        <ProjectsSection />
        <Approach />
        <WhyAlyoxaSection />
        <TestimonialsSection />
        <Services />
        <ContactSection />
        <Footer />
   
    </section>
    );




}