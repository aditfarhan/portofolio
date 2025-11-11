"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * HomeDeck - simplified: remove tab/flip logic and render a single, unique About section
 * - Accessible structure
 * - Clean, modern layout
 * - Unique orbit/constellation accents (pure CSS)
 */
export default function HomeDeck() {
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

  // Tech groups (condensed into 3 clusters to fit width clearly)
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

  // Background: immersive experience story (single view, no repetition)
  type Role = { title: string; period: string };
  type CompanyExp = {
    company: string;
    location: string;
    roles: Role[];
    highlight: string;
    achievement: string;
  };

  function getLogoUrl(company: string): string {
    // Prefer Clearbit; map names to primary domains (tweakable)
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
    // Fallback to high-res favicon if Clearbit not available
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

  // Create industry context from company name
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

  function onTechKeyDown(e: any) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const idx = TECH_GROUPS.indexOf(techGroup);
    const delta = e.key === "ArrowLeft" ? -1 : 1;
    const next = (idx + delta + TECH_GROUPS.length) % TECH_GROUPS.length;
    setTechGroup(TECH_GROUPS[next]);
  }

  return (
    <section
      className="mx-auto max-w-5xl px-4 py-3 h-[100dvh] max-h-[100dvh] overflow-hidden"
      aria-label="Home deck"
    >
      <div className="grid gap-4 sm:grid-cols-2 h-full items-center justify-items-center">
        {/* Left: Hero */}
        <div className="hero relative rounded-lg bg-card border border-token p-5 h-[420px] sm:h-[460px] w-full flex flex-col items-center justify-center gap-4 card-floating text-center">
          <div>
            <div
              className="w-full h-1.5 rounded-full bg-[linear-gradient(90deg,var(--brand-a),var(--brand-b),var(--brand-c))]"
              aria-hidden="true"
            ></div>
            <div
              className="mx-auto mt-2 inline-flex items-center justify-center w-12 h-12 rounded-full border border-token bg-card/80 font-bold select-none"
              aria-label="Avatar initials"
            >
              MAF
            </div>

            <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Muhammad Aditia Farhan
            </h1>
            {/* tagline removed for minimalist ID card */}

            <div className="mt-2 text-xs sm:text-sm text-muted text-center">
              <p>
                Software Engineer · 5+ yrs · Politeknik Negeri Bandung (2020)
              </p>
              <p className="mt-1">
                Scalable web apps across healthcare, e‑commerce, telco,
                logistics
              </p>
              <p className="mt-1">Jakarta & Bandung, Indonesia</p>
            </div>

            <div className="mt-3 flex justify-center">
              <div
                role="group"
                aria-label="Primary actions"
                className="action-group inline-flex items-center overflow-hidden"
              >
                <Link
                  href="/portfolio"
                  className="action-cta"
                  aria-label="Explore projects in portfolio"
                >
                  Explore Projects →
                </Link>

                <span aria-hidden="true" className="action-divider"></span>

                <a
                  href="mailto:aditia.farhan@yourdomain.com"
                  className="action-icon"
                  aria-label="Email Muhammad Aditia Farhan"
                  title="Email"
                >
                  <svg className="w-5 h-5" aria-hidden="true" focusable="false">
                    <use href="/icons.svg#icon-mail"></use>
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/in/muhammad-aditia-farhan"
                  className="action-icon"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit LinkedIn profile"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" aria-hidden="true" focusable="false">
                    <use href="/icons.svg#icon-linkedin"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: About (brand-new unique design) */}
        <div
          className="relative rounded-lg bg-card border border-token p-0 h-[420px] sm:h-[460px] w-full card-floating overflow-hidden"
          aria-labelledby="about-title"
          role="region"
        >
          {/* Decorative constellation + orbit accents (purely presentational) */}
          <div className="about-constellation" aria-hidden="true">
            <div className="orbit-ring orbit-ring--lg"></div>
            <div className="orbit-ring orbit-ring--md"></div>
            <div className="orbit-ring orbit-ring--sm"></div>
            <span className="orb orb-a"></span>
            <span className="orb orb-b"></span>
            <span className="orb orb-c"></span>
          </div>

          {/* Sticky header */}

          {/* Content */}
          <div className="h-full px-4 py-4 flex">
            <div className="mx-auto w-full max-w-[60ch] text-sm sm:text-base flex flex-col gap-3 justify-center">
              <h2
                id="about-title"
                className="text-center text-base sm:text-lg font-bold tracking-tight brand-gradient"
              >
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

                  {/* Compact single view experience - optimized for fixed height */}
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
                          {/* Compact experience card */}
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
                                      {exp.roles[exp.roles.length - 1].title}
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
                                    isActive ? "text-foreground" : "text-muted"
                                  }`}
                                >
                                  {exp.highlight}
                                </p>
                                <p className="text-[9px] text-muted leading-tight">
                                  {exp.achievement}
                                </p>
                              </div>

                              {/* Career progression indicator for multiple roles */}
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

                  {/* Compact navigation indicator */}
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
                  className="rounded-xl border border-token bg-card/60 px-3 py-3"
                >
                  <h3 className="sr-only">Interests</h3>
                  <ul
                    className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] sm:text-sm"
                    role="list"
                  >
                    <li className="interest-row">
                      <span aria-hidden="true" className="interest-dot" />
                      Scalable, user-centric web apps
                    </li>
                    <li className="interest-row">
                      <span aria-hidden="true" className="interest-dot" />
                      Digital transformation in healthcare
                    </li>
                    <li className="interest-row">
                      <span aria-hidden="true" className="interest-dot" />
                      Cloud, DevOps, automation
                    </li>
                    <li className="interest-row">
                      <span aria-hidden="true" className="interest-dot" />
                      Intuitive UI/UX
                    </li>
                    <li className="interest-row">
                      <span aria-hidden="true" className="interest-dot" />
                      Engineering leadership, mentoring
                    </li>
                    <li className="interest-row">
                      <span aria-hidden="true" className="interest-dot" />
                      Technical direction, systems architecture
                    </li>
                    <li className="interest-row">
                      <span aria-hidden="true" className="interest-dot" />
                      Data, analytics, optimization
                    </li>
                    <li className="interest-row">
                      <span aria-hidden="true" className="interest-dot" />
                      AI tools, productivity
                    </li>
                    <li className="interest-row col-span-2">
                      <span aria-hidden="true" className="interest-dot" />
                      Knowledge sharing, collaboration, continuous learning
                    </li>
                  </ul>
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

                  {/* Comprehensive tech overview - no repetition */}
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
                          {/* Tech category header */}
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

                          {/* Tech stack items */}
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
                        {/* Tech category header */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[14px]" aria-hidden="true">
                            {sec.icon}
                          </span>
                          <h4 className="font-semibold text-[11px] text-foreground">
                            {sec.title}
                          </h4>
                        </div>

                        {/* Tech stack items */}
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
                        {/* Tech category header */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[14px]" aria-hidden="true">
                            {sec.icon}
                          </span>
                          <h4 className="font-semibold text-[11px] text-foreground">
                            {sec.title}
                          </h4>
                        </div>

                        {/* Tech stack items */}
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

                  {/* Quick navigation hint */}
                  <div className="mt-2 flex items-center justify-center text-[8px] text-muted">
                    <span>Technology stack overview</span>
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
