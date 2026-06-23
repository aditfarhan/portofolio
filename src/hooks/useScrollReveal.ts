"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires `visible = true` the first time the element enters the viewport.
 * Disconnects the observer after first trigger — no re-animations on scroll back up.
 * Respects `prefers-reduced-motion` by skipping the delay and making everything visible immediately.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
