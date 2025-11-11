"use client";

import { useEffect, useRef, useState } from "react";

type TabName = "About";

function dispatch(name: string, detail?: unknown) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, detail ? { detail } : undefined));
}

export default function UtilityBar() {
  // Draggable position (persist to localStorage)
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragOffset = useRef<{ dx: number; dy: number }>({ dx: 0, dy: 0 });
  const barRef = useRef<HTMLDivElement>(null);

  // Auto-rotate visual state (we do not store global state here; we ask HomeDeck to toggle)
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("utility-bar-pos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as { x: number; y: number };
        setPos(parsed);
      } catch {}
    } else {
      // default: top-right with small inset
      setPos({ x: (window.innerWidth || 900) - 260, y: 16 });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("utility-bar-pos", JSON.stringify(pos));
  }, [pos]);

  function clampToViewport(x: number, y: number) {
    if (!barRef.current) return { x, y };
    const rect = barRef.current.getBoundingClientRect();
    const vw = window.innerWidth || 900;
    const vh = window.innerHeight || 600;
    const margin = 8;
    const nx = Math.max(margin, Math.min(vw - rect.width - margin, x));
    const ny = Math.max(margin, Math.min(vh - rect.height - margin, y));
    return { x: nx, y: ny };
  }

  function onPointerDown(e: React.PointerEvent<HTMLButtonElement>) {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    dragging.current = true;
    dragOffset.current = {
      dx: e.clientX - rect.left,
      dy: e.clientY - rect.top,
    };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (!dragging.current) return;
    const next = clampToViewport(
      e.clientX - dragOffset.current.dx,
      e.clientY - dragOffset.current.dy
    );
    setPos(next);
  }

  function onPointerUp(e: React.PointerEvent<HTMLButtonElement>) {
    dragging.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  }

  // Incoming events to keep "auto" indicator in sync when toggled elsewhere (optional)
  useEffect(() => {
    function handleToggle() {
      setAuto((prev) => !prev);
    }
    window.addEventListener("home:autoToggle", handleToggle as EventListener);
    return () =>
      window.removeEventListener(
        "home:autoToggle",
        handleToggle as EventListener
      );
  }, []);

  return (
    <div
      ref={barRef}
      role="toolbar"
      aria-label="Quick actions"
      style={{ position: "fixed", left: pos.x, top: pos.y }}
      className="z-50 rounded-full bg-card/80 backdrop-blur border border-token shadow-sm px-2 py-1 flex items-center gap-1"
    >
      {/* Drag handle (keyboard accessible) */}
      <button
        type="button"
        aria-label="Drag toolbar"
        title="Drag toolbar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="btn-outline h-8 w-8 p-0 text-xs cursor-grab active:cursor-grabbing"
      >
        <span aria-hidden="true" className="grid grid-cols-2 gap-[2px]">
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--foreground)]/55"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--foreground)]/55"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--foreground)]/55"></span>
          <span className="w-[6px] h-[6px] rounded-full bg-[var(--foreground)]/55"></span>
        </span>
      </button>

      {/* Flip controls */}
      <button
        type="button"
        onClick={() => dispatch("home:flipPrev")}
        className="btn-outline h-8 w-8 p-0 text-base"
        aria-label="Flip to previous section"
        title="Previous"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => dispatch("home:flipNext")}
        className="btn btn-gradient h-8 w-8 p-0 text-base"
        aria-label="Flip to next section"
        title="Next"
      >
        →
      </button>

      {/* Direct navigation (compact) */}
      <div
        role="group"
        aria-label="Go to section"
        className="flex items-center gap-1"
      >
        <button
          type="button"
          onClick={() => dispatch("home:goto", "About")}
          className="btn-outline h-8 w-8 p-0 text-xs"
          aria-label="Go to About"
          title="About"
        >
          A<span className="sr-only">bout</span>
        </button>
      </div>

      {/* Auto rotate toggle */}
      <button
        type="button"
        onClick={() => {
          setAuto((prev) => !prev);
          dispatch("home:autoToggle");
        }}
        className={`h-8 w-10 p-0 text-base rounded-md border ${
          auto ? "btn-gradient" : "btn-outline"
        }`}
        aria-pressed={auto}
        aria-label={auto ? "Pause auto-rotate" : "Start auto-rotate"}
        title={auto ? "Pause auto-rotate" : "Start auto-rotate"}
      >
        {auto ? "⏸" : "▶"}
      </button>
    </div>
  );
}
