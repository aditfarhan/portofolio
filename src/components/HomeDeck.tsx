"use client";

import { memo, useMemo, useState, lazy, Suspense, useEffect, useRef } from "react";
import { portfolio } from "@/data/portfolio";
import { ProfileCard, AboutMe } from "@/components";
import { useFlipAnimation } from "@/hooks";
import ProjectsViewer, { type FilterOption } from "@/components/ProjectCard";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const BackgroundEffects = lazy(() =>
  import("@/components").then((m) => ({ default: m.BackgroundEffects }))
);

const HomeDeck = memo(function HomeDeck() {
  const { isFlipped, isAnimating, toggleFlip } = useFlipAnimation();

  const sortedProjects = useMemo(() => {
    return [...portfolio.projects].sort((a, b) => {
      // Featured projects always appear first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then sort by most recent start date
      const aDate = a.period?.start ? new Date(a.period.start).getTime() : 0;
      const bDate = b.period?.start ? new Date(b.period.start).getTime() : 0;
      return bDate - aDate;
    });
  }, []);

  const [showCards, setShowCards] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const projectsContentRef = useRef<HTMLDivElement | null>(null);

  // Panel transition state:
  //   showProjects — which content is currently MOUNTED
  //   panelExiting — true while exit animation plays (220ms)
  //   panelKey — increments on each switch to re-trigger the enter animation
  const [showProjects, setShowProjects] = useState(false);
  const [panelExiting, setPanelExiting] = useState(false);
  const [panelKey, setPanelKey] = useState(0);

  // Resolve prefers-reduced-motion on the client only — avoids SSR/hydration mismatch.
  // If reduced motion is set, skip the arrival delay and show cards immediately.
  // Fallback timeout (1200ms) matches the orb animation duration; the orb's
  // onArrivalComplete callback fires first and wins in practice.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Immediately show cards — no animation delay needed when motion is reduced
      const t = setTimeout(() => setShowCards(true), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowCards(true), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (isFlipped && !isAnimating) {
      const t = setTimeout(() => projectsContentRef.current?.focus(), 400);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [isFlipped, isAnimating]);

  // Coordinate smooth exit → switch → enter transition.
  // isFlipped changes immediately; showProjects lags by 220ms (exit animation).
  useEffect(() => {
    if (isFlipped === showProjects) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPanelExiting(true);
    const t = setTimeout(() => {
      setShowProjects(isFlipped);
      setPanelExiting(false);
      setPanelKey((k) => k + 1); // re-mount panel div → re-triggers enter animation
    }, 220);
    return () => clearTimeout(t);
  }, [isFlipped, showProjects]);

  const leftCardStyle = {
    opacity: showCards ? 1 : 0,
    transform: showCards ? "translateY(0)" : "translateY(12px)",
    transition: "opacity var(--duration-scene) ease, transform var(--duration-scene) ease",
  };

  const rightCardStyle = {
    opacity: showCards ? 1 : 0,
    transform: showCards ? "translateY(0)" : "translateY(12px)",
    transition: "opacity var(--duration-scene) ease, transform var(--duration-scene) ease",
    transitionDelay: showCards ? "var(--duration-base)" : "0ms",
  };

  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 pointer-events-none" />}>
        <BackgroundEffects
          onArrivalComplete={() => setShowCards(true)}
          isFlipped={isFlipped}
        />
      </Suspense>

      {/* Fixed viewport height: both cards always fill exactly 100dvh.
          No page scroll, no internal scroll — content is designed to fit. */}
      <section
        className="mx-auto max-w-5xl px-4 py-3 h-[100dvh] overflow-hidden"
        aria-label="Portfolio"
      >
        <div className={`home-deck-grid ${isFlipped ? "projects-focused" : ""}`}>

          {/* LEFT CARD — ProfileCard (full) or sidebar (when flipped) */}
          <div className="home-card home-card--profile" style={leftCardStyle}>
            <div className="rounded-lg bg-card border border-token h-full overflow-hidden">
              <ProfileCard
                size="large"
                onToggleFlip={toggleFlip}
                isFlipped={isFlipped}
                isAnimating={isAnimating}
              />
            </div>
          </div>

          {/* RIGHT CARD — AboutMe or ProjectsViewer.
              panelExiting: plays exit animation on current content.
              panelKey increment: re-mounts div, re-triggers enter animation on new content. */}
          <div className="home-card home-card--about" style={rightCardStyle}>
            <div className="rounded-lg bg-card border border-token h-full overflow-hidden">
              <div
                key={panelKey}
                className={`h-full ${panelExiting ? "card-panel-exit" : "card-panel-enter"}`}
              >
                {showProjects ? (
                  <ErrorBoundary>
                    <div className="p-5 h-full">
                      <ProjectsViewer
                        projects={sortedProjects}
                        onClose={toggleFlip}
                        isActive={isFlipped}
                        contentRef={projectsContentRef}
                        activeFilter={activeFilter}
                        onFilterChange={setActiveFilter}
                      />
                    </div>
                  </ErrorBoundary>
                ) : (
                  <AboutMe onToggleFlip={toggleFlip} isAnimating={isAnimating} />
                )}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
});

export default HomeDeck;
