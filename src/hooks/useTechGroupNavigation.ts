"use client";

import { useState, useCallback } from "react";
import { TECH_GROUPS, type TechGroup } from "@/lib/constants";

interface UseTechGroupNavigationReturn {
  techGroup: TechGroup;
  goToNextTechGroup: () => void;
  goToPrevTechGroup: () => void;
  goToTechGroup: (group: TechGroup) => void;
  totalTechGroups: number;
}

export function useTechGroupNavigation(): UseTechGroupNavigationReturn {
  const [techGroup, setTechGroup] = useState<TechGroup>("Build");
  const totalTechGroups = TECH_GROUPS.length;

  const goToNextTechGroup = useCallback(() => {
    setTechGroup((prev) => {
      const currentIndex = TECH_GROUPS.indexOf(prev);
      const nextIndex = (currentIndex + 1) % totalTechGroups;
      return TECH_GROUPS[nextIndex];
    });
  }, [totalTechGroups]);

  const goToPrevTechGroup = useCallback(() => {
    setTechGroup((prev) => {
      const currentIndex = TECH_GROUPS.indexOf(prev);
      const prevIndex = (currentIndex - 1 + totalTechGroups) % totalTechGroups;
      return TECH_GROUPS[prevIndex];
    });
  }, [totalTechGroups]);

  const goToTechGroup = useCallback((group: TechGroup) => {
    setTechGroup(group);
  }, []);

  return {
    techGroup,
    goToNextTechGroup,
    goToPrevTechGroup,
    goToTechGroup,
    totalTechGroups,
  };
}
