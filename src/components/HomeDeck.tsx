"use client";

import { memo, useMemo, lazy, Suspense } from "react";
import { portfolio } from "@/data/portfolio";
import { ProfileCard, BackgroundEffects, AboutMe } from "@/components";
import { useFlipAnimation } from "@/hooks";
import ProjectsViewer from "@/components/ProjectCard";

const HomeDeck = memo(function HomeDeck() {
  const { isFlipped, isAnimating, toggleFlip } = useFlipAnimation();

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

      <section className="mx-auto max-w-5xl px-4 py-3 h-[100dvh] overflow-hidden">
        <div className={`home-deck-grid ${isFlipped ? "projects-focused" : ""}`}>

          {/* LEFT CARD */}
          <div className="home-card home-card--profile">
            <div className={`card-flip-inner ${isFlipped ? "rotate-y-180" : ""}`}>

              {/* PROFILE */}
              <div className="card-flip-front rounded-lg bg-card border border-token p-5">
                <ProfileCard
                  size="large"
                  onToggleFlip={toggleFlip}
                  isFlipped={isFlipped}
                  isAnimating={isAnimating}
                />
              </div>

              {/* PROJECTS */}
              <div className="card-flip-back rounded-lg bg-card border border-token p-5">
                <ProjectsViewer
                  projects={sortedProjects}
                  onClose={toggleFlip}
                />
              </div>

            </div>
          </div>

          {/* RIGHT CARD */}
          <div className={`home-card home-card--about ${isFlipped ? "collapsed" : ""}`}>
            <div className={`card-flip-inner ${isFlipped ? "rotate-y-180" : ""}`}>

              <div className="card-flip-front rounded-lg bg-card border border-token overflow-hidden">
                <Suspense fallback={<div className="h-full flex items-center justify-center text-muted">Loading…</div>}>
                  <AboutMe onToggleFlip={toggleFlip} isAnimating={isAnimating} />
                </Suspense>
              </div>

              <div className="card-flip-back rounded-lg bg-card border border-token p-5">
                <ProfileCard
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
