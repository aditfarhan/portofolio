"use client";

import { memo, useMemo, useEffect, useState, lazy, Suspense } from "react";
import { portfolio } from "@/data/portfolio";
import { ProfileCard, AboutMe } from "@/components";
import { useFlipAnimation } from "@/hooks";
import ProjectsViewer from "@/components/ProjectCard";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy-load background effects — pure decoration, defer until after TTI
const BackgroundEffects = lazy(() =>
  import("@/components").then((m) => ({ default: m.BackgroundEffects }))
);

const HomeDeck = memo(function HomeDeck() {
  const { isFlipped, isAnimating, toggleFlip } = useFlipAnimation();

  const sortedProjects = useMemo(() => {
    return [...portfolio.projects].sort((a, b) => {
      const aDate = a.period?.start ? new Date(a.period.start).getTime() : 0;
      const bDate = b.period?.start ? new Date(b.period.start).getTime() : 0;
      return bDate - aDate;
    });
  }, []);

  const [showCards, setShowCards] = useState(false);

  // ── Arrival: delay card reveal by 1.5s after moon fade-in ──────────
  // Using useEffect for cleanup so setState never fires on unmounted tree
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    function handleArrivalComplete() {
      timeoutId = setTimeout(() => setShowCards(true), 1500);
    }

    // Store callback ref on window so BackgroundEffects can call it
    (window as Window & { __onArrivalComplete?: () => void }).__onArrivalComplete =
      handleArrivalComplete;

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      delete (window as Window & { __onArrivalComplete?: () => void }).__onArrivalComplete;
    };
  }, []);

  // Card entrance styles — left card primary (0ms), right card secondary (200ms)
  const leftCardStyle = {
    transition: "opacity 700ms ease, transform 700ms ease",
    opacity: showCards ? 1 : 0,
    transform: showCards ? "translateY(0)" : "translateY(12px)",
    transitionDelay: "0ms",
  };

  const rightCardStyle = {
    transition: "opacity 700ms ease, transform 700ms ease",
    opacity: showCards ? 1 : 0,
    transform: showCards ? "translateY(0)" : "translateY(12px)",
    transitionDelay: showCards ? "200ms" : "0ms",
  };

  return (
    <>
      {/* Background — lazy-loaded, non-blocking */}
      <Suspense fallback={null}>
        <BackgroundEffects
          onArrivalComplete={() => setShowCards(true)}
          isFlipped={isFlipped}
        />
      </Suspense>

      <section className={`mx-auto max-w-5xl px-4 py-3 h-[100dvh] overflow-hidden`}>
        <div className={`home-deck-grid ${isFlipped ? "projects-focused" : ""}`}>

          {/* LEFT CARD — primary, arrives first */}
          <div className="home-card home-card--profile" style={leftCardStyle}>
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

              {/* PROJECTS — lazy mounted: only exists when card is flipped */}
              <div className="card-flip-back rounded-lg bg-card border border-token p-5">
                {isFlipped && (
                  <ErrorBoundary>
                    <ProjectsViewer
                      projects={sortedProjects}
                      onClose={toggleFlip}
                      isActive={isFlipped}
                    />
                  </ErrorBoundary>
                )}
              </div>

            </div>
          </div>

          {/* RIGHT CARD — secondary, arrives 200ms later */}
          <div
            className={`home-card home-card--about ${isFlipped ? "collapsed" : ""}`}
            style={rightCardStyle}
          >
            <div className={`card-flip-inner ${isFlipped ? "rotate-y-180" : ""}`}>

              {/* ABOUT — synchronous, no Suspense needed */}
              <div className="card-flip-front rounded-lg bg-card border border-token overflow-hidden">
                <AboutMe onToggleFlip={toggleFlip} isAnimating={isAnimating} />
              </div>

              {/* Back ProfileCard — lazy mounted: only exists when flipped */}
              <div className="card-flip-back rounded-lg bg-card border border-token p-5">
                {isFlipped && (
                  <ProfileCard
                    size="large"
                    onToggleFlip={toggleFlip}
                    isFlipped={isFlipped}
                    isAnimating={isAnimating}
                  />
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
