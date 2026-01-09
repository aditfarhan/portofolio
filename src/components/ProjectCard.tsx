"use client";

import { useState, useCallback } from "react";
import type { Project } from "@/types";
import ProjectEntry from "./ProjectEntry";

interface ProjectsViewerProps {
  projects: Project[];
  onClose: () => void;
}

export default function ProjectsViewer({
  projects,
  onClose,
}: ProjectsViewerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const prev = useCallback(() => {
    setDirection("prev");
    setIndex((i) => Math.max(i - 1, 0));
  }, []);

  const next = useCallback(() => {
    setDirection("next");
    setIndex((i) => Math.min(i + 1, projects.length - 1));
  }, [projects.length]);

  return (
    <div className="h-full flex flex-col justify-between">

      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-base sm:text-lg font-bold brand-gradient">
          Projects
        </h2>
        <p
          className="
            mt-1 text-[10px] text-white/40
            transition-opacity duration-200
          "
        >
          Project {index + 1} of {projects.length}
        </p>
      </div>

      {/* PROJECT CONTENT */}
      <div className="flex-1 flex items-center justify-center">
        <ProjectEntry
          key={projects[index].id}
          project={projects[index]}
          direction={direction}
        />
      </div>

      {/* NAVIGATION */}
      <div className="flex items-center justify-between text-xs text-white/45 mt-4">
        <button
          onClick={prev}
          disabled={index === 0}
          className="
            transition-opacity duration-200
            opacity-60 hover:opacity-90
            disabled:opacity-20
          "
          aria-label="Previous project"
        >
          ← Prev
        </button>

        <button
          onClick={onClose}
          className="
            transition-opacity duration-200
            opacity-35 hover:opacity-70
          "
        >
          Return to profile
        </button>

        <button
          onClick={next}
          disabled={index === projects.length - 1}
          className="
            transition-opacity duration-200
            opacity-60 hover:opacity-90
            disabled:opacity-20
          "
          aria-label="Next project"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
