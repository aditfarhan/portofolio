"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { portfolio } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import ProfileCard from "./ProfileCard";

/**
 * HomeDeck - Two-card flip animation between Profile and Projects
 * - Default: Left = Profile, Right = About Me
 * - Flipped: Left = Projects, Right = Profile
 * - Smooth card flip animation like exchanging positions
 */
export default function HomeDeck() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Project Card Component
  function ProjectCard({
    project,
    isCompact = false,
  }: {
    project: Project;
    isCompact?: boolean;
  }) {
    return (
      <article
        className={`group bg-card border border-token rounded-lg ${
          isCompact ? "p-3" : "p-4"
        } flex flex-col ${
          isCompact ? "gap-1" : "gap-2"
        } card-floating shimmer-card`}
      >
        <header>
          <h3
            className={`${
              isCompact ? "text-sm" : "text-base"
            } font-semibold text-[var(--primary)]`}
          >
            {project.title}
          </h3>
          {project.tagline ? (
            <p
              className={`${
                isCompact ? "text-xs" : "text-sm"
              } text-muted clamp-2`}
            >
              {project.tagline}
            </p>
          ) : null}
        </header>

        <p
          className={`${isCompact ? "text-xs" : "text-sm"} text-muted clamp-3`}
        >
          {project.description}
        </p>

        {project.highlights?.length ? (
          <ul className="reveal list-disc pl-4 text-xs text-muted space-y-1 mt-1">
            {project.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        ) : null}

        {project.tags?.length ? (
          <div className="flex flex-wrap gap-1 mt-1">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-xs py-0.5 px-1.5 rounded-md bg-[color-mix(in_srgb,var(--muted)_30%,transparent)] text-muted border border-[color-mix(in_srgb,var(--muted)_50%,transparent)]"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        {project.links?.length ? (
          <div className="mt-2 flex flex-wrap gap-1">
            {project.links.map((l, i) => (
              <a
                key={i}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs py-1 px-2 rounded-md border border-[color-mix(in_srgb,var(--accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_15%,transparent)] transition-colors"
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
    );
  }

  // Experience data for detailed background
  type Role = { title: string; period: string };
  type CompanyExp = {
    company: string;
    location: string;
    roles: Role[];
    highlight: string;
    achievement: string;
  };

  function getLogoUrl(company: string): string {
    const name = company.toLowerCase();
    if (
      name.includes("pertamina") ||
      name.includes("ihc") ||
      name.includes("pertamedika")
    )
      return "https://logo.clearbit.com/pertamedika.co.id";
    if (name.includes("orderonline"))
      return "https://logo.clearbit.com/orderonline.id";
    if (name.includes("orami") || name.includes("sirclo"))
      return "https://logo.clearbit.com/orami.co.id";
    if (name.includes("huawei") || name.includes("nexwave"))
      return "https://logo.clearbit.com/huawei.com";
    if (name.includes("bejana") || name.includes("globalindo"))
      return "https://logo.clearbit.com/bejana.id";
    return "https://logo.clearbit.com/google.com";
  }

  function getLogoFallback(company: string): string {
    const name = company.toLowerCase();
    let domain = "google.com";
    if (
      name.includes("pertamina") ||
      name.includes("ihc") ||
      name.includes("pertamedika")
    )
      domain = "pertamedika.co.id";
    else if (name.includes("orderonline")) domain = "orderonline.id";
    else if (name.includes("orami") || name.includes("sirclo"))
      domain = "orami.co.id";
    else if (name.includes("huawei") || name.includes("nexwave"))
      domain = "huawei.com";
    else if (name.includes("bejana") || name.includes("globalindo"))
      domain = "bejana.id";
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  }

  function getIndustryContext(company: string): string {
    const name = company.toLowerCase();
    if (
      name.includes("pertamina") ||
      name.includes("ihc") ||
      name.includes("pertamedika")
    ) {
      return "Healthcare Technology";
    }
    if (name.includes("orderonline")) {
      return "E-commerce & Digital Solutions";
    }
    if (name.includes("orami") || name.includes("sirclo")) {
      return "E-commerce Platform";
    }
    if (name.includes("huawei") || name.includes("nexwave")) {
      return "Telecommunications";
    }
    if (name.includes("bejana") || name.includes("globalindo")) {
      return "Data & Analytics";
    }
    return "Technology";
  }

  const EXPERIENCE: CompanyExp[] = [
    {
      company: "PT. Pertamina Bina Medika IHC",
      location: "Jakarta, Indonesia",
      roles: [
        { title: "Frontend Engineer", period: "Dec 2023 – Mar 2024" },
        { title: "Software Engineer", period: "Apr 2024 – Present" },
      ],
      highlight: "Healthcare digital transformation",
      achievement: "Building modern healthcare platforms serving millions",
    },
    {
      company: "OrderOnline.id",
      location: "Bandung, Indonesia",
      roles: [{ title: "Frontend Engineer", period: "Jan 2023 – Nov 2023" }],
      highlight: "E-commerce innovation",
      achievement: "Delivered seamless shopping experiences at scale",
    },
    {
      company: "Orami by SIRCLO",
      location: "Tangerang, Indonesia",
      roles: [{ title: "Frontend Engineer", period: "Oct 2021 – Dec 2022" }],
      highlight: "Enterprise e-commerce",
      achievement: "Optimized performance for high-traffic retail platforms",
    },
    {
      company: "PT Nexwave - Huawei",
      location: "Jakarta, Indonesia",
      roles: [{ title: "Frontend Engineer", period: "Oct 2020 – Oct 2021" }],
      highlight: "Telecommunications tech",
      achievement: "Contributed to next-gen telecom solutions",
    },
    {
      company: "PT Bejana Investidata Globalindo",
      location: "Bandung, Indonesia",
      roles: [
        { title: "Frontend Engineer Intern", period: "Jul 2019 – Nov 2019" },
      ],
      highlight: "Data-driven applications",
      achievement: "Gained foundational experience in data visualization",
    },
  ];

  const [expIndex, setExpIndex] = useState<number>(0);
  function onExpKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const delta = e.key === "ArrowLeft" ? -1 : 1;
    const next = (expIndex + delta + EXPERIENCE.length) % EXPERIENCE.length;
    setExpIndex(next);
  }
  function gotoPrevExp() {
    setExpIndex((i) => (i - 1 + EXPERIENCE.length) % EXPERIENCE.length);
  }
  function gotoNextExp() {
    setExpIndex((i) => (i + 1) % EXPERIENCE.length);
  }
  function goToIndex(index: number) {
    setExpIndex(index);
  }
  function goToNext() {
    setExpIndex((i) => (i + 1) % EXPERIENCE.length);
  }
  function goToPrev() {
    setExpIndex((i) => (i - 1 + EXPERIENCE.length) % EXPERIENCE.length);
  }

  // Tech groups for detailed tech section
  const TECH_GROUPS = ["Build", "Ship", "Lead"] as const;
  type TechGroup = (typeof TECH_GROUPS)[number];

  type TechSection = { title: string; icon: string; items: string[] };

  const techIds: Record<TechGroup, { tabId: string; panelId: string }> = {
    Build: { tabId: "tech-tab-build", panelId: "tech-panel-build" },
    Ship: { tabId: "tech-tab-ship", panelId: "tech-panel-ship" },
    Lead: { tabId: "tech-tab-lead", panelId: "tech-panel-lead" },
  };

  const TECH_SECTIONS: Record<TechGroup, TechSection[]> = {
    Build: [
      {
        title: "Frontend",
        icon: "⚡",
        items: [
          "React.js",
          "Next.js",
          "Vue.js",
          "TypeScript",
          "JavaScript",
          "HTML",
          "CSS/SCSS",
        ],
      },
      {
        title: "Backend & APIs",
        icon: "🔧",
        items: ["Node.js", "PHP/Laravel", "REST", "GraphQL"],
      },
    ],
    Ship: [
      {
        title: "DevOps & Cloud",
        icon: "☁",
        items: [
          "Docker",
          "TurboRepo",
          "CI/CD (Jenkins)",
          "CI/CD (Kaniko)",
          "GCP",
        ],
      },
      {
        title: "Databases",
        icon: "🗄",
        items: ["MySQL", "PostgreSQL"],
      },
    ],
    Lead: [
      {
        title: "Leadership",
        icon: "👨‍💻",
        items: [
          "System architecture",
          "Code reviews",
          "Mentorship",
          "Agile practices",
        ],
      },
      {
        title: "Design & UI/UX",
        icon: "🎨",
        items: ["Figma", "Adobe XD"],
      },
      {
        title: "Collaboration",
        icon: "🤝",
        items: ["Agile", "Cross‑functional teamwork"],
      },
    ],
  };

  const [techGroup, setTechGroup] = useState<TechGroup>("Build");

  function onTechKeyDown(e: any) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const idx = TECH_GROUPS.indexOf(techGroup);
    const delta = e.key === "ArrowLeft" ? -1 : 1;
    const next = (idx + delta + TECH_GROUPS.length) % TECH_GROUPS.length;
    setTechGroup(TECH_GROUPS[next]);
  }

  // Toggle flip function
  const toggleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const ABOUT_TABS = ["Background", "Interests", "Tech"] as const;
  type AboutTab = (typeof ABOUT_TABS)[number];
  const aboutIds = {
    Background: { tabId: "about-tab-bg", panelId: "about-panel-bg" },
    Interests: { tabId: "about-tab-int", panelId: "about-panel-int" },
    Tech: { tabId: "about-tab-tech", panelId: "about-panel-tech" },
  } as const;
  const [aboutTab, setAboutTab] = useState<AboutTab>("Background");
  function onAboutKeyDown(e: any) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const idx = ABOUT_TABS.indexOf(aboutTab);
    const delta = e.key === "ArrowLeft" ? -1 : 1;
    const next = (idx + delta + ABOUT_TABS.length) % ABOUT_TABS.length;
    setAboutTab(ABOUT_TABS[next]);
  }

  return (
    <section
      className="mx-auto max-w-5xl px-4 py-3 h-[100dvh] max-h-[100dvh] overflow-hidden"
      aria-label="Home deck"
    >
      <div className="grid gap-4 sm:grid-cols-2 h-full items-center justify-items-center">
        {/* Left Card - Flips between Profile and Projects */}
        <div
          className={`card-flip-container relative h-[420px] sm:h-[460px] w-full ${
            isAnimating ? "flipping" : ""
          }`}
        >
          <div
            className={`card-flip-inner relative w-full h-full transition-transform duration-600 ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front Side - Profile */}
            <div className="card-flip-front absolute inset-0 hero relative rounded-lg bg-card border border-token p-5 flex flex-col items-center justify-center gap-4 card-floating text-center shimmer-card jewel-profile">
              <ProfileCard
                showActionButton={true}
                size="large"
                onToggleFlip={toggleFlip}
                isFlipped={isFlipped}
                isAnimating={isAnimating}
              />
            </div>

            {/* Back Side - Projects */}
            <div className="card-flip-back absolute inset-0 rounded-lg bg-card border border-token p-4 overflow-hidden shimmer-card">
              {/* Minimalist geometric accents */}
              <div className="about-constellation" aria-hidden="true">
                <div className="geometric-line geometric-line--lg"></div>
                <div className="geometric-line geometric-line--md"></div>
                <div className="geometric-line geometric-line--sm"></div>
                <span className="orb orb-a"></span>
                <span className="orb orb-b"></span>
                <span className="orb orb-c"></span>
              </div>

              <div className="h-full flex flex-col gap-3 justify-center">
                <h2 className="text-center text-base sm:text-lg font-bold tracking-tight brand-gradient">
                  Projects
                </h2>

                <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                  {portfolio.projects.slice(0, 4).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      isCompact={true}
                    />
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-center text-[8px] text-muted">
                  <span>Selected projects showcase</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card - Flips between About Me and Compact Profile */}
        <div
          className={`card-flip-container relative h-[420px] sm:h-[460px] w-full ${
            isAnimating ? "flipping" : ""
          }`}
        >
          <div
            className={`card-flip-inner relative w-full h-full transition-transform duration-600 ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Front Side - About Me */}
            <div className="card-flip-front absolute inset-0 rounded-lg bg-card border border-token p-0 overflow-hidden">
              {/* Minimalist geometric accents */}
              <div className="about-constellation" aria-hidden="true">
                <div className="geometric-line geometric-line--lg"></div>
                <div className="geometric-line geometric-line--md"></div>
                <div className="geometric-line geometric-line--sm"></div>
                <span className="orb orb-a"></span>
                <span className="orb orb-b"></span>
                <span className="orb orb-c"></span>
              </div>

              <div className="h-full px-4 py-4 flex">
                <div className="mx-auto w-full max-w-[60ch] text-sm sm:text-base flex flex-col gap-3 justify-center">
                  <h2 className="text-center text-base sm:text-lg font-bold tracking-tight brand-gradient">
                    About Me
                  </h2>
                  <div
                    role="tablist"
                    aria-label="About sections"
                    onKeyDown={onAboutKeyDown}
                    className="mx-auto mt-1 inline-flex rounded-lg border border-token overflow-hidden bg-card/60"
                  >
                    {ABOUT_TABS.map((t) => (
                      <button
                        key={t}
                        role="tab"
                        id={aboutIds[t].tabId}
                        aria-controls={aboutIds[t].panelId}
                        aria-selected={aboutTab === t}
                        tabIndex={aboutTab === t ? 0 : -1}
                        onClick={() => setAboutTab(t)}
                        className={`px-3 py-1.5 text-[13px] sm:text-sm ${
                          aboutTab === t
                            ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] font-semibold"
                            : "opacity-80 hover:opacity-100"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  {aboutTab === "Background" && (
                    <section
                      role="tabpanel"
                      id={aboutIds.Background.panelId}
                      aria-labelledby={aboutIds.Background.tabId}
                      className="rounded-xl border border-token bg-card/60 p-3"
                    >
                      <h3 className="sr-only">Background</h3>

                      <div
                        role="tablist"
                        aria-label="Professional journey"
                        onKeyDown={onExpKeyDown}
                        className="space-y-2 max-h-[280px] overflow-y-auto pr-1"
                      >
                        {EXPERIENCE.map((exp, i) => {
                          const isActive = i === expIndex;
                          return (
                            <div key={exp.company}>
                              <button
                                onClick={() => goToIndex(i)}
                                className={`w-full text-left rounded-md border transition-all duration-200 group ${
                                  isActive
                                    ? "border-token bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--accent)_35%,transparent)] shadow-sm"
                                    : "border-[color-mix(in_srgb,var(--border)_80%,transparent)] hover:border-[color-mix(in_srgb,var(--border)_60%,var(--accent)_40%)] bg-card/30 hover:bg-card/50"
                                }`}
                              >
                                <div className="p-2">
                                  <div className="flex items-center gap-2 mb-1">
                                    <img
                                      src={getLogoUrl(exp.company)}
                                      alt={`${exp.company} logo`}
                                      width={24}
                                      height={24}
                                      loading="lazy"
                                      referrerPolicy="no-referrer"
                                      className={`pointer-events-none rounded ${
                                        isActive ? "shadow-sm" : "opacity-80"
                                      }`}
                                      onError={(e) => {
                                        const img =
                                          e.currentTarget as HTMLImageElement;
                                        img.src = getLogoFallback(exp.company);
                                      }}
                                    />
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <p className="font-semibold text-[11px] truncate">
                                          {exp.company}
                                        </p>
                                        <span
                                          className={`text-[7px] px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap ${
                                            isActive
                                              ? "bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] text-[var(--accent)] border border-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
                                              : "bg-[color-mix(in_srgb,var(--muted)_50%,transparent)] text-muted border border-[color-mix(in_srgb,var(--muted)_70%,transparent)]"
                                          }`}
                                        >
                                          {
                                            exp.roles[exp.roles.length - 1]
                                              .title
                                          }
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <p className="text-[9px] text-muted truncate flex-1">
                                          {exp.location} •{" "}
                                          {getIndustryContext(exp.company)}
                                        </p>
                                        <span className="text-[7px] text-muted whitespace-nowrap">
                                          {
                                            exp.roles[
                                              exp.roles.length - 1
                                            ].period.split(" – ")[1]
                                          }
                                        </span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div
                                        className={`w-1.5 h-1.5 rounded-full ${
                                          isActive
                                            ? "bg-[var(--accent)] shadow-sm"
                                            : "bg-[color-mix(in_srgb,var(--muted)_60%,transparent)]"
                                        }`}
                                        aria-hidden="true"
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-0.5">
                                    <p
                                      className={`text-[10px] font-medium leading-tight ${
                                        isActive
                                          ? "text-foreground"
                                          : "text-muted"
                                      }`}
                                    >
                                      {exp.highlight}
                                    </p>
                                    <p className="text-[9px] text-muted leading-tight">
                                      {exp.achievement}
                                    </p>
                                  </div>

                                  {exp.roles.length > 1 && (
                                    <div className="mt-1 flex items-center gap-2">
                                      <div className="flex -space-x-0.5">
                                        {exp.roles.map((role, idx) => (
                                          <div
                                            key={role.title + role.period}
                                            className={`w-1.5 h-1.5 rounded-full border ${
                                              idx === exp.roles.length - 1
                                                ? isActive
                                                  ? "bg-[var(--accent)] border-[color-mix(in_srgb,var(--accent)_60%,transparent)]"
                                                  : "bg-[color-mix(in_srgb,var(--accent)_50%,transparent)] border-[color-mix(in_srgb,var(--accent)_70%,transparent)]"
                                                : "bg-[color-mix(in_srgb,var(--muted)_40%,transparent)] border-[color-mix(in_srgb,var(--muted)_60%,transparent)]"
                                            }`}
                                            title={`${role.title} (${role.period})`}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-[7px] text-muted">
                                        {exp.roles.length} role
                                        {exp.roles.length > 1 ? "s" : ""}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[8px] text-muted">
                        <span>Use arrow keys or click to navigate</span>
                        <span aria-hidden="true">
                          {expIndex + 1}/{EXPERIENCE.length}
                        </span>
                      </div>
                    </section>
                  )}

                  {aboutTab === "Interests" && (
                    <section
                      role="tabpanel"
                      id={aboutIds.Interests.panelId}
                      aria-labelledby={aboutIds.Interests.tabId}
                      className="rounded-xl border border-token bg-card/60 px-4 py-4"
                    >
                      <h3 className="sr-only">Interests</h3>
                      <div className="space-y-3">
                        <div className="border-l-2 border-[var(--accent)] pl-4">
                          <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                            Core Focus
                          </h4>
                          <p className="text-sm text-muted leading-relaxed">
                            Building scalable web applications that solve real
                            problems and deliver exceptional user experiences
                            across healthcare, e-commerce, and enterprise
                            platforms.
                          </p>
                        </div>

                        <div className="border-l-2 border-[color-mix(in_srgb,var(--accent)_60%,transparent)] pl-4">
                          <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                            Technical Passion
                          </h4>
                          <p className="text-sm text-muted leading-relaxed">
                            Architecture design, performance optimization, and
                            modern development practices. Continuous learning
                            and knowledge sharing within the engineering
                            community.
                          </p>
                        </div>

                        <div className="border-l-2 border-[color-mix(in_srgb,var(--accent)_40%,transparent)] pl-4">
                          <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                            Leadership
                          </h4>
                          <p className="text-sm text-muted leading-relaxed">
                            Mentoring fellow engineers, fostering collaborative
                            teams, and driving technical excellence through
                            clear communication and strategic thinking.
                          </p>
                        </div>
                      </div>
                    </section>
                  )}

                  {aboutTab === "Tech" && (
                    <section
                      role="tabpanel"
                      id={aboutIds.Tech.panelId}
                      aria-labelledby={aboutIds.Tech.tabId}
                      className="rounded-xl border border-token bg-card/60 p-3"
                    >
                      <h3 className="sr-only">Tech</h3>

                      <div
                        role="tablist"
                        aria-label="Technology stack"
                        onKeyDown={onTechKeyDown}
                        className="max-h-[280px] overflow-y-auto pr-1"
                      >
                        {TECH_SECTIONS.Build.map((sec) => {
                          const isCore = sec.title === "Frontend";
                          return (
                            <div key={sec.title} className="mb-3">
                              <div className="flex items-center gap-2 mb-2">
                                <span
                                  className="text-[14px]"
                                  aria-hidden="true"
                                >
                                  {sec.icon}
                                </span>
                                <h4 className="font-semibold text-[11px] text-foreground">
                                  {sec.title}
                                </h4>
                                {isCore && (
                                  <span className="text-[7px] px-1.5 py-0.5 rounded-full bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] text-[var(--accent)] border border-[color-mix(in_srgb,var(--accent)_40%,transparent)]">
                                    Core
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {sec.items.map((item) => (
                                  <span
                                    key={item}
                                    className={`text-[9px] py-1 px-2 rounded-md border transition-all ${
                                      isCore
                                        ? "bg-[color-mix(in_srgb,var(--accent)_8%,transparent)] text-[var(--accent)] border-[color-mix(in_srgb,var(--accent)_40%,transparent)] font-medium"
                                        : "bg-[color-mix(in_srgb,var(--muted)_30%,transparent)] text-muted border-[color-mix(in_srgb,var(--muted)_50%,transparent)]"
                                    }`}
                                  >
                                    {item}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}

                        {TECH_SECTIONS.Ship.map((sec) => (
                          <div key={sec.title} className="mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[14px]" aria-hidden="true">
                                {sec.icon}
                              </span>
                              <h4 className="font-semibold text-[11px] text-foreground">
                                {sec.title}
                              </h4>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {sec.items.map((item) => (
                                <span
                                  key={item}
                                  className="text-[9px] py-1 px-2 rounded-md border bg-[color-mix(in_srgb,var(--muted)_30%,transparent)] text-muted border-[color-mix(in_srgb,var(--muted)_50%,transparent)]"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}

                        {TECH_SECTIONS.Lead.map((sec) => (
                          <div key={sec.title} className="mb-3">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[14px]" aria-hidden="true">
                                {sec.icon}
                              </span>
                              <h4 className="font-semibold text-[11px] text-foreground">
                                {sec.title}
                              </h4>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {sec.items.map((item) => (
                                <span
                                  key={item}
                                  className="text-[9px] py-1 px-2 rounded-md border bg-[color-mix(in_srgb,var(--muted)_30%,transparent)] text-muted border-[color-mix(in_srgb,var(--muted)_50%,transparent)]"
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-2 flex items-center justify-center text-[8px] text-muted">
                        <span>Technology stack overview</span>
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>

            {/* Back Side - Reusable Profile Card */}
            <div className="card-flip-back absolute inset-0 rounded-lg bg-card border border-token p-5 overflow-hidden shimmer-card jewel-profile">
              <ProfileCard
                showActionButton={true}
                size="large"
                onToggleFlip={toggleFlip}
                isFlipped={isFlipped}
                isAnimating={isAnimating}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
