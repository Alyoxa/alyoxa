"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader/Preloader";
import HeroBanner from "@/components/sections/Hero/Hero";


export default function TheHomeExperience() {
  const [isPreloading, setIsPreloading] = useState(true);

  return (
    <>
      {isPreloading && (
        <Preloader
          onComplete={() => setIsPreloading(false)}
        />
      )}

      <HeroBanner isPreloading={isPreloading} />
    </>
  );
}