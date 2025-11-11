"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/data/portfolio";

type Props = {
  projects: Project[];
};

type SortKey = "recency" | "title";

function parseStart(period?: Project["period"]) {
  if (!period?.start) return 0;
  // Accept YYYY-MM or human strings; fallback to 0 on failure
  const d = new Date(
    period.start.length <= 7 ? period.start + "-01" : period.start
  );
  const t = d.getTime();
  return Number.isFinite(t) ? t : 0;
}

export default function PortfolioInteractive({ projects }: Props) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("recency");
  const inputRef = useRef<HTMLInputElement>(null);
  const [limit, setLimit] = useState(6);

  // Keyboard: focus search with "/"
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const target = e.target as HTMLElement | null;
        const tag = target?.tagName?.toLowerCase();
        if (tag !== "input" && tag !== "textarea") {
          e.preventDefault();
          inputRef.current?.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Collect top tags (by frequency)
  const allTags = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of projects) {
      for (const t of p.tags ?? []) {
        map.set(t, (map.get(t) ?? 0) + 1);
      }
    }
    return [...map.entries()]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [projects]);

  const topTags = useMemo(() => allTags.slice(0, 10), [allTags]);

  function toggleTag(tag: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  function clearFilters() {
    setSelected(new Set());
    setQuery("");
    setSortKey("recency");
    inputRef.current?.focus();
  }

  // Filter + sort
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let next = projects.filter((p) => {
      // tags filter
      if (selected.size) {
        const tags = new Set(p.tags ?? []);
        for (const t of selected) {
          if (!tags.has(t)) return false;
        }
      }
      if (!q) return true;
      const hay = [
        p.title,
        p.tagline ?? "",
        p.description ?? "",
        (p.tags ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });

    next.sort((a, b) => {
      if (sortKey === "title") {
        return a.title.localeCompare(b.title);
      } else {
        // recency: sort descending by period.start
        return parseStart(b.period) - parseStart(a.period);
      }
    });

    return next;
  }, [projects, query, selected, sortKey]);

  const activeFilters =
    selected.size + (query ? 1 : 0) + (sortKey !== "recency" ? 1 : 0);

  return (
    <section aria-labelledby="projects-filter">
      <h3 id="projects-filter" className="sr-only">
        Project controls
      </h3>

      {/* Controls */}
      <div className="bg-card border border-token rounded-lg p-4 card-floating">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="flex items-center gap-2 flex-1">
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects (Press / to focus)"
              aria-label="Search projects"
              className="w-full rounded-md border border-token bg-transparent px-3 py-2 text-sm"
            />
            {activeFilters > 0 ? (
              <button
                type="button"
                className="btn-outline h-9 px-3"
                onClick={clearFilters}
                aria-label="Clear filters"
              >
                Clear
              </button>
            ) : null}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-xs text-muted">
              Sort
            </label>
            <select
              id="sort"
              className="rounded-md border border-token bg-transparent px-2 py-1 text-sm"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as SortKey)}
              aria-label="Sort projects"
            >
              <option value="recency">Most recent</option>
              <option value="title">Title A–Z</option>
            </select>
          </div>
        </div>

        {/* Tags toolbar */}
        {topTags.length ? (
          <div
            className="mt-3 overflow-x-auto"
            role="toolbar"
            aria-label="Filter by tag"
          >
            <div className="flex items-center gap-2 min-w-max">
              {topTags.map((tag) => {
                const pressed = selected.has(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    aria-pressed={pressed}
                    className={`btn-outline h-8 px-3 whitespace-nowrap ${
                      pressed ? "ring-2 ring-[var(--ring)]" : ""
                    }`}
                    title={`Filter by ${tag}`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Results count live region */}
        <div aria-live="polite" role="status" className="sr-only">
          {filtered.length} project{filtered.length === 1 ? "" : "s"} matched
        </div>
      </div>

      {/* Results */}
      <div className="mt-4 grid-cards">
        {filtered.map((p) => (
          <article
            key={p.id}
            className="group bg-card border border-token rounded-lg p-5 flex flex-col gap-3 card-floating"
          >
            <header>
              <h4 className="text-lg font-semibold text-[var(--primary)]">
                {p.title}
              </h4>
              {p.tagline ? (
                <p className="text-sm text-muted clamp-2">{p.tagline}</p>
              ) : null}
            </header>

            <p className="text-sm text-muted clamp-3">{p.description}</p>

            {p.highlights?.length ? (
              <details className="mt-1">
                <summary className="btn-outline h-8 px-3 text-xs cursor-pointer select-none">
                  Details
                </summary>
                <ul className="mt-2 list-disc pl-5 text-sm text-muted space-y-1">
                  {p.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </details>
            ) : null}

            {p.tags?.length ? (
              <div
                className="flex flex-wrap gap-2 mt-1"
                aria-label="Project tags"
              >
                {p.tags.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}

            {p.links?.length ? (
              <div className="mt-2 flex flex-wrap gap-2">
                {p.links.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline h-9 px-3 text-sm"
                    aria-label={(l.label ?? l.type) + " (opens in new tab)"}
                    title={(l.label ?? l.type) + " (opens in new tab)"}
                  >
                    {l.label ?? l.type}
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {/* Empty */}
      {filtered.length === 0 ? (
        <div
          className="mt-3 bg-card border border-token rounded-lg p-4 text-muted"
          role="status"
          aria-live="polite"
        >
          No matching projects. Try different tags or keywords.
        </div>
      ) : null}
    </section>
  );
}
