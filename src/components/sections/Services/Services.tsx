import ServiceBrandSystems from "./BrandSystems/BrandSystems";
import ServiceDigitalExperience from "./DigitalExperiences/DigitalExperience";
import ServiceInteraction from "./Interaction/Interaction";
import ServicesTransition from "./ServicesTransition";
import ServiceWebDevelopment from "./WebDevelopment/WebDevelopment";


export default function Services() {
    return (
      <section className="relative min-h-screen">
       <ServicesTransition />
       <ServiceDigitalExperience />
       <ServiceBrandSystems />
       <ServiceWebDevelopment />
       <ServiceInteraction />
      </section>
    );
  }