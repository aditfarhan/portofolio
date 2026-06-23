import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 – Page Not Found",
  description: "This page doesn't exist. Head back to the portfolio.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] bg-background px-6 text-center">
      {/* Subtle monogram */}
      <div
        className="w-12 h-12 rounded-full border border-border-1 bg-surface-1 flex items-center justify-center mb-6 font-semibold"
        style={{
          fontSize: "var(--fs-2xs)",
          letterSpacing: "var(--tracking-caps)",
          color: "rgba(255,255,255,var(--op-dim))",
        }}
        aria-hidden="true"
      >
        MAF
      </div>

      <p
        className="font-semibold uppercase mb-3"
        style={{
          fontSize: "var(--fs-2xs)",
          letterSpacing: "var(--tracking-caps)",
          color: "rgba(255,255,255,var(--op-dim))",
        }}
      >
        404
      </p>

      <h1
        className="text-xl sm:text-2xl font-bold leading-snug mb-2"
        style={{ color: "rgba(255,255,255,var(--op-primary))" }}
      >
        Page not found
      </h1>

      <p
        className="text-sm max-w-xs leading-relaxed mb-8"
        style={{ color: "rgba(255,255,255,var(--op-faint))" }}
      >
        This URL doesn&apos;t exist. The portfolio lives at the root.
      </p>

      <Link
        href="/"
        className="
          inline-flex items-center gap-2
          font-semibold
          border border-border-1 rounded px-4 py-2
          hover:border-border-2 hover:bg-surface-1
          active:scale-95
          transition-all duration-fast
          focus-visible:outline-2 focus-visible:outline-white/38 focus-visible:outline-offset-2
        "
        style={{
          fontSize: "var(--fs-xs)",
          color: "rgba(255,255,255,var(--op-subdued))",
        }}
      >
        ← Back to portfolio
      </Link>
    </div>
  );
}
