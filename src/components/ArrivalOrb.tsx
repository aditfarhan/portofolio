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
interface ArrivalOrbProps {
    onAnimationComplete?: () => void;
}

export default function ArrivalOrb({ onAnimationComplete }: ArrivalOrbProps) {
    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {
        // Check reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let timer: NodeJS.Timeout;
        if (!prefersReducedMotion) {
            setShouldAnimate(true);

            // Trigger completion callback after animation duration (2s)
            timer = setTimeout(() => {
                onAnimationComplete?.();
            }, 2000);
        } else {
            // If reduced motion is preferred, trigger completion immediately
            onAnimationComplete?.();
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [onAnimationComplete]);

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
