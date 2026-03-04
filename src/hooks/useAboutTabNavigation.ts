"use client";

import { useState, useCallback } from "react";
import { ABOUT_TABS } from "@/lib/constants";
import type { AboutTab } from "@/types";

interface UseAboutTabNavigationReturn {
  aboutTab: AboutTab;
  goToNextTab: () => void;
  goToPrevTab: () => void;
  goToTab: (tab: AboutTab) => void;
  totalTabs: number;
}

export function useAboutTabNavigation(): UseAboutTabNavigationReturn {
  const [aboutTab, setAboutTab] = useState<AboutTab>("Background");
  const totalTabs = ABOUT_TABS.length;

  const goToNextTab = useCallback(() => {
    setAboutTab((prev) => {
      const currentIndex = ABOUT_TABS.indexOf(prev);
      const nextIndex = (currentIndex + 1) % totalTabs;
      return ABOUT_TABS[nextIndex];
    });
  }, [totalTabs]);

  const goToPrevTab = useCallback(() => {
    setAboutTab((prev) => {
      const currentIndex = ABOUT_TABS.indexOf(prev);
      const prevIndex = (currentIndex - 1 + totalTabs) % totalTabs;
      return ABOUT_TABS[prevIndex];
    });
  }, [totalTabs]);

  const goToTab = useCallback((tab: AboutTab) => {
    setAboutTab(tab);
  }, []);

  return {
    aboutTab,
    goToNextTab,
    goToPrevTab,
    goToTab,
    totalTabs,
  };
}
