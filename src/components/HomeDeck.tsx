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

  // Background: interactive experience timeline (compact + accessible)
  type Role = { title: string; period: string };
  type CompanyExp = { company: string; location: string; roles: Role[] };

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

  // Create a short initials badge from a company name (non-logo, avoids repetition)
  function getInitials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .map((w) => (w && w[0]) || "")
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  const EXPERIENCE: CompanyExp[] = [
    {
      company: "PT. Pertamina Bina Medika IHC",
      location: "Jakarta, Indonesia",
      roles: [
        { title: "Frontend Engineer", period: "Dec 2023 – Mar 2024" },
        { title: "Software Engineer", period: "Apr 2024 – Present" },
      ],
    },
    {
      company: "OrderOnline.id",
      location: "Bandung, Indonesia",
      roles: [{ title: "Frontend Engineer", period: "Jan 2023 – Nov 2023" }],
    },
    {
      company: "Orami by SIRCLO",
      location: "Tangerang, Indonesia",
      roles: [{ title: "Frontend Engineer", period: "Oct 2021 – Dec 2022" }],
    },
    {
      company: "PT Nexwave - Huawei",
      location: "Jakarta, Indonesia",
      roles: [{ title: "Frontend Engineer", period: "Oct 2020 – Oct 2021" }],
    },
    {
      company: "PT Bejana Investidata Globalindo",
      location: "Bandung, Indonesia",
      roles: [
        { title: "Frontend Engineer Intern", period: "Jul 2019 – Nov 2019" },
      ],
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
                  className="rounded-xl border border-token bg-card/60 px-3 py-3"
                >
                  <h3 className="sr-only">Background</h3>

                  {/* Interactive experience rail */}
                  <div className="mt-1 flex flex-col items-center justify-center gap-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={gotoPrevExp}
                        className="btn-outline h-8 px-2 text-xs"
                        aria-label="Previous experience"
                      >
                        ‹
                      </button>

                      <div
                        role="tablist"
                        aria-label="Experience timeline"
                        onKeyDown={onExpKeyDown}
                        className="flex flex-nowrap justify-center gap-2"
                      >
                        {EXPERIENCE.map((exp, i) => {
                          const selected = i === expIndex;
                          return (
                            <button
                              key={exp.company}
                              id={`exp-tab-${i}`}
                              role="tab"
                              aria-selected={selected}
                              aria-controls={`exp-panel-${i}`}
                              tabIndex={selected ? 0 : -1}
                              onClick={() => setExpIndex(i)}
                              className={`logo-chip ${
                                selected ? "logo-chip--selected" : ""
                              }`}
                              title={`${exp.company} — ${exp.location}`}
                              style={{ width: 56, height: 56 }}
                            >
                              <img
                                src={getLogoUrl(exp.company)}
                                alt={`${exp.company} logo`}
                                width={40}
                                height={40}
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                className="pointer-events-none"
                                style={{
                                  filter: selected
                                    ? "none"
                                    : "grayscale(0.2) saturate(0.9)",
                                  opacity: selected ? 1 : 0.85,
                                }}
                                onError={(e) => {
                                  const img =
                                    e.currentTarget as HTMLImageElement;
                                  img.src = getLogoFallback(exp.company);
                                }}
                              />
                              <span className="sr-only">
                                {exp.company} — {exp.location}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={gotoNextExp}
                        className="btn-outline h-8 px-2 text-xs"
                        aria-label="Next experience"
                      >
                        ›
                      </button>
                    </div>

                    {/* Progress bar to show position in timeline */}
                    <div className="w-full max-w-[420px]">
                      <div className="h-1 rounded-full bg-[color-mix(in_srgb,var(--muted)_40%,transparent)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-a),var(--brand-b),var(--brand-c))]"
                          style={{
                            width: `${Math.round(
                              ((expIndex + 1) / EXPERIENCE.length) * 100
                            )}%`,
                          }}
                          role="progressbar"
                          aria-valuemin={1}
                          aria-valuemax={EXPERIENCE.length}
                          aria-valuenow={expIndex + 1}
                          aria-label="Experience position"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Active experience detail */}
                  <div
                    role="tabpanel"
                    id={`exp-panel-${expIndex}`}
                    aria-labelledby={`exp-tab-${expIndex}`}
                    className="mt-2 rounded-lg border border-token bg-card/60 p-3"
                  >
                    {(() => {
                      const exp = EXPERIENCE[expIndex];
                      const latest = exp.roles[exp.roles.length - 1];
                      const initials = getInitials(exp.company);
                      return (
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-3 text-[12px] sm:text-[13px]">
                            <div
                              aria-hidden="true"
                              className="flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold ring-1"
                              style={{
                                backgroundImage:
                                  "linear-gradient(135deg, color-mix(in srgb, var(--brand-a) 85%, black 5%), color-mix(in srgb, var(--brand-b) 75%, white 10%), var(--brand-c))",
                              }}
                            >
                              {initials}
                            </div>
                            <div>
                              <p className="font-semibold">
                                {exp.company}{" "}
                                <span className="text-muted">
                                  — {exp.location}
                                </span>
                              </p>
                              <p className="mt-0.5">
                                {latest.title}{" "}
                                <span className="text-muted">
                                  ({latest.period})
                                </span>
                              </p>
                            </div>
                          </div>

                          <div
                            className="mt-1 flex flex-wrap gap-1"
                            aria-label="Role history"
                          >
                            {exp.roles.map((r) => (
                              <span
                                key={r.title + r.period}
                                className="about-pill"
                              >
                                {r.title} · {r.period}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
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
                  className="rounded-xl border border-token bg-card/60 px-3 py-3"
                >
                  <h3 className="sr-only">Tech</h3>

                  {/* Sub-tabs to ensure all data is readable within fixed height */}
                  <div
                    role="tablist"
                    aria-label="Tech groups"
                    onKeyDown={onTechKeyDown}
                    className="mx-auto mb-2 inline-flex rounded-lg border border-token overflow-hidden bg-card/60"
                  >
                    {TECH_GROUPS.map((g) => (
                      <button
                        key={g}
                        role="tab"
                        id={techIds[g].tabId}
                        aria-controls={techIds[g].panelId}
                        aria-selected={techGroup === g}
                        tabIndex={techGroup === g ? 0 : -1}
                        onClick={() => setTechGroup(g)}
                        className={`px-2.5 py-1.5 text-[12px] sm:text-[13px] ${
                          techGroup === g
                            ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] font-semibold"
                            : "opacity-85 hover:opacity-100"
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>

                  {/* Active group */}
                  <div
                    role="tabpanel"
                    id={techIds[techGroup].panelId}
                    aria-labelledby={techIds[techGroup].tabId}
                  >
                    <div className="grid grid-cols-2 gap-2 text-[12px] sm:text-[13px]">
                      {TECH_SECTIONS[techGroup].map((sec) => (
                        <div
                          key={sec.title}
                          className="rounded-lg border border-token bg-card/60 p-2"
                        >
                          <h4 className="font-semibold flex items-center gap-2">
                            <span aria-hidden="true">{sec.icon}</span>{" "}
                            {sec.title}
                          </h4>
                          <div
                            className="mt-1 flex flex-wrap gap-1"
                            aria-label={`${sec.title} items`}
                          >
                            {sec.items.map((item) => (
                              <span key={item} className="about-pill">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
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
