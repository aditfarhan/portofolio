/**
 * Flip Animation Hook
 * 
 * Manages flip animation state for card flipping transitions.
 * Provides animation state management with proper cleanup.
 * 
 * @module hooks/useFlipAnimation
 */

"use client";

import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Return type for useFlipAnimation hook
 */
interface UseFlipAnimationReturn {
  /** Whether the card is currently flipped */
  isFlipped: boolean;
  /** Whether an animation is currently in progress */
  isAnimating: boolean;
  /** Function to toggle the flip state */
  toggleFlip: () => void;
}

/**
 * Custom hook for managing flip animation state
 * 
 * Handles the flip state and animation timing for card flipping effects.
 * Includes proper cleanup to prevent memory leaks.
 * 
 * @param animationDuration - Duration of flip animation in milliseconds (default: 600)
 * @returns Object containing flip state and controls
 * 
 * @example
 * ```tsx
 * function MyCard() {
 *   const { isFlipped, isAnimating, toggleFlip } = useFlipAnimation();
 *   
 *   return (
 *     <div 
 *       onClick={toggleFlip}
 *       className={isFlipped ? 'flipped' : ''}
 *     >
 *       {isAnimating ? 'Animating...' : 'Click to flip'}
 *     </div>
 *   );
 * }
 * ```
 */
export function useFlipAnimation(
  animationDuration = 600
): UseFlipAnimationReturn {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Toggle the flip state
   * Prevents multiple flips while animation is in progress
   */
  const toggleFlip = useCallback(() => {
    // Prevent toggling while an animation is in progress
    if (isAnimating) return;

    setIsAnimating(true);
    setIsFlipped((prev) => !prev);

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to reset animation state
    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  }, [isAnimating, animationDuration]);

  /**
   * Cleanup timeout on unmount
   * Prevents memory leaks and state updates on unmounted component
   */
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    isFlipped,
    isAnimating,
    toggleFlip,
  };
}

