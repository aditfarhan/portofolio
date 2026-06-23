"use client";

import { memo, useRef, lazy, Suspense } from "react";
import { portfolio } from "@/data/portfolio";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedCaseStudies from "@/components/sections/FeaturedCaseStudies";
import WhatIBuild from "@/components/sections/WhatIBuild";
import WorkProcess from "@/components/sections/WorkProcess";
import TechStack from "@/components/sections/TechStack";
import OtherProjects from "@/components/sections/OtherProjects";
import FinalCTA from "@/components/sections/FinalCTA";

const BackgroundEffects = lazy(() =>
  import("@/components/BackgroundEffects")
);

const HomeDeck = memo(function HomeDeck() {
  const caseStudiesRef = useRef<HTMLElement>(null);

  const featuredProjects = portfolio.projects.filter((p) => p.featured);
  const otherProjects = portfolio.projects.filter((p) => !p.featured);

  function scrollToCaseStudies() {
    caseStudiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Fixed atmospheric background — star field, meteors, moon */}
      <Suspense fallback={<div className="night-sky" aria-hidden="true" />}>
        <BackgroundEffects />
      </Suspense>

      {/* Scrolling landing page content */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* 1 — Hero: identity + headline + CTA — fills first viewport */}
        <HeroSection onScrollToCaseStudies={scrollToCaseStudies} />

        {/* Subtle divider between hero and content */}
        <div
          className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
          aria-hidden="true"
        />

        {/* 2 — Featured Case Studies */}
        <FeaturedCaseStudies
          ref={caseStudiesRef}
          projects={featuredProjects}
        />

        {/* Divider */}
        <div
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>

        {/* 3 — What I Build */}
        <WhatIBuild />

        {/* Divider */}
        <div
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>

        {/* 4 — How I Work */}
        <WorkProcess />

        {/* Divider */}
        <div
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>

        {/* 5 — Technical Stack */}
        <TechStack />

        {/* Divider */}
        <div
          className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
          aria-hidden="true"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        </div>

        {/* 6 — Other Projects */}
        {otherProjects.length > 0 && (
          <OtherProjects projects={otherProjects} />
        )}

        {/* 7 — Final CTA */}
        <FinalCTA />
      </div>
    </>
  );
});

export default HomeDeck;
