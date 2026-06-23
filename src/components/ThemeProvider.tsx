"use client";

import type { ReactNode } from "react";

/**
 * ThemeProvider
 *
 * Thin wrapper that sets the single fixed dark theme. The theme tokens are
 * defined on :root in themes.css. No toggle UI exists — one theme only.
 * The `data-theme` attribute was removed because no CSS selector used it.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
