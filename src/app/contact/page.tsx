import type { Metadata } from "next";
import ContactHero from "@/components/contact/ContactHero";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/Navbar/NavBar";
import ProjectForm from "@/components/sections/Contact/ProjectForm/ProjectForm";
// Import your existing contact form component here.

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fcf7f1]">
        <Navbar />
      <ContactHero />
      <ProjectForm />
      <Footer />
    </main>
  );
}
