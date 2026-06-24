import dynamic from "next/dynamic";
import { Suspense } from "react";
import { portfolio } from "@/data/portfolio";
import SectionNav from "@/components/SectionNav";
import HeroSection from "@/components/sections/HeroSection";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import FeaturedCaseStudies from "@/components/sections/FeaturedCaseStudies";
import ArchitectureProof from "@/components/sections/ArchitectureProof";
import WhatIBuild from "@/components/sections/WhatIBuild";
import WorkProcess from "@/components/sections/WorkProcess";
import TechStack from "@/components/sections/TechStack";
import OtherProjects from "@/components/sections/OtherProjects";
import TrustNote from "@/components/sections/TrustNote";
import FinalCTA from "@/components/sections/FinalCTA";

const BackgroundEffects = dynamic(() => import("@/components/BackgroundEffects"), {
  ssr: false,
  loading: () => <div className="night-sky" aria-hidden="true" />,
});

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

export default function HomeDeck() {
  const featuredProjects = portfolio.projects.filter((p) => p.featured);
  const otherProjects    = portfolio.projects.filter((p) => !p.featured);

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
        <HeroSection />

        {/* 2 — Impact Metrics: animated proof strip */}
        <ImpactMetrics />

        <SectionDivider />

        {/* 3 — Featured Case Studies: top 3 healthcare systems */}
        <FeaturedCaseStudies projects={featuredProjects} />

        <SectionDivider />

        {/* 4 — Architecture / Workflow Proof: sanitized system diagrams */}
        <ArchitectureProof />

        <SectionDivider />

        {/* 5 — What I Build: 4-card expertise grid */}
        <WhatIBuild />

        <SectionDivider />

        {/* 6 — How I Work: 4-step visual process */}
        <WorkProcess />

        <SectionDivider />

        {/* 7 — Technical Stack: grouped skill chips */}
        <TechStack />

        <SectionDivider />

        {/* 8 — Other Projects: compact grid */}
        {otherProjects.length > 0 && (
          <OtherProjects projects={otherProjects} />
        )}

        {/* 9 — Confidentiality / trust note */}
        <TrustNote />

        {/* 10 — Final CTA */}
        <FinalCTA />
      </div>
    </>
  );
}
