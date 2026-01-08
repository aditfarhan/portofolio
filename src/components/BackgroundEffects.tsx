"use client";

import { useState, useEffect } from "react";

/**
 * BackgroundEffects - Organized background animations and effects
 * Contains: Star field, meteors, meteor bursts, moon, and arrival orb
 */
import {
  STAR_POSITIONS,
  METEOR_CONFIGS,
  METEOR_BURST_CONFIGS,
} from "@/lib/constants";

export default function BackgroundEffects() {
  return (
    <>
      {/* Realistic Night Sky Background */}
      <div className="night-sky" aria-hidden="true"></div>

      {/* Enhanced Star Field - Positioned for Realistic Night Sky */}
      <div className="star-field" aria-hidden="true">
        {STAR_POSITIONS.small.map((position, index) => (
          <div
            key={`small-${index}`}
            className="star small"
            style={{ top: position.top, left: position.left }}
          />
        ))}
        {STAR_POSITIONS.medium.map((position, index) => (
          <div
            key={`medium-${index}`}
            className="star medium"
            style={{ top: position.top, left: position.left }}
          />
        ))}
        {STAR_POSITIONS.large.map((position, index) => (
          <div
            key={`large-${index}`}
            className="star large"
            style={{ top: position.top, left: position.left }}
          />
        ))}
      </div>

      {/* Arrival Orb - First-visit ignition cue */}
      {/* Mounted above background, below cards - synced with meteor timing */}
      <div className="arrival-orb-wrapper" aria-hidden="true">
        {/* Lazy import ArrivalOrb to avoid SSR issues with sessionStorage */}
        <LazyArrivalOrb />
      </div>

      {/* Realistic Meteors - Trajectories Aligned with Night Sky */}
      <div className="meteor-container" aria-hidden="true">
        {METEOR_CONFIGS.map((config, index) => (
          <div
            key={`meteor-${index}`}
            className="meteor ball-shaped meteor-realistic-1"
            style={config.style}
          />
        ))}
      </div>

      {/* Meteor Shower Bursts - Positioned Away from Moon */}
      <div className="meteor-shower-burst" aria-hidden="true">
        {METEOR_BURST_CONFIGS.map((config, index) => (
          <div
            key={`meteor-burst-${index}`}
            className="meteor-burst"
            style={config.style}
          />
        ))}
      </div>

      {/* Realistic Moon with Atmospheric Effects */}
      <div className="moon realistic" aria-hidden="true">
        <div className="crater-large"></div>
        <div className="crater-small"></div>
      </div>
    </>
  );
}

/**
 * Lazy-loaded ArrivalOrb wrapper to handle sessionStorage access
 * Only runs on client-side to avoid SSR hydration mismatches
 */
function LazyArrivalOrb() {
  const [ArrivalOrb, setArrivalOrb] = useState<React.ComponentType<{}> | null>(null);

  useEffect(() => {
    // Dynamically import ArrivalOrb to avoid SSR issues
    import("./ArrivalOrb").then((module) => {
      setArrivalOrb(() => module.default);
    });
  }, []);

  if (!ArrivalOrb) {
    return null;
  }

  return <ArrivalOrb />;
}
