"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import "@/styles/profile-card.css";

interface ProfileCardProps {
  showActionButton?: boolean;
  size?: "large" | "small";
  onToggleFlip?: () => void;
  isFlipped?: boolean;
  isAnimating?: boolean;
}

const ProfileCard = memo(function ProfileCard({
  showActionButton = true,
  size = "large",
  onToggleFlip,
  isFlipped = false,
  isAnimating = false,
}: ProfileCardProps) {
  const isLarge = size === "large";
  const [mounted, setMounted] = useState(false);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleToggleFlip = useCallback(() => {
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
    <div
      ref={shineRef}
      onMouseMove={handleShine}
      className="profile-card shine-card group relative h-full flex items-center justify-center"
      role="region"
      aria-label="Profile"
    >
      {/* Decorative sparkles */}
      <div className="jewel-sparkle opacity-20" />
      <div className="jewel-sparkle opacity-10" />

      {/* ── SUBTLE LEFT READING-FLOW ANCHOR ─────────────────────
          A vertical connector gives the eye a rail to follow:
          Mark → Name → Impact → Context → CTA (top-to-bottom)
      ─────────────────────────────────────────────────────────── */}
      <div
        className="
          absolute left-4 top-[18%] bottom-[18%]
          w-px
          bg-gradient-to-b from-transparent via-white/10 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-700
          pointer-events-none
        "
        aria-hidden="true"
      />

      <div
        className={`
          flex flex-col items-center text-center
          ${isLarge ? "gap-4 py-4 px-4" : "gap-2 py-3 px-3"}
        `}
      >
        {/* ── LAYER 1: MAF MARK ─────────────────────────────────── */}
        <div
          title="Muhammad Aditia Farhan"
          className={`
            maf-logo shine-card
            inline-flex items-center justify-center rounded-full
            border border-white/20 bg-card/60 text-white font-semibold
            transition-all duration-500 hover:scale-[1.06] cursor-default
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
            ${isLarge
              ? "w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 text-xs md:text-sm"
              : "w-7 h-7 md:w-8 md:h-8 text-[10px] md:text-xs"
            }
          `}
          aria-label="Muhammad Aditia Farhan — MAF"
        >
          MAF
        </div>

        {/* ── LAYER 2: IDENTITY ─────────────────────────────────── */}
        <div
          className={`
            space-y-0.5
            transition-all duration-500 delay-75
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          <h1
            className={`
              font-extrabold tracking-tight
              ${isLarge ? "text-lg md:text-xl lg:text-3xl" : "text-base md:text-lg"}
              group-hover:-translate-y-[1px] transition-transform duration-300
            `}
            style={{ letterSpacing: "-0.015em" }}
          >
            Muhammad Aditia Farhan
          </h1>

          <p className={`
            text-white/75 transition-colors duration-300
            ${isLarge
              ? "text-xs md:text-sm lg:text-base leading-snug"
              : "text-[11px] md:text-xs leading-snug"
            }
            group-hover:text-white/90
          `}>
            Software Engineer
          </p>

          {/* Priming: company badge below title */}
          <p className="text-[9px] md:text-[10px] text-white/32 group-hover:text-white/50 transition-colors duration-300 tracking-wider uppercase mt-0.5">
            Pertamina IHC&nbsp;·&nbsp;Orami
          </p>
        </div>

        {/* ── LAYER 3: IMPACT — serial position fix ─────────────── */}
        <div
          className={`
            max-w-md flex flex-col items-center gap-0.5
            transition-all duration-500 delay-100
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          {/* Primary hook — always visible */}
          <p className={`
            text-white/42 group-hover:text-white/65 transition-colors duration-500
            ${isLarge
              ? "text-[11px] md:text-xs lg:text-sm leading-relaxed"
              : "text-[10px] md:text-[11px] leading-relaxed"
            }
          `}>
            Lead engineer, 12+ hospitals. 5+ years at enterprise scale.
          </p>

          {/* Secondary line — hidden on mobile, dimmed on desktop */}
          <p className={`
            hidden sm:block
            text-white/24 group-hover:text-white/42 transition-colors duration-500
            ${isLarge ? "text-[10px] md:text-[11px]" : "text-[9px]"}
          `}>
            Full-stack · Healthcare · Logistics · E-commerce · Telecom
          </p>
        </div>

        {/* ── LAYER 4: CONTEXT ──────────────────────────────────── */}
        <div
          className={`
            flex flex-col items-center gap-0.5
            transition-all duration-500 delay-150
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
        >
          {/* On mobile: context hidden since it's in the impact above */}
          <p className="
            text-[9px] md:text-[10px]
            text-white/22 group-hover:text-white/38
            transition-colors duration-300
          ">
            Jakarta, Indonesia&nbsp;·&nbsp;Open to remote &amp; hybrid
          </p>
        </div>

        {/* ── LAYER 5: ACTIONS — always clear ───────────────────── */}
        {showActionButton && (
          <div
            className={`
              mt-1 flex justify-center
              transition-all duration-500 delay-200
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            <div className="action-group inline-flex items-center overflow-hidden">
              {/* PRIMARY CTA */}
              <button
                onClick={handleToggleFlip}
                disabled={isAnimating}
                aria-pressed={isFlipped}
                className={`
                  action-cta underline-react
                  transition-all duration-300
                  ${isAnimating
                    ? "opacity-50 animate-pulse cursor-not-allowed"
                    : "hover:opacity-90 hover:translate-x-[1px] active:scale-95 active:opacity-80"
                  }
                `}
              >
                {isFlipped ? "← About Me" : "Explore Projects"}
              </button>

              <span aria-hidden="true" className="action-divider" />

              {/* UTILITY CTAs with tooltip labels */}
              {[
                { href: "mailto:aditiafarhan25@gmail.com", icon: "icon-mail", label: "Email", tooltip: "Email" },
                { href: "/ATS CV 2025 3.0 - Muhammad Aditia Farhan.pdf", icon: "icon-download", label: "Download CV", tooltip: "CV", download: true },
                { href: "https://www.linkedin.com/in/muhammad-aditia-farhan", icon: "icon-linkedin", label: "LinkedIn", tooltip: "LinkedIn", external: true },
              ].map(({ href, icon, label, tooltip, download, external }) => (
                <a
                  key={label}
                  href={href}
                  download={download}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  data-tooltip={tooltip}
                  className="
                    action-icon action-icon--tooltip
                    transition-all duration-200
                    hover:scale-[1.08] hover:bg-white/10
                    active:scale-95 active:opacity-75
                  "
                  aria-label={label}
                >
                  <svg className="w-5 h-5" aria-hidden="true">
                    <use href={`/icons.svg#${icon}`} />
                  </svg>
                  {/* Visible label on mobile (no hover on touch) */}
                  <span className="action-icon-label sm:hidden" aria-hidden="true">
                    {tooltip}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ProfileCard;
