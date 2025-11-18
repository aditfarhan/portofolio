"use client";

/**
 * AboutMe - Complete About section with tabs (Background, Interests, Tech)
 * Props:
 * - expIndex: Current experience index
 * - onExpIndexChange: Callback to change experience index
 * - techGroup: Current tech group
 * - onTechGroupChange: Callback to change tech group
 */
import { useState } from "react";
import {
  EXPERIENCE,
  ABOUT_TABS,
  TECH_GROUPS,
  type AboutTab,
  type TechGroup,
} from "@/lib/constants";
import { getLogoUrl, getLogoFallback, getIndustryContext } from "@/lib/utils";

interface AboutMeProps {
  expIndex: number;
  onExpIndexChange: (index: number) => void;
  techGroup: TechGroup;
  onTechGroupChange: (group: TechGroup) => void;
}

export default function AboutMe({
  expIndex,
  onExpIndexChange,
  techGroup,
  onTechGroupChange,
}: AboutMeProps) {
  const [aboutTab, setAboutTab] = useState<AboutTab>("Background");

  // Tech sections data
  const TECH_SECTIONS: Record<
    TechGroup,
    Array<{ title: string; icon: string; items: string[] }>
  > = {
    Build: [
      {
        title: "Frontend Engineering",
        icon: "⚡",
        items: [
          "React.js • Next.js",
          "Vue.js",
          "TypeScript • JavaScript (ES6+)",
          "Tailwind • CSS/SCSS",
          "Design Systems (Storybook)",
          "Responsive & Scalable UI Architecture",
        ],
      },
      {
        title: "Backend & APIs",
        icon: "🔧",
        items: [
          "Laravel (PHP)",
          "Node.js",
          "RESTful APIs",
          "GraphQL",
          "API Contract Standardization",
        ],
      },
    ],

    Ship: [
      {
        title: "DevOps & Cloud",
        icon: "☁",
        items: [
          "Docker • Kubernetes",
          "TurboRepo (Monorepo)",
          "CI/CD (Jenkins, Kaniko)",
          "GCP • Hybrid Cloud / On-Prem",
          "Phase Console (Deployment Management)",
          "Secrets Management (Vault)",
        ],
      },
      {
        title: "Databases & Storage",
        icon: "🗄",
        items: ["PostgreSQL", "MySQL", "MinIO (Object Storage)"],
      },
    ],

    Lead: [
      {
        title: "Technical Leadership",
        icon: "👨‍💻",
        items: [
          "System Architecture Design",
          "Cross-team Technical Alignment",
          "Code Reviews & Engineering Quality",
          "Performance Optimization",
          "Feature Flag Strategy (Unleash)",
        ],
      },
      {
        title: "Collaboration & Delivery",
        icon: "🤝",
        items: [
          "Sprint Planning & Backlog Prioritization",
          "Stakeholder Communication",
          "Cross-functional Collaboration",
          "Risk Mitigation & Delivery Management",
        ],
      },
      {
        title: "Design & Product",
        icon: "🎨",
        items: ["Figma", "Adobe XD", "User-centric UI/UX Thinking"],
      },
    ],
  };

  const aboutIds = {
    Background: { tabId: "about-tab-bg", panelId: "about-panel-bg" },
    Interests: { tabId: "about-tab-int", panelId: "about-panel-int" },
    Tech: { tabId: "about-tab-tech", panelId: "about-panel-tech" },
  } as const;

  function onAboutKeyDown(e: any) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const idx = ABOUT_TABS.indexOf(aboutTab);
    const delta = e.key === "ArrowLeft" ? -1 : 1;
    const next = (idx + delta + ABOUT_TABS.length) % ABOUT_TABS.length;
    setAboutTab(ABOUT_TABS[next]);
  }

  function onExpKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const delta = e.key === "ArrowLeft" ? -1 : 1;
    const next = (expIndex + delta + EXPERIENCE.length) % EXPERIENCE.length;
    onExpIndexChange(next);
  }

  function onTechKeyDown(e: any) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const idx = TECH_GROUPS.indexOf(techGroup);
    const delta = e.key === "ArrowLeft" ? -1 : 1;
    const next = (idx + delta + TECH_GROUPS.length) % TECH_GROUPS.length;
    onTechGroupChange(TECH_GROUPS[next]);
  }

  return (
    <>
      {/* Minimalist geometric accents */}
      <div className="about-constellation" aria-hidden="true">
        <div className="geometric-line geometric-line--lg"></div>
        <div className="geometric-line geometric-line--md"></div>
        <div className="geometric-line geometric-line--sm"></div>
        <span className="orb orb-a"></span>
        <span className="orb orb-b"></span>
        <span className="orb orb-c"></span>
      </div>

      {/* Header section remains in 3D context */}
      <div className="h-full px-4 py-4 flex flex-col">
        <div className="mx-auto w-full max-w-[60ch] text-sm sm:text-base flex flex-col">
          <h2 className="text-center text-base sm:text-lg font-bold tracking-tight brand-gradient flex-shrink-0">
            About Me
          </h2>
          <div
            role="tablist"
            aria-label="About sections"
            onKeyDown={onAboutKeyDown}
            className="mx-auto mt-1 inline-flex rounded-lg border border-token overflow-hidden bg-card/60 flex-shrink-0"
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
                className={`px-3 py-1.5 text-[13px] sm:text-sm transition-all ${
                  aboutTab === t
                    ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] font-semibold"
                    : "opacity-80 hover:opacity-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Portal: Scrollable content moved outside 3D context */}
          <div className="mt-3 flex-1">
            <div className="about-content-portal h-full">
              {aboutTab === "Background" && (
                <section
                  role="tabpanel"
                  id={aboutIds.Background.panelId}
                  aria-labelledby={aboutIds.Background.tabId}
                  className="rounded-xl border border-token bg-card/60 p-3 h-full flex flex-col"
                >
                  <h3 className="sr-only">Background</h3>

                  <div
                    role="tablist"
                    aria-label="Professional journey"
                    onKeyDown={onExpKeyDown}
                    className="flex-1 space-y-2 overflow-y-auto mobile-scroll-fix"
                    style={{
                      maxHeight: "280px",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    {EXPERIENCE.map((exp, i) => {
                      const isActive = i === expIndex;
                      return (
                        <div key={exp.company}>
                          <button
                            onClick={() => onExpIndexChange(i)}
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
                                      {exp.roles[exp.roles.length - 1].title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <p className="text-[9px] text-muted truncate flex-1">
                                      {exp.location} •{" "}
                                      {getIndustryContext(exp.company)}
                                    </p>
                                    <span className="text-[7px] text-muted whitespace-nowrap">
                                      {exp.roles[exp.roles.length - 1].period}
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
                                    isActive ? "text-foreground" : "text-muted"
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

                  <div className="mt-2 flex items-center justify-between text-[8px] text-muted flex-shrink-0">
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
                  className="rounded-xl border border-token bg-card/60 p-3 h-full flex flex-col"
                >
                  <h3 className="sr-only">Interests</h3>
                  <div
                    className="flex-1 space-y-3 flex flex-col mobile-scroll-fix"
                    style={{
                      maxHeight: "280px",
                      WebkitOverflowScrolling: "touch",
                      overflowY: "auto",
                    }}
                  >
                    <div className="border-l-2 border-[var(--accent)] pl-4">
                      <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                        Core Focus
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        Crafting scalable, high-performance digital platforms
                        that elevate user experience and drive real
                        impact—across healthcare, logistics, and modern
                        e-commerce ecosystems.
                      </p>
                    </div>

                    <div className="border-l-2 border-[color-mix(in_srgb,var(--accent)_60%,transparent)] pl-4">
                      <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                        Technical Passion
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        Designing thoughtful architectures, optimizing
                        performance, and championing modern engineering
                        practices. Continuously learning, refining, and sharing
                        knowledge to advance both product quality and team
                        capability.
                      </p>
                    </div>

                    <div className="border-l-2 border-[color-mix(in_srgb,var(--accent)_40%,transparent)] pl-4">
                      <h4 className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider mb-2">
                        Leadership
                      </h4>
                      <p className="text-sm text-muted leading-relaxed">
                        Empowering engineers through mentorship, clear technical
                        guidance, and collaborative problem-solving. Building
                        alignment across product, stakeholders, and engineering
                        teams to deliver solutions with clarity, precision, and
                        purpose.
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-center text-[8px] text-muted flex-shrink-0">
                    <span>Personal & professional interests</span>
                  </div>
                </section>
              )}

              {aboutTab === "Tech" && (
                <section
                  role="tabpanel"
                  id={aboutIds.Tech.panelId}
                  aria-labelledby={aboutIds.Tech.tabId}
                  className="rounded-xl border border-token bg-card/60 p-3 h-full flex flex-col"
                >
                  <h3 className="sr-only">Tech</h3>

                  <div
                    role="tablist"
                    aria-label="Technology stack"
                    onKeyDown={onTechKeyDown}
                    className="flex-1 overflow-y-auto mobile-scroll-fix"
                    style={{
                      maxHeight: "280px",
                      WebkitOverflowScrolling: "touch",
                    }}
                  >
                    {TECH_SECTIONS.Build.map((sec) => {
                      const isCore = sec.title === "Frontend";
                      return (
                        <div key={sec.title} className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[14px]" aria-hidden="true">
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

                  <div className="mt-2 flex items-center justify-center text-[8px] text-muted flex-shrink-0">
                    <span>Technology stack overview</span>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
