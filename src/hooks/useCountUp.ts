import { useEffect, useRef, useState } from "react";

/**
 * useCountUp
 *
 * Animates an array of numeric values from 0 to their targets
 * using a single shared requestAnimationFrame loop.
 *
 * - Respects `prefers-reduced-motion`: instantly sets final values if reduced.
 * - Re-runs every time `trigger` changes from false → true.
 *
 * @param targets  Array of target numbers
 * @param duration Animation duration in ms (default 900)
 * @param trigger  Set to true to start/restart the animation
 */
export function useCountUp(
    targets: number[],
    duration = 900,
    trigger = false
): number[] {
    const [counts, setCounts] = useState<number[]>(targets.map(() => 0));
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (!trigger) return;

        // Honour reduced-motion preference
        const prefersReduced =
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
            setCounts([...targets]);
            return;
        }

        let start: number | null = null;

        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setCounts(targets.map((t) => Math.round(eased * t)));
            if (progress < 1) {
                rafRef.current = requestAnimationFrame(step);
            }
        };

        rafRef.current = requestAnimationFrame(step);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
        // `targets` is intentionally excluded: it's a stable module-level constant
        // (PROFILE_STATS never changes at runtime). Including it would restart the
        // animation on every reference change, not just when values actually differ.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trigger, duration]);

    return counts;
}
