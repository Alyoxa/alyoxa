import { testimonialsData } from "@/data/TestimonialsData";
import TestimonialsTransition from "./TestimonialsTransition";
import TestimonialCard from "./TestimonialCard";

export default function TestimonialsSection() {
  return (
    <section className="relative">

      {/* Testimonials Intro / Transition */}
      <TestimonialsTransition />

      {/* Testimonials Content */}
      <div className="mx-auto flex w-full max-w-[1600px] px-4 sm:px-10 lg:px-10 xl:px-10">

        {/* LEFT — smaller / sticky */}
        <div className="w-[35%]">
          <div className="sticky top-0 flex h-screen flex-col justify-top px-4 py-5">

            <span className="mb-6 w-fit rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white">
              CLIENT STORIES
            </span>

            <h2 className="text-5xl font-black leading-[0.95] sm:text-6xl lg:text-6xl">
              WHAT THEY
              <br />
              SAY.
            </h2>

            <p className="mt-8 max-w-sm text-base leading-relaxed text-black/60 sm:text-lg">
              Real words from the people and businesses we've had the
              opportunity to build with.
            </p>

          </div>
        </div>

        {/* RIGHT — bigger / cards */}
        <div className="w-[65%] pl-10 lg:pl-16">

        <div className="flex flex-col gap-8 py-20">
            {testimonialsData.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          
        </div>

      </div>
    </div>

    </section>
  );
}