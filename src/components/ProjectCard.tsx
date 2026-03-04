"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import type { Project } from "@/types";
import ProjectEntry from "./ProjectEntry";

interface ProjectsViewerProps {
  projects: Project[];
  onClose: () => void;
  isActive?: boolean; // true when this card is front-facing
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
  const announceRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  // Keep ref in sync with state for stale-closure-free callbacks
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // ── useCallback with NO stale index dep — uses ref ───────────
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

  // ── Keyboard navigation — gated on isActive ──────────────────
  useEffect(() => {
    if (!isActive) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next, isActive]);

  // ── Keyboard hint auto-fade ───────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShowKeyHint(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // ── Touch/swipe gesture (mobile) ─────────────────────────────
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    // Only trigger if horizontal swipe is dominant and exceeds 55px threshold
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 55) {
      if (deltaX < 0) next();
      else prev();
    }
  }

  // ── Detect touch/coarse pointer device ───────────────────────
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const currentProject = projects[index];
  const isFirst = index === 0;
  const isLast = index === projects.length - 1;

  // Tags: show max 5 on desktop, 3 on mobile; rest behind expand
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
        <div
          className="project-counter"
          aria-label={`Project ${index + 1} of ${projects.length}`}
        >
          <strong>{index + 1}</strong>
          <span className="project-counter-sep">/</span>
          <span>{projects.length}</span>
        </div>
      </div>

      {/* Screen reader announce */}
      <div ref={announceRef} aria-live="polite" aria-atomic="true" className="sr-only">
        {currentProject.title}, project {index + 1} of {projects.length}
      </div>

      {/* ── PROJECT CONTENT — grows to fill middle ──── */}
      <div className="project-content-area flex-1 min-h-0 overflow-y-auto overflow-x-hidden my-2 relative">
        {/* Scroll fade — gradient at bottom signals more content */}
        <div className="project-scroll-fade" aria-hidden="true" />
        <ProjectEntry
          key={`${currentProject.id}-${index}`}
          project={currentProject}
          direction={direction}
          expandedTags={expandedTags}
          maxTags={MAX_TAGS}
          onExpandTags={() => setExpandedTags(true)}
        />
      </div>

      {/* ── NAVIGATION — pinned to bottom ──────────── */}
      <div className="flex flex-col items-center gap-1.5 flex-shrink-0">

        {/* Progress dots */}
        <div
          role="tablist"
          aria-label="Projects navigation"
          className="flex items-center gap-1.5 flex-wrap justify-center"
        >
          {projects.map((p, i) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={i === index}
              aria-label={`${p.title} (${i + 1} of ${projects.length})`}
              onClick={() => goTo(i)}
              className={[
                "nav-dot-btn",
                "focus-visible:outline-2 focus-visible:outline-white/60 focus-visible:outline-offset-4",
                i === index
                  ? "w-3 h-1.5 bg-white/70 cursor-default"
                  : "w-1.5 h-1.5 bg-white/18 hover:bg-white/40 cursor-pointer",
              ].join(" ")}
            />
          ))}
        </div>

        {/* Navigation hint — keyboard or swipe depending on device */}
        {showKeyHint && (
          <span className="keyboard-hint" aria-hidden="true">
            {isTouch ? "Swipe ← →" : "← → to navigate"}
          </span>
        )}

        {/* Prev / Return / Next */}
        <div className="flex items-center justify-between w-full text-[10px] sm:text-[11px] text-white/42">

          {/* PREV — hidden at first project */}
          {!isFirst ? (
            <button
              onClick={prev}
              className="
                opacity-55 hover:opacity-88 hover:text-white/68
                hover:-translate-x-0.5
                active:scale-95 active:opacity-100
                min-h-[44px] min-w-[44px] flex items-center justify-start
                transition-all duration-150
                focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2 focus-visible:rounded
              "
              aria-label="Previous project"
            >
              ← Prev
            </button>
          ) : (
            <span className="min-w-[44px]" />
          )}

          {/* RETURN — full-width pill on mobile */}
          <button
            onClick={onClose}
            className="
              opacity-35 hover:opacity-60 hover:text-white/55
              active:scale-95 active:opacity-75
              px-2 sm:px-3 py-1 min-h-[44px]
              w-full sm:w-auto mx-1 sm:mx-0
              flex items-center justify-center
              rounded sm:rounded
              transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2
            "
          >
            Return to profile
          </button>

          {/* NEXT — hidden at last project */}
          {!isLast ? (
            <button
              onClick={next}
              className="
                opacity-55 hover:opacity-88 hover:text-white/68
                hover:translate-x-0.5
                active:scale-95 active:opacity-100
                min-h-[44px] min-w-[44px] flex items-center justify-end
                transition-all duration-150
                focus-visible:outline-2 focus-visible:outline-white/50 focus-visible:outline-offset-2 focus-visible:rounded
              "
              aria-label="Next project"
            >
              Next →
            </button>
          ) : (
            <span className="min-w-[44px]" />
          )}

        </div>
      </div>
    </div>
  );
}
