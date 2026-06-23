"use client";

import { memo, useRef, lazy, Suspense } from "react";
import { portfolio } from "@/data/portfolio";
import SectionNav from "@/components/SectionNav";
import HeroSection from "@/components/sections/HeroSection";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import FeaturedCaseStudies from "@/components/sections/FeaturedCaseStudies";
import WhatIBuild from "@/components/sections/WhatIBuild";
import WorkProcess from "@/components/sections/WorkProcess";
import TechStack from "@/components/sections/TechStack";
import OtherProjects from "@/components/sections/OtherProjects";
import TrustNote from "@/components/sections/TrustNote";
import FinalCTA from "@/components/sections/FinalCTA";

const BackgroundEffects = lazy(() => import("@/components/BackgroundEffects"));

function SectionDivider() {
  return (
    <div
      className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8"
      aria-hidden="true"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
    </div>
  );
}

const HomeDeck = memo(function HomeDeck() {
  const caseStudiesRef = useRef<HTMLElement>(null);

  const featuredProjects = portfolio.projects.filter((p) => p.featured);
  const otherProjects    = portfolio.projects.filter((p) => !p.featured);

  function scrollToCaseStudies() {
    caseStudiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      {/* Fixed atmospheric background — star field, meteors, moon */}
      <Suspense fallback={<div className="night-sky" aria-hidden="true" />}>
        <BackgroundEffects />
      </Suspense>

      {/* Landing page — all sections */}
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Sticky section navigation */}
        <SectionNav />

        {/* 1 — Hero: identity + headline + CTAs */}
        <HeroSection onScrollToCaseStudies={scrollToCaseStudies} />

        {/* 2 — Impact Metrics: animated proof strip */}
        <ImpactMetrics />

        <SectionDivider />

        {/* 3 — Featured Case Studies: top 3 healthcare systems */}
        <FeaturedCaseStudies ref={caseStudiesRef} projects={featuredProjects} />

        <SectionDivider />

        {/* 4 — What I Build: 4-card expertise grid */}
        <WhatIBuild />

        <SectionDivider />

        {/* 5 — How I Work: 4-step visual process */}
        <WorkProcess />

        <SectionDivider />

        {/* 6 — Technical Stack: grouped skill chips */}
        <TechStack />

        <SectionDivider />

        {/* 7 — Other Projects: compact grid */}
        {otherProjects.length > 0 && (
          <OtherProjects projects={otherProjects} />
        )}

        {/* 8 — Confidentiality / trust note */}
        <TrustNote />

        {/* 9 — Final CTA */}
        <FinalCTA />
      </div>
    </>
  );
});

export default HomeDeck;
