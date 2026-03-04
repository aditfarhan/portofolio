"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Project } from "@/types";
import ProjectEntry from "./ProjectEntry";

interface ProjectsViewerProps {
  projects: Project[];
  onClose: () => void;
  isActive?: boolean;
}

export default function ProjectsViewer({
  projects,
  onClose,
  isActive = true,
}: ProjectsViewerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [showKeyHint, setShowKeyHint] = useState(true);
  const [expandedTags, setExpandedTags] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<"prev" | "next" | null>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const announceRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  // Track whether content actually overflows — gate scroll-fade on it
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const check = () => setIsScrollable(el.scrollHeight > el.clientHeight + 4);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [index, expandedTags]);

  // Keep ref in sync — avoids stale closures in callbacks
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
    if (cur >= projects.length - 1) return;
    setDirection("next");
    setIndex(cur + 1);
    setShowKeyHint(false);
    setExpandedTags(false);
  }, [projects.length]);

  const goTo = useCallback((i: number) => {
    const cur = indexRef.current;
    setDirection(i > cur ? "next" : "prev");
    setIndex(i);
    setShowKeyHint(false);
    setExpandedTags(false);
  }, []);

  // Keyboard navigation — gated on isActive
  useEffect(() => {
    if (!isActive) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") { prev(); contentRef.current?.focus(); }
      else if (e.key === "ArrowRight") { next(); contentRef.current?.focus(); }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, isActive]);

  // aria-live — real DOM write for guaranteed screen-reader announcement
  useEffect(() => {
    if (announceRef.current) {
      announceRef.current.textContent = `${projects[index].title}, project ${index + 1} of ${projects.length}`;
    }
  }, [index, projects]);

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

  // Detect touch/coarse pointer
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const currentProject = projects[index];
  const isFirst = index === 0;
  const isLast = index === projects.length - 1;
  const prevProject = !isFirst ? projects[index - 1] : null;
  const nextProject = !isLast ? projects[index + 1] : null;
  const MAX_TAGS = 5;

  return (
    <div
      className="h-full flex flex-col justify-between"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "pan-y" }}
    >
      {/* ── HEADER ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <h2 className="text-sm sm:text-base font-bold brand-gradient leading-none tracking-tight">
          Projects
        </h2>
        {/* Counter moved to nav — header shows title only */}
        {index === 0 && (
          <span
            className="text-[8px] bg-accent/15 border border-accent/25 rounded px-1.5 py-0.5 text-accent/80 font-semibold tracking-wide"
            aria-label="Featured project"
          >
            Featured
          </span>
        )}
      </div>

      {/* Screen reader live region — updated via DOM write for reliability */}
      <div
        ref={announceRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* ── PROJECT CONTENT ──────────────────────── */}
      <div
        ref={contentRef}
        tabIndex={-1}
        role="region"
        aria-label={currentProject.title}
        className="project-content-area flex-1 min-h-0 overflow-y-auto overflow-x-hidden my-2 relative focus:outline-none"
      >
        {/* Scroll fade */}
        {isScrollable && <div className="project-scroll-fade" aria-hidden="true" />}

        <ProjectEntry
          key={`${currentProject.id}-${index}`}
          project={currentProject}
          direction={direction}
          expandedTags={expandedTags}
          maxTags={MAX_TAGS}
          onExpandTags={() => setExpandedTags(true)}
          onCollapseTags={() => setExpandedTags(false)}
        />
      </div>

      {/* ── NAVIGATION ───────────────────────────── */}
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">

        {/* Progress dots — role="radiogroup" for correct ARIA pattern */}
        <div
          role="radiogroup"
          aria-label="Projects navigation"
          className="flex items-center gap-1.5 flex-wrap justify-center"
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              role="radio"
              aria-checked={i === index}
              aria-label={`${p.title}, project ${i + 1} of ${projects.length}`}
              onClick={() => goTo(i)}
              className={[
                "nav-dot-btn",
                "focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-4",
                i === index
                  ? "w-2 h-2 bg-white/70 ring-1 ring-white/40 ring-offset-0 cursor-default"
                  : "w-1.5 h-1.5 bg-white/18 hover:bg-white/40 cursor-pointer",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Project counter in nav — replaces header counter, less upfront load */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-[9px] text-white/28 tabular-nums">
            {index + 1}&nbsp;of&nbsp;{projects.length}
          </span>
          {/* Return-to-start — appears deep in the list to resurface flagship */}
          {index >= 3 && (
            <button
              onClick={() => goTo(0)}
              className="
                text-[9px] text-white/30 hover:text-white/55
                hover:underline underline-offset-2
                transition-all duration-150
              "
              aria-label="Return to first project"
            >
              ↩ Start
            </button>
          )}
        </div>

        {/* Navigation hint */}
        {showKeyHint && (
          <span className="keyboard-hint" aria-hidden="true">
            {isTouch ? "Swipe ← →" : "← → to navigate"}
          </span>
        )}

        {/* Prev / Return / Next with project name preview on hover */}
        <div className="flex items-center justify-between w-full text-[10px] sm:text-[11px] text-white/42">

          {/* PREV — hidden at first; flex-shrink-0 to prevent wrapping */}
          {!isFirst ? (
            <div className="relative group/nav flex-shrink-0">
              {/* Preview tooltip — prev project name */}
              {hoveredNav === "prev" && prevProject && (
                <div className="
                  absolute bottom-full left-0 mb-1.5
                  bg-black/75 text-white/75 text-[9px]
                  px-2 py-1 rounded whitespace-nowrap
                  pointer-events-none z-10
                  animate-fade-in
                " aria-hidden="true">
                  {prevProject.title}
                </div>
              )}
              <button
                onClick={prev}
                onMouseEnter={() => setHoveredNav("prev")}
                onMouseLeave={() => setHoveredNav(null)}
                className="
                  opacity-55 hover:opacity-88 hover:text-white/68
                  hover:-translate-x-0.5
                  active:scale-95 active:opacity-100
                  min-h-[44px] min-w-[44px] flex items-center justify-start
                  transition-all duration-150
                  focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2 focus-visible:rounded
                "
                aria-label={`Previous project: ${prevProject?.title ?? ""}`}
              >
                ← Prev
              </button>
            </div>
          ) : (
            <span className="min-w-[44px]" />
          )}

          {/* RETURN — renamed to "← Back", + Contact when seen ≥2 projects */}
          <div className="flex flex-col items-center gap-0.5">
            {index >= 2 && (
              <a
                href="mailto:aditiafarhan25@gmail.com"
                className="
                  hidden sm:inline-flex
                  opacity-35 hover:opacity-60 text-white/50 hover:text-white/75
                  text-[9px] transition-all duration-200
                "
              >
                Contact →
              </a>
            )}
            <button
              onClick={onClose}
              className="
                opacity-50 hover:opacity-75 hover:text-white/60
                underline underline-offset-2 decoration-white/20 hover:decoration-white/40
                active:scale-95 active:opacity-75
                px-2 sm:px-3 py-1 min-h-[44px]
                flex items-center justify-center truncate max-w-[120px]
                transition-all duration-200
                focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2
              "
            >
              ← Back
            </button>
          </div>

          {/* NEXT — hidden at last; flex-shrink-0 to prevent wrapping */}
          {!isLast ? (
            <div className="relative group/nav flex-shrink-0">
              {/* Preview tooltip — next project name */}
              {hoveredNav === "next" && nextProject && (
                <div className="
                  absolute bottom-full right-0 mb-1.5
                  bg-black/75 text-white/75 text-[9px]
                  px-2 py-1 rounded whitespace-nowrap
                  pointer-events-none z-10
                  animate-fade-in
                " aria-hidden="true">
                  {nextProject.title}
                </div>
              )}
              <button
                onClick={next}
                onMouseEnter={() => setHoveredNav("next")}
                onMouseLeave={() => setHoveredNav(null)}
                className="
                  opacity-55 hover:opacity-88 hover:text-white/68
                  hover:translate-x-0.5
                  active:scale-95 active:opacity-100
                  min-h-[44px] min-w-[44px] flex items-center justify-end
                  transition-all duration-150
                  focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2 focus-visible:rounded
                "
                aria-label={`Next project: ${nextProject?.title ?? ""}`}
              >
                Next →
              </button>
            </div>
          ) : (
            <span className="min-w-[44px]" />
          )}

        </div>
      </div>
    </div>
  );
}
