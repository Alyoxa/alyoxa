import type { Metadata } from "next";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/Navbar/NavBar";
import Services from "@/components/sections/Services/Services";
import ServicesHero from "@/components/services/ServicesHero";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main>
      <Navbar />
      <ServicesHero/>
      <Services />
      <Footer />
    </main>
  );
}
