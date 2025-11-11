"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  // Ensure the unified theme is always applied
  useEffect(() => {
    if (theme !== "masculine") {
      setTheme("masculine");
    }
  }, [theme, setTheme]);

  // Decorative chip indicating the active style theme
  return (
    <span
      className="chip"
      aria-label="Theme: Masculine Professional"
      title="Theme: Masculine Professional"
    >
      █▬▬ Masculine
    </span>
  );
}
