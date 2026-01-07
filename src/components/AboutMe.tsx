"use client";

import { memo, useCallback, useEffect, useState } from "react";
import "@/styles/profile-card.css";

interface AboutMeProps {
  onToggleFlip?: () => void;
  isAnimating?: boolean;
}

const AboutMe = memo(function AboutMe({
  onToggleFlip,
  isAnimating = false,
}: AboutMeProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const handleExplore = useCallback(() => {
    if (isAnimating || !onToggleFlip) return;
    onToggleFlip();
  }, [isAnimating, onToggleFlip]);

  function handleShine(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  return (
    <section className="interactive-card relative h-full flex items-center justify-center px-6 py-6">
      <div className="w-full max-w-[56ch]">

        {/* ======================
            LABEL — MICRO AUTHORITY
        ======================= */}
        <h2
          className={`
            text-xs uppercase tracking-[0.22em] text-white/35 mb-5
            transition-all duration-500
            ${mounted ? "opacity-100" : "opacity-0"}
            hover:text-white/55 hover:tracking-[0.18em]
          `}
        >
          About
        </h2>

        {/* ======================
            THESIS — PRIMARY SIGNAL
        ======================= */}
        <p
          className={`
            group relative text-lg sm:text-xl font-semibold leading-snug
            text-white transition-all duration-500
            ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
            hover:tracking-tight hover:-translate-y-[1px]
          `}
        >
          Build software with long-term clarity & intent.
          {/* underline reveal */}
          <span
            aria-hidden
            className="
              absolute left-0 -bottom-1 h-px w-full
              bg-white/30 scale-x-0 origin-left
              transition-transform duration-500
              group-hover:scale-x-100
            "
          />
        </p>

        {/* ======================
            SUPPORTING CONTEXT
        ======================= */}
        <p
          className={`
            mt-2 text-sm max-w-[46ch]
            text-white/50 transition-all duration-500 delay-100
            ${mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
            hover:text-white/65
          `}
        >
          Especially in environments where systems scale <br /> — and mistakes compound.
        </p>

        {/* ======================
              AMBIENT DIVIDER (WIDER)
          ====================== */}
        <div
          className={`
              mt-4 h-px
              w-[65%]
              bg-gradient-to-r
              from-white/40 via-white/20 to-transparent
              transition-all duration-700 origin-left
              ${mounted ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
              group-hover:opacity-90
            `}
        />

        {/* ======================
                PRINCIPLES GRID
            ====================== */}
        <div className="mt-6 grid grid-cols-4 gap-3">

          {/* ======================
                  ANCHOR — EXPLICIT TRADE-OFFS
            ====================== */}
          <div
            onMouseMove={handleShine}
            className="
                  group shine-card col-span-4 relative
                  rounded-2xl border border-white/25
                  bg-white/[0.07]
                  px-4 py-4
                  transition-all duration-500 ease-out
                  hover:-translate-y-[2px]
                  hover:shadow-[0_36px_100px_rgba(0,0,0,0.6)]
                "
          >
            <p
              className="
                    relative font-medium text-white/90
                    transition-transform duration-500
                    group-hover:-translate-y-[2px]
                  "
            >
              Explicit trade-offs
            </p>

            <p
              className="
                    relative mt-1 text-[12px] text-white/55
                    transition-all duration-500 delay-75
                    group-hover:text-white/75
                    group-hover:-translate-y-[1px]
                  "
            >
              Decisions are explicit, intentional, and shared across the team.
            </p>
          </div>

          {/* ======================
                  SUPPORTING PRINCIPLES
              ====================== */}
          {[
            "Maintainable systems",
            "Calm execution",
            "Team-first engineering",
          ].map((item, idx) => (
            <div
              key={item}
              onMouseMove={handleShine}
              className={`
                    shine-card
                    ${idx === 2
                  ? "col-span-4 sm:col-span-2 sm:col-start-2"
                  : "col-span-2"
                }
                    relative rounded-xl border border-white/10
                    bg-white/[0.04]
                    px-3 py-3 text-sm text-white/60
                    transition-all duration-500 ease-out
                    hover:-translate-y-[2px]
                    hover:bg-white/[0.07]
                    hover:border-white/20
                    hover:text-white/85
                  `}
              style={{
                transitionDelay: `${idx * 40}ms`,
              }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* ======================
            CTA — DIRECTIONAL
        ======================= */}
        <button
          onClick={handleExplore}
          disabled={isAnimating}
          className={`
            group mt-8 inline-flex items-center gap-2
            text-xs text-white/50 transition-all duration-300
            hover:text-white
          `}
        >
          <span className="relative hover:cursor-pointer">
            View selected work
            <span
              className="
                absolute left-0 -bottom-0.5 h-px w-full
                bg-white/30 scale-x-0 origin-left
                transition-transform duration-500
                group-hover:scale-x-100
              "
            />
          </span>
          <span
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </button>

      </div>
    </section>
  );
});

export default AboutMe;
