"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import type { Project } from "@/types";
import type { RefObject } from "react";
import { CONTACT_LINKS } from "@/data/portfolio";
import ProjectEntry from "./ProjectEntry";

export const FILTER_OPTIONS = ["All", "Healthcare", "Logistics", "E-commerce", "Telecom", "Personal", "Other"] as const;
export type FilterOption = (typeof FILTER_OPTIONS)[number];

export const INDUSTRY_MAP: Record<string, string> = {
  "PT. Pertamina Bina Medika IHC": "Healthcare",
  "OrderOnline.id": "Logistics",
  "Orami by SIRCLO": "E-commerce",
  "PT Nexwave (Huawei)": "Telecom",
  "PT Bejana Investidata Globalindo": "Other",
  "Personal Project": "Personal",
  "Freelance": "Personal",
};

interface ProjectsViewerProps {
  projects: Project[];
  onClose: () => void;
  isActive?: boolean;
  contentRef?: RefObject<HTMLDivElement | null>;
  activeFilter: FilterOption;
  onFilterChange: (f: FilterOption) => void;
}

// Only external social links in the mobile strip — email is already the "Get in touch" CTA below
const SOCIAL_LINKS = CONTACT_LINKS.filter((l) => l.external);
const EMAIL_LINK = CONTACT_LINKS.find((l) => l.href.startsWith("mailto:")) ?? CONTACT_LINKS[0];

export default function ProjectsViewer({
  projects,
  onClose,
  isActive = true,
  contentRef: externalContentRef,
  activeFilter,
  onFilterChange,
}: ProjectsViewerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [showKeyHint, setShowKeyHint] = useState(true);
  const [expandedTags, setExpandedTags] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<"prev" | "next" | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const internalContentRef = useRef<HTMLDivElement>(null);
  const contentRef = externalContentRef ?? internalContentRef;
  const announceRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  // Pre-compute per-industry counts
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    for (const p of projects) {
      const industry = INDUSTRY_MAP[p.company ?? ""] ?? "Other";
      counts[industry] = (counts[industry] ?? 0) + 1;
    }
    return counts;
  }, [projects]);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => INDUSTRY_MAP[p.company ?? ""] === activeFilter);

  const filteredLengthRef = useRef(filteredProjects.length);
  filteredLengthRef.current = filteredProjects.length;

  const filteredProjectsRef = useRef(filteredProjects);
  filteredProjectsRef.current = filteredProjects;

  // Track whether content overflows — gate scroll-fade on it
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const check = () => setIsScrollable(el.scrollHeight > el.clientHeight + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index, expandedTags, contentRef]);

  // Scroll content to top whenever project or filter changes
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [index, activeFilter, contentRef]);

  // Keep indexRef in sync
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  const prev = useCallback(() => {
    const cur = indexRef.current;
    if (cur <= 0) return;
    setDirection("prev");
    setIndex(cur - 1);
    setShowKeyHint(false);
    setExpandedTags(false);
  }, []);

  const next = useCallback(() => {
    const cur = indexRef.current;
    if (cur >= filteredLengthRef.current - 1) return;
    setDirection("next");
    setIndex(cur + 1);
    setShowKeyHint(false);
    setExpandedTags(false);
  }, []);

  const goTo = useCallback((i: number) => {
    const cur = indexRef.current;
    setDirection(i > cur ? "next" : "prev");
    setIndex(i);
    setShowKeyHint(false);
    setExpandedTags(false);
  }, []);

  // Keyboard navigation — preventDefault prevents accidental page scroll
  useEffect(() => {
    if (!isActive) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
        contentRef.current?.focus();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
        contentRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, isActive, contentRef]);

  // aria-live announcement
  useEffect(() => {
    const fp = filteredProjectsRef.current;
    if (announceRef.current) {
      announceRef.current.textContent = `${fp[index]?.title ?? ""}, project ${index + 1} of ${fp.length}`;
    }
  }, [index, activeFilter, projects]);

  // Keyboard hint auto-fade
  useEffect(() => {
    const t = setTimeout(() => setShowKeyHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Touch/swipe gesture
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 55) {
      if (deltaX < 0) next();
      else prev();
    }
  }

  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleFilterChange = useCallback((opt: FilterOption) => {
    onFilterChange(opt);
    setIndex(0);
    setExpandedTags(false);
  }, [onFilterChange]);

  const currentProject = filteredProjects[index];
  const isFirst = index === 0;
  const isLast = index === filteredProjects.length - 1;
  const prevProject = !isFirst ? filteredProjects[index - 1] : null;
  const nextProject = !isLast ? filteredProjects[index + 1] : null;
  const currentIndustry = INDUSTRY_MAP[currentProject?.company ?? ""] ?? "Other";
  const MAX_TAGS = 5;

  if (!currentProject) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-2 text-center p-6">
        <p className="text-sm text-white/38">No projects in this category.</p>
        <button
          onClick={() => handleFilterChange("All")}
          className="text-xs text-white/25 underline underline-offset-2 hover:text-white/55 transition-colors"
        >
          Show all projects
        </button>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      {/* ── HEADER ─────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm sm:text-base font-bold brand-gradient leading-none">
            Projects
          </h2>
          {index === 0 && activeFilter === "All" && (
            <span
              className="text-2xs bg-accent/15 border border-accent/25 rounded px-1.5 py-0.5 text-accent/80 font-semibold"
              style={{ letterSpacing: "var(--tracking-caps)" }}
              aria-label="Featured project"
            >
              Featured
            </span>
          )}
        </div>

        {/* Mobile contact strip */}
        <div className="flex items-center gap-1.5 sm:hidden" aria-label="Quick contact">
          {SOCIAL_LINKS.map(({ href, icon, label, external }) => (
            <a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer me" : undefined}
              className="project-contact-icon"
              aria-label={label}
            >
              <svg className="w-3.5 h-3.5" aria-hidden="true">
                <use href={`/icons.svg#${icon}`} />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* ── INDUSTRY FILTERS ───────────────────────────── */}
      <div className="flex flex-wrap gap-1 mb-2 flex-shrink-0" role="group" aria-label="Filter by industry">
        {FILTER_OPTIONS.map((opt) => {
          const count = filterCounts[opt] ?? 0;
          if (count === 0 && opt !== "All") return null;
          const isActive = activeFilter === opt;
          return (
            <button
              key={opt}
              onClick={() => handleFilterChange(opt)}
              className={[
                "text-2xs px-2 py-0.5 rounded-full border transition-all duration-fast",
                isActive
                  ? "border-white/38 bg-surface-2 text-white/88 font-semibold shadow-sm"
                  : "border-border-1 bg-surface-1 text-white/38 hover:text-white/70 hover:border-border-2 hover:bg-surface-2",
              ].join(" ")}
              style={{ letterSpacing: "var(--tracking-caps)" }}
              aria-pressed={isActive}
            >
              {opt}
              {opt !== "All" && (
                <span className={`ml-0.5 ${isActive ? "text-white/55" : "text-white/25"}`}>
                  ({count})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Screen reader live region */}
      <div
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* ── PROJECT CONTENT ─────────────────────────────── */}
      <div
        ref={contentRef}
        tabIndex={-1}
        role="region"
        aria-label={currentProject.title}
        className="project-content-area flex-1 min-h-0 overflow-y-auto overflow-x-hidden my-2 relative focus:outline-none"
      >
        {isScrollable && <div className="project-scroll-fade" aria-hidden="true" />}

        <ProjectEntry
          key={`${currentProject.id}-${activeFilter}`}
          project={currentProject}
          industry={currentIndustry}
          direction={direction}
          expandedTags={expandedTags}
          maxTags={MAX_TAGS}
          onExpandTags={() => setExpandedTags(true)}
          onCollapseTags={() => setExpandedTags(false)}
        />
      </div>

      {/* ── NAVIGATION ──────────────────────────────────── */}
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">

        {/* Progress dots */}
        <div
          role="radiogroup"
          aria-label="Projects navigation"
          className="flex items-center gap-1.5 flex-wrap justify-center"
        >
          {filteredProjects.map((p, i) => (
            <button
              key={p.id}
              role="radio"
              aria-checked={i === index}
              aria-label={`${p.title}, project ${i + 1} of ${filteredProjects.length}`}
              onClick={() => goTo(i)}
              className={[
                "nav-dot-btn rounded-full transition-all duration-fast",
                "focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-4",
                i === index
                  ? "w-2 h-2 bg-white/70 shadow-sm cursor-default"
                  : "w-1.5 h-1.5 bg-white/25 hover:bg-white/38 cursor-pointer",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Counter + jump to start */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xs text-white/38 tabular-nums">
            {index + 1}&nbsp;/&nbsp;{filteredProjects.length}
          </span>
          {index >= 3 && (
            <button
              onClick={() => goTo(0)}
              className="text-2xs text-white/25 hover:text-white/55 hover:underline underline-offset-2 transition-all duration-fast"
              aria-label="Return to first project"
            >
              ↩ Start
            </button>
          )}
        </div>

        {/* Keyboard hint */}
        {showKeyHint && (
          <span className="keyboard-hint" aria-hidden="true">
            {isTouch ? "Swipe ← →" : "← → to navigate"}
          </span>
        )}

        {/* Prev / Contact / Next */}
        <div className="flex items-center justify-between w-full text-xs text-white/38">

          {!isFirst ? (
            <div className="relative group/nav flex-shrink-0">
              {hoveredNav === "prev" && prevProject && (
                <div className="
                  absolute bottom-full left-0 mb-1.5
                  bg-black/80 text-white/70 text-2xs
                  px-2 py-1 rounded whitespace-nowrap
                  pointer-events-none z-10 animate-fade-in
                " aria-hidden="true">
                  {prevProject.title}
                </div>
              )}
              <button
                onClick={prev}
                onMouseEnter={() => setHoveredNav("prev")}
                onMouseLeave={() => setHoveredNav(null)}
                className="
                  opacity-55 hover:opacity-88 hover:text-white/70
                  hover:-translate-x-0.5
                  active:scale-95 active:opacity-100
                  min-h-[44px] min-w-[44px] flex items-center justify-start
                  transition-all duration-fast
                  focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2 focus-visible:rounded
                "
                aria-label={`Previous project: ${prevProject?.title ?? ""}`}
              >
                ← Prev
              </button>
            </div>
          ) : (
            <span className="min-w-[44px]" aria-hidden="true" />
          )}

          {/* Center: Get in touch + close */}
          <div className="flex flex-col items-center gap-0.5">
            <a
              href={EMAIL_LINK.href}
              className="
                inline-flex
                text-2xs text-white/38 hover:text-white/70
                transition-all duration-fast hover:scale-[1.02]
                items-center gap-1
              "
              aria-label="Send email to discuss collaboration"
            >
              <svg className="w-2.5 h-2.5" aria-hidden="true" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M1 5l7 5 7-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Get in touch
            </a>
            <button
              onClick={onClose}
              className="
                opacity-55 hover:opacity-88 hover:text-white/55
                active:scale-95 active:opacity-70
                px-2 sm:px-3 py-1 min-h-[44px]
                flex items-center justify-center gap-1
                transition-all duration-fast
                focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
                text-2xs
              "
              aria-label="Close projects view and return to About"
            >
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="flex-shrink-0">
                <path d="M1 1L9 9M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              About
            </button>
          </div>

          {!isLast ? (
            <div className="relative group/nav flex-shrink-0">
              {hoveredNav === "next" && nextProject && (
                <div className="
                  absolute bottom-full right-0 mb-1.5
                  bg-black/80 text-white/70 text-2xs
                  px-2 py-1 rounded whitespace-nowrap
                  pointer-events-none z-10 animate-fade-in
                " aria-hidden="true">
                  {nextProject.title}
                </div>
              )}
              <button
                onClick={next}
                onMouseEnter={() => setHoveredNav("next")}
                onMouseLeave={() => setHoveredNav(null)}
                className="
                  opacity-55 hover:opacity-88 hover:text-white/70
                  hover:translate-x-0.5
                  active:scale-95 active:opacity-100
                  min-h-[44px] min-w-[44px] flex items-center justify-end
                  transition-all duration-fast
                  focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2 focus-visible:rounded
                "
                aria-label={`Next project: ${nextProject?.title ?? ""}`}
              >
                Next →
              </button>
            </div>
          ) : (
            <span className="min-w-[44px]" aria-hidden="true" />
          )}

        </div>
      </div>
    </div>
  );
}
