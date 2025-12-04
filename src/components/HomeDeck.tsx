"use client";

import { memo, useMemo, lazy, Suspense } from "react";
import { portfolio } from "@/data/portfolio";
import { EXPERIENCE } from "@/lib/constants";
import ProfileCard from "./ProfileCard";
import ProjectCard from "./ProjectCard";
import BackgroundEffects from "./BackgroundEffects";
import { useFlipAnimation } from "@/hooks/useFlipAnimation";
import { useExperienceNavigation } from "@/hooks/useExperienceNavigation";
import { useTechGroupNavigation } from "@/hooks/useTechGroupNavigation";

// Lazy load heavy components
const AboutMe = lazy(() => import("./AboutMe"));

/**
 * HomeDeck - Main application component with flip animation between profile/projects and about sections
 */
const HomeDeck = memo(function HomeDeck() {
  const { isFlipped, isAnimating, toggleFlip } = useFlipAnimation();
  const { expIndex, goToExp } = useExperienceNavigation();
  const { techGroup, goToTechGroup } = useTechGroupNavigation();

  // Memoized experience index change handler
  const handleExpIndexChange = useMemo(() => {
    return (index: number) => {
      if (index >= 0 && index < EXPERIENCE.length) {
        goToExp(index);
      }
    };
  }, [goToExp]);

  // Memoized sorted projects by start date descending
  const sortedProjects = useMemo(() => {
    return [...portfolio.projects].sort((a, b) => {
      const aDate = a.period?.start ? new Date(a.period.start).getTime() : 0;
      const bDate = b.period?.start ? new Date(b.period.start).getTime() : 0;
      return bDate - aDate;
    });
  }, []);

  return (
    <>
      <BackgroundEffects />

      <section
        className="mx-auto max-w-5xl px-4 py-3 h-[100dvh] max-h-[100dvh] overflow-hidden"
        aria-label="Portfolio showcase"
      >
        <div className="grid gap-5 sm:grid-cols-2 h-full items-center justify-items-center">
          {/* Left Card - Flips between Profile and Projects */}
          <div
            className={`card-flip-container relative h-[420px] sm:h-[460px] w-full ${isAnimating ? "flipping" : ""
              }`}
          >
            <div
              className={`card-flip-inner relative w-full h-full transition-transform duration-600 ${isFlipped ? "rotate-y-180" : ""
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
              <div className="card-flip-back absolute inset-0 rounded-lg bg-card border border-token p-5 overflow-hidden shimmer-card">
                {/* Minimalist geometric accents */}
                <div className="about-constellation" aria-hidden="true">
                  <div className="geometric-line geometric-line--lg"></div>
                  <div className="geometric-line geometric-line--md"></div>
                  <div className="geometric-line geometric-line--sm"></div>
                  <span className="orb orb-a"></span>
                  <span className="orb orb-b"></span>
                  <span className="orb orb-c"></span>
                </div>

                <div className="h-full flex flex-col gap-4 justify-center">
                  <h2 className="text-center text-base sm:text-lg font-bold tracking-tight brand-gradient">
                    Projects
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-1 items-start">
                    {sortedProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <ProjectCard project={project} isCompact={true} />
                      </div>
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
            className={`card-flip-container relative h-[420px] sm:h-[460px] w-full ${isAnimating ? "flipping" : ""
              }`}
          >
            <div
              className={`card-flip-inner relative w-full h-full transition-transform duration-600 ${isFlipped ? "rotate-y-180" : ""
                }`}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Front Side - About Me */}
              <div className="card-flip-front absolute inset-0 rounded-lg bg-card border border-token p-0 overflow-hidden">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center h-full">
                      <div className="text-muted">Loading...</div>
                    </div>
                  }
                >
                  <AboutMe
                    expIndex={expIndex}
                    onExpIndexChange={handleExpIndexChange}
                    techGroup={techGroup}
                    onTechGroupChange={goToTechGroup}
                  />
                </Suspense>
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
