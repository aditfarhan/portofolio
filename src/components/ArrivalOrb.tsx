"use client";

import { useEffect, useState, useRef } from "react";

/**
 * ArrivalOrb — first-visit ignition cue.
 *
 * Plays once per browser session (sessionStorage key "maf-visited").
 * On repeat visits within the same session, skips straight to onAnimationComplete.
 * Respects prefers-reduced-motion: fires completion immediately when reduced.
 *
 * Animation sequence (2 s):
 *   0–300 ms  fade in softly
 *   300–700 ms  energy pulse / expand
 *   700–2000 ms dissolve / fade out
 */
interface ArrivalOrbProps {
  onAnimationComplete?: () => void;
}

const SESSION_KEY = "maf-visited";

export default function ArrivalOrb({ onAnimationComplete }: ArrivalOrbProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const onCompleteRef = useRef(onAnimationComplete);
  // Sync ref after every render so the effect always calls the latest callback
  useEffect(() => { onCompleteRef.current = onAnimationComplete; });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isFirstVisit = !sessionStorage.getItem(SESSION_KEY);

    if (!prefersReducedMotion && isFirstVisit) {
      // Mark as visited so subsequent navigations skip the animation
      sessionStorage.setItem(SESSION_KEY, "1");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldAnimate(true);

      const timer = setTimeout(() => {
        onCompleteRef.current?.();
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      // Repeat visit or reduced motion — skip animation, show cards immediately
      onCompleteRef.current?.();
      return undefined;
    }
  }, []);

  if (!shouldAnimate) return null;

  return (
    <div className="arrival-orb-container" aria-hidden="true">
      <div className="arrival-orb" />
    </div>
  );
}
