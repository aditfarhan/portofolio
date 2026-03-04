"use client";

import { useState, useCallback } from "react";
import { EXPERIENCE } from "@/lib/constants";

interface UseExperienceNavigationReturn {
  expIndex: number;
  goToPrevExp: () => void;
  goToNextExp: () => void;
  goToExp: (index: number) => void;
  totalExperiences: number;
}

export function useExperienceNavigation(): UseExperienceNavigationReturn {
  const [expIndex, setExpIndex] = useState(0);
  const totalExperiences = EXPERIENCE.length;

  const goToPrevExp = useCallback(() => {
    setExpIndex((prev) => (prev - 1 + totalExperiences) % totalExperiences);
  }, [totalExperiences]);

  const goToNextExp = useCallback(() => {
    setExpIndex((prev) => (prev + 1) % totalExperiences);
  }, [totalExperiences]);

  const goToExp = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalExperiences) {
        setExpIndex(index);
      }
    },
    [totalExperiences]
  );

  return {
    expIndex,
    goToPrevExp,
    goToNextExp,
    goToExp,
    totalExperiences,
  };
}
