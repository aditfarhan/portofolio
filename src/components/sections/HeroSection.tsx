"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { PROFILE_STATS, CONTACT_LINKS, PROFILE_ROLE, PROFILE_TAGLINE, EMPLOYMENT } from "@/data/portfolio";
import { useShineEffect } from "@/hooks";

interface HeroSectionProps {
  onScrollToCaseStudies: () => void;
}

const RESUME_LINK = CONTACT_LINKS.find((l) => l.download);

const HeroSection = memo(function HeroSection({ onScrollToCaseStudies }: HeroSectionProps) {
  const [mounted, setMounted]     = useState(false);
  const [copiedName, setCopiedName] = useState(false);
  const { shineRef, handleShine } = useShineEffect<HTMLDivElement>();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleCopyName = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("Muhammad Aditia Farhan");
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 1800);
    } catch {
      window.getSelection()?.selectAllChildren(document.activeElement ?? document.body);
    }
  }, []);

  return (
    <section
      id="overview"
      className="relative flex items-center min-h-dvh pt-14 pb-10 sm:pt-16 sm:pb-12"
      aria-label="Introduction"
    >
      <div className="mx-auto max-w-[1200px] w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 lg:gap-10">

          {/* ── LEFT: IDENTITY PANEL ──────────────────────── */}
          <div
            ref={shineRef}
            onMouseMove={handleShine}
            className={`
              shine-card flex-shrink-0
              w-full lg:w-[300px] xl:w-[320px]
              rounded-lg bg-card border border-token
              flex flex-col
              transition-all duration-slower
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
            role="complementary"
            aria-label="Profile summary"
          >
            {/* Mobile: compact horizontal strip */}
            <div className="flex lg:hidden items-center gap-4 px-5 py-4">
              <button
                type="button"
                title={copiedName ? "Copied!" : "Copy name"}
                onClick={handleCopyName}
                aria-label={copiedName ? "Copied!" : "Copy name: Muhammad Aditia Farhan"}
                className="
                  maf-logo maf-logo--breathe shine-card
                  inline-flex items-center justify-center rounded-full
                  border border-white/25 bg-card/60 text-white font-semibold
                  w-9 h-9 text-xs flex-shrink-0
                  hover:scale-[1.06] cursor-pointer transition-transform duration-fast
                  focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
                  relative
                "
              >
                MAF
                {copiedName && (
                  <span
                    className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 text-white/88 text-2xs px-2 py-0.5 rounded whitespace-nowrap pointer-events-none animate-fade-in"
                    aria-hidden="true"
                  >
                    Copied!
                  </span>
                )}
              </button>
              <div className="min-w-0">
                <p className="text-sm font-bold leading-tight truncate" style={{ letterSpacing: "var(--tracking-tight)" }}>
                  Muhammad Aditia Farhan
                </p>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <p className="text-xs text-white/60">{PROFILE_ROLE}</p>
                  <span className="availability-badge" aria-label="Open to work">
                    <span className="availability-dot" aria-hidden="true" />
                    Open to Work
                  </span>
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
                {CONTACT_LINKS.map(({ href, icon, label, tooltip, download, external }) => (
                  <a
                    key={label}
                    href={href}
                    download={download}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer me" : undefined}
                    className="
                      action-icon action-icon--tooltip action-icon--deemph
                      w-7 h-7 rounded-full border border-border-1
                      hover:border-white/38 hover:bg-surface-1
                      transition-all duration-fast active:scale-90
                    "
                    aria-label={label}
                    data-tooltip={tooltip}
                  >
                    <svg className="w-3.5 h-3.5" aria-hidden="true"><use href={`/icons.svg#${icon}`} /></svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Desktop: full vertical card */}
            <div className="hidden lg:flex flex-col items-center text-center flex-1 gap-4 px-5 py-7">
              {/* MAF mark */}
              <button
                type="button"
                title={copiedName ? "Copied!" : "Copy name"}
                onClick={handleCopyName}
                aria-label={copiedName ? "Copied! Muhammad Aditia Farhan" : "Copy name: Muhammad Aditia Farhan"}
                className="
                  maf-logo maf-logo--breathe shine-card relative
                  inline-flex items-center justify-center rounded-full
                  border border-white/25 bg-card/60 text-white font-semibold
                  w-11 h-11 text-sm
                  hover:scale-[1.06] cursor-pointer transition-all duration-slower
                  focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
                "
              >
                MAF
                {copiedName && (
                  <span
                    className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 text-white/88 text-2xs px-2 py-0.5 rounded whitespace-nowrap pointer-events-none animate-fade-in"
                    aria-hidden="true"
                  >
                    Copied!
                  </span>
                )}
              </button>

              {/* Name + role + badge */}
              <div className="space-y-1.5">
                <p
                  className="text-lg xl:text-xl font-bold leading-tight"
                  style={{ letterSpacing: "var(--tracking-tight)" }}
                >
                  Muhammad Aditia Farhan
                </p>
                <p className="text-xs text-white/70">{PROFILE_ROLE}</p>
                <div className="flex justify-center">
                  <span className="availability-badge" aria-label="Open to work opportunities">
                    <span className="availability-dot" aria-hidden="true" />
                    Open to Work
                  </span>
                </div>
              </div>

              {/* Tagline */}
              <p
                className="text-2xs text-white/35"
                style={{ letterSpacing: "var(--tracking-caps)" }}
              >
                {PROFILE_TAGLINE}
              </p>

              {/* Employment */}
              <p className="text-2xs text-white/30" style={{ letterSpacing: "var(--tracking-caps)" }}>
                {EMPLOYMENT.map((e, i) => (
                  <span key={e.company}>
                    {i > 0 && <>&nbsp;·&nbsp;</>}
                    {e.company}
                    {e.end === null && <span className="text-white/20"> ({e.period})</span>}
                  </span>
                ))}
              </p>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" aria-hidden="true" />

              {/* Key stats — concise */}
              <div
                className="flex items-center justify-center gap-0 w-full"
                aria-label="Career highlights"
              >
                {PROFILE_STATS.map((stat, i) => (
                  <div key={stat.label} className="flex items-center">
                    <div className="flex flex-col items-center px-3">
                      <span
                        className="text-base font-bold text-white/88 tabular-nums"
                        style={{ letterSpacing: "var(--tracking-tight)" }}
                      >
                        {stat.value}{stat.suffix}
                      </span>
                      <span
                        className="text-2xs text-white/35 mt-0.5"
                        style={{ letterSpacing: "var(--tracking-caps)" }}
                      >
                        {stat.label}
                      </span>
                    </div>
                    {i < PROFILE_STATS.length - 1 && (
                      <div className="w-px h-6 bg-white/12 flex-shrink-0" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" aria-hidden="true" />

              {/* Context chips */}
              <div className="flex items-center justify-center flex-wrap gap-1.5">
                {[
                  { icon: "icon-location", label: "Jakarta" },
                  { icon: "icon-globe",    label: "Remote-ready" },
                  { icon: "icon-medical",  label: "HIS/EMR" },
                ].map(({ icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1 text-2xs text-white/38 bg-white/4 border border-white/8 rounded-full px-2 py-0.5"
                  >
                    <svg className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true"><use href={`/icons.svg#${icon}`} /></svg>
                    {label}
                  </span>
                ))}
              </div>

              {/* Contact icons */}
              <div className="flex items-center gap-2 mt-auto">
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
                    <svg className="w-4 h-4" aria-hidden="true"><use href={`/icons.svg#${icon}`} /></svg>
                  </a>
                ))}
              </div>

              <p
                className="text-2xs text-white/28 text-center leading-snug"
                style={{ letterSpacing: "var(--tracking-caps)" }}
              >
                Open to Software Engineer · Senior Frontend<br />
                Healthcare IT · Technical Lead roles
              </p>
            </div>
          </div>

          {/* ── RIGHT: VALUE PROPOSITION ──────────────────── */}
          <div
            className={`
              flex-1 flex flex-col justify-center
              transition-all duration-slower delay-75
              ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {/* Eyebrow label */}
            <p
              className="text-2xs text-white/25 mb-4 sm:mb-5"
              style={{ letterSpacing: "var(--tracking-caps)" }}
              aria-hidden="true"
            >
              SENIOR SOFTWARE ENGINEER · JAKARTA, INDONESIA
            </p>

            {/* H1 — the single page heading, includes sr-only name for screen readers */}
            <h1
              className="hero-headline font-bold mb-4 sm:mb-5"
              style={{ letterSpacing: "var(--tracking-tight)" }}
            >
              <span className="sr-only">Muhammad Aditia Farhan — </span>
              Building{" "}
              <em className="not-italic text-white/88">
                nationwide healthcare systems
              </em>{" "}
              that serve 12+ hospitals.
            </h1>

            {/* Supporting copy — one strong sentence */}
            <p className="text-sm sm:text-base text-white/55 leading-relaxed max-w-[540px] mb-7 sm:mb-8">
              I lead and build HIS/EMR, SATUSEHAT integration, and enterprise platforms used daily
              across hospitals in Indonesia — from clinical workflows to national health data exchange.
            </p>

            {/* Primary CTAs — visible without scrolling on all common laptop screens */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button
                type="button"
                onClick={onScrollToCaseStudies}
                className="
                  group about-cta-btn about-cta-btn--weighted
                  flex items-center gap-2 px-5 py-2.5 text-sm
                  w-full sm:w-auto justify-center sm:justify-start
                "
                aria-label="Scroll to featured case studies"
              >
                <span className="relative overflow-visible">
                  View Case Studies
                  <span
                    className="absolute left-0 -bottom-0.5 h-px w-full bg-white/38 scale-x-0 origin-left transition-transform duration-slower group-hover:scale-x-100"
                    aria-hidden="true"
                  />
                </span>
                <svg
                  className="w-3.5 h-3.5 transition-transform duration-slow group-hover:translate-x-1.5"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {RESUME_LINK && (
                <a
                  href={RESUME_LINK.href}
                  download={RESUME_LINK.download}
                  className="
                    text-sm text-white/45 hover:text-white/70
                    flex items-center justify-center gap-1.5
                    transition-colors duration-fast
                    focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2 focus-visible:rounded
                    min-h-[44px] px-1
                  "
                  aria-label="Download 2026 Resume PDF"
                >
                  <svg className="w-3.5 h-3.5" aria-hidden="true" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2v8M5 7l3 3 3-3M3 13h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Download Resume
                </a>
              )}
            </div>

            {/* Scroll hint */}
            <div
              className="mt-10 sm:mt-12 flex items-center gap-1.5 text-2xs text-white/18"
              aria-hidden="true"
            >
              <svg
                className="w-3 h-3 motion-safe:animate-bounce"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              scroll to explore
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default HeroSection;
