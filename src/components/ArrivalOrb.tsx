"use client";

import { useEffect, useState } from "react";

/**
 * ArrivalOrb - First-visit arrival cue that provides a subtle ignition effect
 * 
 * Displays a small glowing orb that ignites once when the user first visits.
 * Respects reduced motion preferences and uses sessionStorage for persistence.
 * 
 * Animation sequence:
 * 1. Fade in softly (0-300ms)
 * 2. Brief expand/energy pulse (300-700ms)
 * 3. Dissolve/fade out (700-2000ms)
 * 
 * Mounted above cards but below UI interactions (pointer-events: none).
 */
export default function ArrivalOrb() {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        // Check if this is the first visit
        const hasSeenArrival = sessionStorage.getItem("arrival-orb-seen");

        if (!hasSeenArrival) {
            // Check reduced motion preference
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            if (!prefersReducedMotion) {
                // Set flag and trigger animation
                sessionStorage.setItem("arrival-orb-seen", "true");
                setShouldAnimate(true);
            } else {
                // Mark as seen even for reduced motion users
                sessionStorage.setItem("arrival-orb-seen", "true");
            }
        }
    }, []);

    // Don't render anything if not first visit or animation complete
    if (!shouldAnimate) {
        return null;
    }

    return (
        <div
            className="arrival-orb-container"
            aria-hidden="true"
        >
            <div className="arrival-orb" />
        </div>
    );
}
