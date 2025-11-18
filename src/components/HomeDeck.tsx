"use client";

import React, { memo, useMemo } from "react";
import { portfolio } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import ProfileCard from "./ProfileCard";
import AboutMe from "./AboutMe";
import ProjectCard from "./ProjectCard";
import BackgroundEffects from "./BackgroundEffects";
import { useFlipAnimation } from "@/hooks/useFlipAnimation";
import { useExperienceNavigation } from "@/hooks/useExperienceNavigation";
import { useTechGroupNavigation } from "@/hooks/useTechGroupNavigation";

const HomeDeck = memo(function HomeDeck() {
  const { isFlipped, isAnimating, toggleFlip } = useFlipAnimation();
  const { expIndex, goToNextExp } = useExperienceNavigation();
  const { techGroup, goToTechGroup } = useTechGroupNavigation();

  // Memoized portfolio projects slice
  const projects = useMemo(() => portfolio.projects.slice(0, 4), []);

  return (
    <>
      <BackgroundEffects />

      <section
        className="mx-auto max-w-5xl px-4 py-3 h-[100dvh] max-h-[100dvh] overflow-hidden"
        aria-label="Home deck"
      >
        <div className="grid gap-4 sm:grid-cols-2 h-full items-center justify-items-center">
          {/* Left Card - Flips between Profile and Projects */}
          <div
            className={`card-flip-container relative h-[420px] sm:h-[460px] w-full ${
              isAnimating ? "flipping" : ""
            }`}
          >
            <div
              className={`card-flip-inner relative w-full h-full transition-transform duration-600 ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side - Profile */}
              <div className="card-flip-front absolute inset-0 hero relative rounded-lg bg-card border border-token p-5 flex flex-col items-center justify-center gap-4 card-floating text-center shimmer-card jewel-profile">
                <ProfileCard
                  showActionButton={true}
                  size="large"
                  onToggleFlip={toggleFlip}
                  isFlipped={isFlipped}
                  isAnimating={isAnimating}
                />
              </div>

              {/* Back Side - Projects */}
              <div className="card-flip-back absolute inset-0 rounded-lg bg-card border border-token p-4 overflow-hidden shimmer-card">
                {/* Minimalist geometric accents */}
                <div className="about-constellation" aria-hidden="true">
                  <div className="geometric-line geometric-line--lg"></div>
                  <div className="geometric-line geometric-line--md"></div>
                  <div className="geometric-line geometric-line--sm"></div>
                  <span className="orb orb-a"></span>
                  <span className="orb orb-b"></span>
                  <span className="orb orb-c"></span>
                </div>

                <div className="h-full flex flex-col gap-3 justify-center">
                  <h2 className="text-center text-base sm:text-lg font-bold tracking-tight brand-gradient">
                    Projects
                  </h2>

                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {projects.map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        isCompact={true}
                      />
                    ))}
                  </div>

                  <div className="mt-2 flex items-center justify-center text-[8px] text-muted">
                    <span>Selected projects showcase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Card - Flips between About Me and Compact Profile */}
          <div
            className={`card-flip-container relative h-[420px] sm:h-[460px] w-full ${
              isAnimating ? "flipping" : ""
            }`}
          >
            <div
              className={`card-flip-inner relative w-full h-full transition-transform duration-600 ${
                isFlipped ? "rotate-y-180" : ""
              }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side - About Me */}
              <div className="card-flip-front absolute inset-0 rounded-lg bg-card border border-token p-0 overflow-hidden">
                <AboutMe
                  expIndex={expIndex}
                  onExpIndexChange={goToNextExp}
                  techGroup={techGroup}
                  onTechGroupChange={goToTechGroup}
                />
              </div>

              {/* Back Side - Reusable Profile Card */}
              <div className="card-flip-back absolute inset-0 rounded-lg bg-card border border-token p-5 overflow-hidden shimmer-card jewel-profile">
                <ProfileCard
                  showActionButton={true}
                  size="large"
                  onToggleFlip={toggleFlip}
                  isFlipped={isFlipped}
                  isAnimating={isAnimating}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default HomeDeck;
