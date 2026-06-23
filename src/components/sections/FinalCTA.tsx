"use client";

import { memo } from "react";
import { CONTACT_LINKS } from "@/data/portfolio";
import { useScrollReveal } from "@/hooks";

const FinalCTA = memo(function FinalCTA() {
  const { ref, visible } = useScrollReveal(0.1);

  const emailLink = CONTACT_LINKS.find((l) => l.href.startsWith("mailto:"));
  const resumeLink = CONTACT_LINKS.find((l) => l.download);
  const githubLink = CONTACT_LINKS.find((l) => l.href.includes("github"));
  const linkedinLink = CONTACT_LINKS.find((l) => l.href.includes("linkedin"));

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-20 sm:py-24 lg:py-28"
      aria-label="Contact and connect"
    >
      {/* Subtle top divider */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(600px,90%)] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div
          className={`
            max-w-2xl mx-auto text-center
            transition-all duration-slower
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
          `}
        >
          {/* Section label */}
          <p
            className="text-2xs text-white/25 mb-5"
            style={{ letterSpacing: "var(--tracking-caps)" }}
            aria-hidden="true"
          >
            06 · GET IN TOUCH
          </p>

          {/* Main heading */}
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{ letterSpacing: "var(--tracking-tight)" }}
          >
            Let&rsquo;s build something important together.
          </h2>

          {/* Supporting copy */}
          <p className="text-sm sm:text-base text-white/45 mb-8 sm:mb-10 leading-relaxed">
            Open to Software Engineer, Senior Frontend, Healthcare IT, and Technical Lead roles.
            Jakarta-based, remote-ready.
          </p>

          {/* Primary CTA buttons */}
          <div
            className={`
              flex flex-col sm:flex-row items-center justify-center gap-3 mb-8
              transition-all duration-slower delay-100
              ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            `}
          >
            {emailLink && (
              <a
                href={emailLink.href}
                className="
                  group about-cta-btn about-cta-btn--weighted
                  flex items-center gap-2 px-6 py-3 text-sm
                  w-full sm:w-auto justify-center
                "
                aria-label="Send email to discuss opportunities"
              >
                <svg className="w-3.5 h-3.5" aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                Email Me
              </a>
            )}
            {resumeLink && (
              <a
                href={resumeLink.href}
                download={resumeLink.download}
                className="
                  flex items-center gap-2 px-5 py-3 text-sm text-white/55
                  border border-border-1 hover:border-border-2 hover:text-white/80
                  rounded-btn transition-all duration-fast
                  w-full sm:w-auto justify-center
                  focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
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

          {/* Secondary link row */}
          <div
            className={`
              flex items-center justify-center gap-4
              transition-all duration-slower delay-[180ms]
              ${visible ? "opacity-100" : "opacity-0"}
            `}
          >
            {[linkedinLink, githubLink].filter(Boolean).map((link) => link && (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="
                  flex items-center gap-1.5 text-xs text-white/30
                  hover:text-white/60 transition-colors duration-fast
                  focus-visible:outline-2 focus-visible:outline-white/38 focus-visible:rounded
                  focus-visible:outline-offset-2
                "
                aria-label={`${link.label} — opens in new tab`}
              >
                <svg className="w-3.5 h-3.5" aria-hidden="true">
                  <use href={`/icons.svg#${link.icon}`} />
                </svg>
                {link.label}
                <svg className="w-2.5 h-2.5 opacity-50" aria-hidden="true" viewBox="0 0 16 16" fill="none">
                  <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5m0 0v5m0-5L8 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
});

export default FinalCTA;
