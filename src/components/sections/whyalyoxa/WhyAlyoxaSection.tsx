import { whyAlyoxaData } from "@/data/WhyAlyoxaData";
import WhyCard from "./WhyCard";

export default function WhyAlyoxaSection() {
  return (
    <section className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      {/* LEFT CARDS */}
      <div className="why-cards-left absolute left-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-16">
        {whyAlyoxaData.slice(0, 2).map((card) => (
          <WhyCard key={card.number} card={card} />
        ))}
      </div>

      {/* CENTER */}
      <div className="flex items-center justify-center">
      <h2 className="why-title text-6xl font-black">
        WHY ALYOXA
      </h2>
    </div>  

      {/* RIGHT CARDS */}
      <div className="why-cards-right absolute right-[8%] top-1/2 -translate-y-1/2 flex flex-col gap-16">
        {whyAlyoxaData.slice(2, 4).map((card) => (
          <WhyCard key={card.number} card={card} />
        ))}
      </div>
    </section>
  );
}
