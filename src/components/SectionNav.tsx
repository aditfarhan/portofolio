"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const NAV_ITEMS = [
  { label: "Overview",     href: "#overview",       ids: ["overview", "impact"] },
  { label: "Case Studies", href: "#case-studies",   ids: ["case-studies", "architecture", "what-i-build"] },
  { label: "Process",      href: "#process",        ids: ["process"] },
  { label: "Stack",        href: "#tech-stack",     ids: ["tech-stack"] },
  { label: "Projects",     href: "#other-projects", ids: ["other-projects"] },
  { label: "Contact",      href: "#contact",        ids: ["contact", "trust"] },
] as const;

const ORDERED_IDS = [
  "overview", "impact", "case-studies", "architecture", "what-i-build",
  "process", "tech-stack", "other-projects", "trust", "contact",
] as const;

export default function SectionNav() {
  const [active, setActive]   = useState("overview");
  const [scrolled, setScrolled] = useState(false);
  const offsets = useRef<{ id: string; top: number }[]>([]);

  const refreshOffsets = useCallback(() => {
    offsets.current = ORDERED_IDS.map((id) => {
      const el = document.getElementById(id);
      return { id, top: el ? el.getBoundingClientRect().top + window.scrollY : 0 };
    });
  }, []);

  useEffect(() => {
    refreshOffsets();

    const onScroll = () => {
      const trigger = window.scrollY + window.innerHeight * 0.35;
      setScrolled(window.scrollY > 64);

      for (let i = offsets.current.length - 1; i >= 0; i--) {
        if (offsets.current[i].top <= trigger) {
          setActive(offsets.current[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refreshOffsets, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refreshOffsets);
    };
  }, [refreshOffsets]);

  const scrollTo = useCallback((href: string) => {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduced ? "instant" : "smooth", block: "start" });
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 h-12 z-[100]
        border-b transition-all duration-base
        ${scrolled
          ? "bg-background/90 border-border-1 shadow-sm backdrop-blur-[10px]"
          : "bg-transparent border-transparent shadow-none backdrop-blur-none"}
      `}
      aria-label="Page sections"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

        {/* MAF brand mark — scrolls to top */}
        <a
          href="#overview"
          onClick={(e) => { e.preventDefault(); scrollTo("#overview"); }}
          className="
            text-2xs font-bold text-white/35 hover:text-white/65
            transition-colors duration-fast rounded
            focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
          "
          style={{ letterSpacing: "var(--tracking-caps)" }}
          aria-label="Back to top — Muhammad Aditia Farhan"
        >
          MAF
        </a>

        {/* Desktop section links */}
        <div className="hidden lg:flex items-center gap-0.5">
          {NAV_ITEMS.map((item) => {
            const isActive = (item.ids as readonly string[]).includes(active);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                className={`
                  text-2xs px-2.5 py-1.5 rounded
                  transition-all duration-fast
                  focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-1
                  ${isActive
                    ? "text-white/75 bg-white/7"
                    : "text-white/28 hover:text-white/58 hover:bg-white/4"}
                `}
                style={{ letterSpacing: "var(--tracking-caps)" }}
                aria-current={isActive ? ("page" as const) : undefined}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Quick contact — visible at sm+ */}
        <a
          href="mailto:aditiafarhan25@gmail.com?subject=Software%20Engineer%20Opportunity"
          className="
            flex items-center gap-1.5 text-2xs text-white/28 hover:text-white/58
            border border-border-1 hover:border-border-2
            rounded-btn px-2.5 py-1.5
            transition-all duration-fast
            focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
          "
          style={{ letterSpacing: "var(--tracking-caps)" }}
          aria-label="Email Muhammad Aditia Farhan"
        >
          {/* Envelope icon */}
          <svg className="w-2.5 h-2.5 flex-shrink-0" aria-hidden="true" viewBox="0 0 16 16" fill="none">
            <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="hidden sm:inline">Get in touch</span>
          <span className="sm:hidden">Email</span>
        </a>

      </div>
    </nav>
  );
}
