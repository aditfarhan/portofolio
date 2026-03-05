"use client";

import { memo, useCallback, useEffect, useState } from "react";
import "@/styles/profile-card.css";
import { PROFILE_STATS } from "@/data/portfolio";
import { useShineEffect } from "@/hooks";

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
  const [isPressed, setIsPressed] = useState(false);
  const [copiedName, setCopiedName] = useState(false);
  const { shineRef, handleShine } = useShineEffect<HTMLDivElement>();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // isPressed cleanup — no setState on unmounted component
  useEffect(() => {
    if (!isPressed) return;
    const t = setTimeout(() => setIsPressed(false), 120);
    return () => clearTimeout(t);
  }, [isPressed]);

  const handleToggleFlip = useCallback(() => {
    if (isAnimating || !onToggleFlip) return;
    setIsPressed(true);
    onToggleFlip();
  }, [isAnimating, onToggleFlip]);

  // Copy full name to clipboard — MAF logo interaction
  const handleCopyName = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("Muhammad Aditia Farhan");
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 1800);
    } catch {
      // clipboard not available (e.g. Firefox without permission)
    }
  }, []);

  // Shine effect handled by useShineEffect hook

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

      {/* ── READING-FLOW ANCHOR — always faintly visible ──────────
          Dimly present on mount (opacity-25), brightens on hover.
          Gives the eye a downward rail: Mark → Name → Hook → CTA
      ─────────────────────────────────────────────────────────── */}
      <div
        className="
          absolute left-4 top-[18%] bottom-[12%]
          w-px
          bg-gradient-to-b from-transparent via-white/10 to-transparent
          opacity-25 group-hover:opacity-100
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
        {/* ── LAYER 1: MAF MARK — click copies full name ─────── */}
        <button
          type="button"
          title={copiedName ? "Copied!" : "Copy name"}
          onClick={handleCopyName}
          aria-label={copiedName ? "Copied! Muhammad Aditia Farhan" : "Copy name: Muhammad Aditia Farhan"}
          className={`
            maf-logo maf-logo--breathe shine-card
            inline-flex items-center justify-center rounded-full
            border border-white/20 bg-card/60 text-white font-semibold
            transition-all duration-500 hover:scale-[1.06] cursor-pointer
            focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2
            relative
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
            ${isLarge
              ? "w-8 h-8 md:w-9 md:h-9 lg:w-11 lg:h-11 text-xs md:text-sm"
              : "w-7 h-7 md:w-8 md:h-8 text-[10px] md:text-xs"
            }
          `}
        >
          MAF
          {/* "Copied!" tooltip */}
          {copiedName && (
            <span
              className="
                absolute -top-7 left-1/2 -translate-x-1/2
                bg-black/80 text-white/90 text-[9px]
                px-2 py-0.5 rounded whitespace-nowrap
                pointer-events-none animate-fade-in
              "
              aria-hidden="true"
            >
              Copied!
            </span>
          )}
        </button>

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

          <div className="flex items-center justify-center gap-2 flex-wrap">
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

            {/* Availability badge — contextual */}
            <span className="availability-badge" aria-label="Open to work opportunities">
              <span className="availability-dot" aria-hidden="true" />
              Open to Work
            </span>
          </div>

          {/* Company names — title-case with current role context */}
          <p className="text-[10px] md:text-[11px] text-white/50 group-hover:text-white/65 transition-colors duration-300 tracking-wide mt-0.5">
            Pertamina IHC (2024–now)&nbsp;·&nbsp;Orami
          </p>
        </div>

        {/* ── LAYER 3: IMPACT — stat row (numbers first) ────────── */}
        <div
          className={`
            flex flex-col items-center gap-1
            transition-all duration-500 delay-100
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          {/* Stat row — flex-wrap for ultra-small screens */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 justify-center text-white/55 group-hover:text-white/75 transition-colors duration-400">
            {PROFILE_STATS.map((stat, i) => (
              <span key={stat.label} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/20" aria-hidden="true">·</span>}
                <span className={`font-semibold ${isLarge ? "text-[11px] md:text-xs lg:text-sm" : "text-[10px]"}`}>
                  {stat.value}{stat.suffix}
                </span>
                <span className={isLarge ? "text-[10px] md:text-[11px]" : "text-[9px]"}>
                  {stat.label}
                </span>
              </span>
            ))}
          </div>

          {/* Achievement teaser — seeds curiosity before CTA */}
          <p className={`
            hidden sm:block
            text-white/50 group-hover:text-white/65 transition-colors duration-500
            ${isLarge ? "text-[10px] md:text-[11px]" : "text-[9px]"}
          `}>
            Led EMR rollout across 12 hospitals · 5,000+ daily clinical users
          </p>
        </div>

        {/* ── LAYER 4: CONTEXT — location as mini pills ─────────── */}
        <div
          className={`
            flex items-center justify-center gap-1.5 flex-wrap
            transition-all duration-500 delay-150
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
        >
          <span className="
            text-[9px] text-white/50 group-hover:text-white/65
            transition-colors duration-300
            bg-white/5 border border-white/8 rounded-full px-1.5 py-0.5
          ">
            🌏 Jakarta
          </span>
          <span className="
            text-[9px] text-white/50 group-hover:text-white/65
            transition-colors duration-300
            bg-white/5 border border-white/8 rounded-full px-1.5 py-0.5
          ">
            🌐 Remote-ready
          </span>
          {/* Currently building — ambient live signal */}
          <span className="
            hidden sm:inline-flex
            text-[9px] text-white/45 group-hover:text-white/60
            transition-colors duration-300
            bg-white/3 border border-white/6 rounded-full px-1.5 py-0.5
          ">
            🏥 Healthcare IT
          </span>
        </div>

        {/* ── LAYER 5: ACTIONS ──────────────────────────────────── */}
        {showActionButton && (
          <div
            className={`
              mt-1 flex justify-center
              transition-all duration-500 delay-200
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
            `}
          >
            <div className="action-group inline-flex items-center overflow-hidden">
              {/* PRIMARY CTA — pill background at rest for clear affordance */}
              <button
                onClick={handleToggleFlip}
                disabled={isAnimating}
                aria-pressed={isFlipped}
                className={`
                  action-cta action-cta--weighted underline-react
                  transition-all duration-200
                  ${isAnimating
                    ? "opacity-50 animate-pulse cursor-not-allowed"
                    : isPressed
                      ? "scale-[0.96] opacity-75"
                      : "hover:opacity-90 hover:translate-x-[1px] active:scale-95 active:opacity-80"
                  }
                `}
              >
                {isPressed ? "…" : isFlipped ? "← Back" : "View My Work"}
              </button>

              <span aria-hidden="true" className="action-divider" />

              {/* UTILITY CTAs — de-emphasised at rest, clearer on group hover */}
              {[
                { href: "mailto:aditiafarhan25@gmail.com", icon: "icon-mail", label: "Email", tooltip: "Email" },
                { href: "/Muhammad-Aditia-Farhan-Resume.pdf", icon: "icon-download", label: "Download Resume", tooltip: "Resume", download: true },
                { href: "https://github.com/aditfarhan", icon: "icon-github", label: "GitHub", tooltip: "GitHub", external: true, me: true },
                { href: "https://www.linkedin.com/in/muhammad-aditia-farhan", icon: "icon-linkedin", label: "LinkedIn", tooltip: "LinkedIn", external: true, me: true },
              ].map(({ href, icon, label, tooltip, download, external, me }) => (
                <a
                  key={label}
                  href={href}
                  download={download}
                  target={external ? "_blank" : undefined}
                  rel={[
                    external ? "noopener noreferrer" : "",
                    me ? "me" : "",
                  ].filter(Boolean).join(" ") || undefined}
                  data-tooltip={tooltip}
                  className="
                    action-icon action-icon--tooltip action-icon--deemph
                    transition-all duration-200
                    hover:scale-[1.08] hover:bg-white/10
                    active:scale-95 active:opacity-75
                  "
                  aria-label={label}
                >
                  <svg className="w-5 h-5" aria-hidden="true">
                    <use href={`/icons.svg#${icon}`} />
                  </svg>
                  {/* Visible label on mobile only */}
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
