"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { PROFILE_STATS, EMPLOYMENT, CONTACT_LINKS, PROFILE_ROLE, PROFILE_TAGLINE } from "@/data/portfolio";
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
  const [copiedName, setCopiedName] = useState(false);
  const { shineRef, handleShine } = useShineEffect<HTMLDivElement>();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleToggleFlip = useCallback(() => {
    if (isAnimating || !onToggleFlip) return;
    onToggleFlip();
  }, [isAnimating, onToggleFlip]);

  const handleCopyName = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("Muhammad Aditia Farhan");
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 1800);
    } catch {
      // Clipboard API unavailable — select the text as a fallback hint
      window.getSelection()?.selectAllChildren(document.activeElement ?? document.body);
    }
  }, []);

  /* ── SIDEBAR LAYOUT (projects open) ──────────────────────────────────
     Three-section layout with justify-between:
       TOP   — identity (MAF, name, title, badge, tagline)
       MID   — stats + achievement highlight (with separators)
       BOT   — contact icons + available hint + return button
  ────────────────────────────────────────────────────────────────────── */
  if (isFlipped) {
    return (
      <div
        ref={shineRef}
        onMouseMove={handleShine}
        className="profile-sidebar shine-card group relative flex-1 flex flex-col justify-between px-4 py-5"
        role="region"
        aria-label="Profile"
      >
        {/* ── TOP: IDENTITY ─────────────────────────── */}
        <div className="flex flex-col items-center text-center gap-2.5">

          {/* MAF mark */}
          <button
            type="button"
            title={copiedName ? "Copied!" : "Copy name"}
            onClick={handleCopyName}
            aria-label={copiedName ? "Copied!" : "Copy name: Muhammad Aditia Farhan"}
            className="
              maf-logo maf-logo--breathe shine-card relative
              inline-flex items-center justify-center rounded-full
              border border-white/25 bg-card/60 text-white font-semibold
              w-9 h-9 text-xs flex-shrink-0
              hover:scale-[1.06] cursor-pointer transition-transform duration-fast
              focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
            "
          >
            MAF
            {copiedName && (
              <span
                className="
                  absolute -top-7 left-1/2 -translate-x-1/2
                  bg-black/80 text-white/88 text-2xs
                  px-2 py-0.5 rounded whitespace-nowrap pointer-events-none
                  animate-fade-in
                "
                aria-hidden="true"
              >
                Copied!
              </span>
            )}
          </button>

          {/* Name + title + badge */}
          <div className="space-y-1">
            <p
              className="text-sm font-bold tracking-tight leading-tight text-white"
              style={{ letterSpacing: "var(--tracking-tight)" }}
            >
              Muhammad Aditia Farhan
            </p>
            <p className="text-xs text-white/70">{PROFILE_ROLE}</p>
            <div className="flex justify-center mt-0.5">
              <span className="availability-badge" aria-label="Open to work">
                <span className="availability-dot" aria-hidden="true" />
                Open to Work
              </span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-2xs text-white/38 tracking-[var(--tracking-caps)] leading-snug">
            {PROFILE_TAGLINE}
          </p>
        </div>

        {/* ── MIDDLE: STATS + ACHIEVEMENT ──────────── */}
        <div className="flex flex-col items-center gap-2.5">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

          {/* Visual stats — aria-hidden; page sr-only section provides accessible text */}
          <div
            className="grid grid-cols-3 w-full gap-1 text-center"
            aria-hidden="true"
          >
            {PROFILE_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <span className="text-sm font-bold text-white/88 tabular-nums">
                  {stat.value}{stat.suffix}
                </span>
                <span className="text-2xs text-white/38 leading-tight mt-0.5">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>

        {/* ── BOTTOM: CONTACT + RETURN ─────────────── */}
        <div className="flex flex-col items-center gap-2">

          {/* Contact icons — no tooltip (card overflow:hidden clips ::after) */}
          <div className="grid grid-cols-4 gap-1.5 w-full">
            {CONTACT_LINKS.map(({ href, icon, label, download, external }) => (
              <a
                key={label}
                href={href}
                download={download}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer me" : undefined}
                className="
                  action-icon action-icon--prominent
                  rounded-lg flex items-center justify-center
                  w-full h-10
                  hover:scale-[1.08] hover:bg-surface-hover
                  active:scale-95
                  transition-all duration-fast
                "
                aria-label={label}
              >
                <svg className="w-4 h-4" aria-hidden="true">
                  <use href={`/icons.svg#${icon}`} />
                </svg>
              </a>
            ))}
          </div>

          <p className="text-2xs text-white/45 text-center leading-snug">
            Open to Software Engineer, Senior Frontend,<br />
            Healthcare IT &amp; Technical Lead roles
          </p>

          {showActionButton && (
            <button
              onClick={handleToggleFlip}
              disabled={isAnimating}
              className="
                text-2xs text-white/38 hover:text-white/70
                flex items-center gap-1
                transition-colors duration-fast
                focus-visible:outline-2 focus-visible:outline-white/38
                focus-visible:outline-offset-2 focus-visible:rounded
                active:scale-95 disabled:opacity-40
              "
              aria-label="Return to About"
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M9 5H1M4 2L1 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              About
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ── FULL CARD LAYOUT (default — projects not open) ──────────────── */
  return (
    <div
      ref={shineRef}
      onMouseMove={handleShine}
      className="profile-card shine-card group relative flex-1 flex items-center justify-center"
      role="region"
      aria-label="Profile"
    >
      {/* Decorative sparkles */}
      <div className="jewel-sparkle opacity-20" />
      <div className="jewel-sparkle opacity-10" />

      {/* Reading-flow anchor */}
      <div
        className="
          absolute left-4 top-[18%] bottom-[12%]
          w-px
          bg-gradient-to-b from-transparent via-white/25 to-transparent
          opacity-25 group-hover:opacity-100
          transition-opacity duration-scene
          pointer-events-none
        "
        aria-hidden="true"
      />

      <div
        className={`
          flex flex-col items-center text-center w-full
          ${isLarge ? "gap-3 py-4 px-4" : "gap-2 py-3 px-3"}
        `}
      >
        {/* ── MAF MARK ──────────────────────────────── */}
        <button
          type="button"
          title={copiedName ? "Copied!" : "Copy name"}
          onClick={handleCopyName}
          aria-label={copiedName ? "Copied! Muhammad Aditia Farhan" : "Copy name: Muhammad Aditia Farhan"}
          className={`
            maf-logo maf-logo--breathe shine-card
            inline-flex items-center justify-center rounded-full
            border border-white/25 bg-card/60 text-white font-semibold
            transition-all duration-slower hover:scale-[1.06] cursor-pointer
            focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
            relative
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"}
            ${isLarge
              ? "w-9 h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 text-xs md:text-sm"
              : "w-7 h-7 md:w-8 md:h-8 text-2xs md:text-xs"
            }
          `}
        >
          MAF
          {copiedName && (
            <span
              className="
                absolute -top-7 left-1/2 -translate-x-1/2
                bg-black/80 text-white/88 text-2xs
                px-2 py-0.5 rounded whitespace-nowrap
                pointer-events-none animate-fade-in
              "
              aria-hidden="true"
            >
              Copied!
            </span>
          )}
        </button>

        {/* ── IDENTITY ──────────────────────────────── */}
        <div
          className={`
            space-y-1
            transition-all duration-slower delay-75
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          <p
            className={`
              profile-name font-bold
              ${isLarge ? "text-xl md:text-2xl lg:text-2xl" : "text-lg md:text-xl"}
              group-hover:-translate-y-[1px] transition-transform duration-slow
            `}
            style={{ letterSpacing: "var(--tracking-tight)" }}
          >
            Muhammad Aditia Farhan
          </p>

          <div className="flex items-center justify-center gap-2 flex-wrap">
            <p className={`
              text-white/70 transition-colors duration-slow
              ${isLarge ? "text-xs md:text-sm leading-snug" : "text-2xs md:text-xs leading-snug"}
              group-hover:text-white/88
            `}>
              {PROFILE_ROLE}
            </p>
            <span className="availability-badge" aria-label="Open to work opportunities">
              <span className="availability-dot" aria-hidden="true" />
              Open to Work
            </span>
          </div>

          <p className={`
            text-white/38 transition-colors duration-slow group-hover:text-white/55
            ${isLarge ? "text-2xs md:text-xs" : "text-2xs"}
          `}
            style={{ letterSpacing: "var(--tracking-caps)" }}
          >
            {PROFILE_TAGLINE}
          </p>

          <p className="text-2xs md:text-xs text-white/38 group-hover:text-white/55 transition-colors duration-slow"
            style={{ letterSpacing: "var(--tracking-caps)" }}
          >
            {EMPLOYMENT.map((e, i) => (
              <span key={e.company}>
                {i > 0 && <>&nbsp;·&nbsp;</>}
                {e.company}
                {e.end === null && <span className="text-white/25"> ({e.period})</span>}
              </span>
            ))}
          </p>
        </div>

        {/* ── IMPACT ────────────────────────────────── */}
        <div
          className={`
            flex flex-col items-center gap-1
            transition-all duration-slower delay-100
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          {/* Visual stats — hidden from AT; page sr-only section provides the accessible text */}
          <div
            aria-hidden="true"
            className="flex items-center flex-wrap gap-x-2 gap-y-1 justify-center text-white/55 group-hover:text-white/70 transition-colors duration-slower"
          >
            {PROFILE_STATS.map((stat, i) => (
              <span key={stat.label} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/25">·</span>}
                <span className={`font-semibold ${isLarge ? "text-xs md:text-sm" : "text-2xs md:text-xs"}`}>
                  {stat.value}{stat.suffix}
                </span>
                <span className={isLarge ? "text-2xs md:text-xs" : "text-2xs"}>
                  {stat.label}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* ── CONTEXT ───────────────────────────────── */}
        <div
          className={`
            flex items-center justify-center gap-1.5 flex-wrap
            transition-all duration-slower delay-150
            ${mounted ? "opacity-100" : "opacity-0"}
          `}
        >
          <span className="inline-flex items-center gap-1 text-2xs text-white/38 group-hover:text-white/55 transition-colors duration-slow bg-white/5 border border-white/8 rounded-full px-1.5 py-0.5">
            <svg className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true"><use href="/icons.svg#icon-location" /></svg>
            Jakarta
          </span>
          <span className="inline-flex items-center gap-1 text-2xs text-white/38 group-hover:text-white/55 transition-colors duration-slow bg-white/5 border border-white/8 rounded-full px-1.5 py-0.5">
            <svg className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true"><use href="/icons.svg#icon-globe" /></svg>
            Remote-ready
          </span>
          <span className="inline-flex items-center gap-1 text-2xs text-white/38 group-hover:text-white/55 transition-colors duration-slow bg-white/3 border border-white/6 rounded-full px-1.5 py-0.5">
            <svg className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true"><use href="/icons.svg#icon-medical" /></svg>
            HIS/EMR
          </span>
        </div>

        {/* ── CONTACT ICONS ─────────────────────────── */}
        <div
          className={`
            mt-1 flex flex-col items-center gap-1.5
            transition-all duration-slower delay-200
            ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          <div className="flex items-center gap-1.5">
            {CONTACT_LINKS.map(({ href, icon, label, tooltip, download, external }) => (
              <a
                key={label}
                href={href}
                download={download}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer me" : undefined}
                data-tooltip={tooltip}
                className="
                  action-icon action-icon--tooltip action-icon--deemph
                  w-8 h-8 rounded-full border border-border-1
                  hover:border-white/38 hover:bg-surface-1
                  transition-all duration-fast active:scale-90
                "
                aria-label={label}
              >
                <svg className="w-4 h-4" aria-hidden="true">
                  <use href={`/icons.svg#${icon}`} />
                </svg>
                <span className="action-icon-label sm:hidden" aria-hidden="true">
                  {tooltip}
                </span>
              </a>
            ))}
          </div>

          <p className="text-2xs text-white/45 text-center leading-snug">
            Open to Software Engineer, Senior Frontend,<br />
            Healthcare IT &amp; Technical Lead roles
          </p>
        </div>
      </div>
    </div>
  );
});

export default ProfileCard;
