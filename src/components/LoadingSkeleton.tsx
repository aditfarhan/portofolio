/**
 * LoadingSkeleton — matches the actual two-card HomeDeck layout.
 * Shown by Next.js Suspense while the page hydrates.
 * Stacks vertically on mobile to match the real layout.
 */
export default function LoadingSkeleton() {
  return (
    <div
      className="h-[100dvh] w-full flex items-center justify-center bg-background p-4"
      aria-busy="true"
      aria-label="Loading portfolio"
    >
      <div className="w-full max-w-[900px] h-[calc(100dvh-2rem)] flex flex-col sm:flex-row gap-3 sm:gap-4">

        {/* ── LEFT / TOP CARD — ProfileCard shape ─── */}
        <div className="sm:flex-[0_0_45%] h-[44dvh] sm:h-auto rounded-2xl border border-border-1 bg-surface-1 overflow-hidden animate-pulse">
          <div className="h-full flex flex-col items-center justify-center gap-4 p-6">
            <div className="w-12 h-12 rounded-full bg-surface-hover" />
            <div className="h-4 w-32 rounded bg-surface-hover" />
            <div className="h-3 w-24 rounded bg-surface-2" />
            <div className="flex gap-4 mt-1">
              {[40, 32, 36].map((w, i) => (
                <div key={i} className="h-3 rounded bg-surface-2" style={{ width: w }} />
              ))}
            </div>
            <div className="flex gap-2 mt-2">
              {[32, 32, 32, 32].map((s, i) => (
                <div key={i} className="rounded-full bg-surface-2" style={{ width: s, height: s }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT / BOTTOM CARD — AboutMe shape ─── */}
        <div
          className="flex-1 min-h-[44dvh] sm:min-h-0 rounded-2xl border border-border-1 bg-surface-1 overflow-hidden animate-pulse"
          style={{ animationDelay: "var(--duration-instant)" }}
        >
          <div className="h-full flex flex-col gap-4 p-6">
            {/* Thesis line */}
            <div className="h-4 w-3/4 rounded bg-surface-hover" />
            {/* Stats row */}
            <div className="flex gap-6">
              {[3, 3, 3].map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="h-5 w-8 rounded bg-surface-hover" />
                  <div className="h-2 w-10 rounded bg-surface-1" />
                </div>
              ))}
            </div>
            {/* Divider */}
            <div className="h-px w-full bg-surface-2" />
            {/* Principles grid */}
            <div className="grid grid-cols-4 gap-1.5">
              <div className="col-span-4 h-14 rounded-lg bg-surface-2" />
              <div className="col-span-2 h-12 rounded-lg bg-surface-1" />
              <div className="col-span-2 h-12 rounded-lg bg-surface-1" />
            </div>
            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {[48, 56, 60, 44, 52, 48, 36, 50].map((w, i) => (
                <div key={i} className="h-5 rounded bg-surface-1" style={{ width: w }} />
              ))}
            </div>
            {/* CTA */}
            <div className="mt-auto h-8 w-36 rounded-md bg-surface-2" />
          </div>
        </div>

      </div>
    </div>
  );
}
