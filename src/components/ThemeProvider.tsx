"use client";

import type { ReactNode } from "react";

/**
 * ThemeProvider
 *
 * Applies the "masculine" dark theme via a data-theme attribute on the root.
 * Previously used `next-themes` but that dependency was removed since there
 * is only one fixed theme and no toggle UI.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <div data-theme="masculine" className="h-full contents">
      {children}
    </div>
  );
}
