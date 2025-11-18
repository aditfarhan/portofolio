"use client";

import { useState, useCallback, useRef } from "react";

interface UseFlipAnimationReturn {
  isFlipped: boolean;
  isAnimating: boolean;
  toggleFlip: () => void;
}

export function useFlipAnimation(
  animationDuration = 600
): UseFlipAnimationReturn {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleFlip = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsFlipped((prev) => !prev);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, animationDuration]);

  return {
    isFlipped,
    isAnimating,
    toggleFlip,
  };
}
