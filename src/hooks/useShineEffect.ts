"use client";

import { useRef, useCallback } from "react";

/**
 * useShineEffect
 *
 * Provides a cursor-following radial shine effect on elements with
 * the `shine-card` CSS class. Uses rAF throttling to avoid layout thrash.
 *
 * @returns { shineRef, handleShine } — attach ref to the container,
 *          handleShine to onMouseMove.
 */
export function useShineEffect<T extends HTMLElement = HTMLDivElement>() {
    const shineRef = useRef<T>(null);
    const rafId = useRef<number | null>(null);

    const handleShine = useCallback((e: React.MouseEvent<T>) => {
        if (rafId.current !== null) return;
        const clientX = e.clientX;
        const clientY = e.clientY;
        rafId.current = requestAnimationFrame(() => {
            const el = shineRef.current ?? (e.currentTarget as T);
            if (el) {
                const rect = el.getBoundingClientRect();
                el.style.setProperty(
                    "--mx",
                    `${((clientX - rect.left) / rect.width) * 100}%`
                );
                el.style.setProperty(
                    "--my",
                    `${((clientY - rect.top) / rect.height) * 100}%`
                );
            }
            rafId.current = null;
        });
    }, []);

    return { shineRef, handleShine } as const;
}
