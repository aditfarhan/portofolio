import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudyBySlug, CASE_STUDIES, CASE_STUDY_SLUGS } from "@/data/case-studies";
import { SEO_CONFIG } from "@/config/app.config";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return {};

  const { project } = cs;
  const description = `${project.impact ? project.impact + ". " : ""}${project.description}`.slice(0, 160);

  return {
    title: project.title,
    description,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      title: `${project.title} | Muhammad Aditia Farhan`,
      description,
      url: `${SEO_CONFIG.siteUrl}/case-studies/${slug}`,
      siteName: "Muhammad Aditia Farhan Portfolio",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Muhammad Aditia Farhan`,
      description,
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const { project, impactMetrics, decisions, relatedSlugs } = cs;

  const related = relatedSlugs
    .map((s) => CASE_STUDIES.find((c) => c.slug === s))
    .filter(Boolean);

  const periodLabel = project.period
    ? project.period.end === null
      ? `${project.period.start.slice(0, 4)} – Present`
      : `${project.period.start.slice(0, 4)} – ${(project.period.end ?? "").slice(0, 4)}`
    : null;

  return (
    <div className="min-h-dvh relative">

      {/* ── STICKY NAV ─────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 h-12 z-[100] border-b border-white/7 bg-background/88 backdrop-blur-[12px]"
        aria-label="Case study navigation"
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link
            href="/#case-studies"
            className="
              flex items-center gap-1.5 text-2xs text-white/35 hover:text-white/65
              transition-colors duration-fast rounded
              focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
            "
            style={{ letterSpacing: "var(--tracking-caps)" }}
            aria-label="Back to portfolio — case studies"
          >
            <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 16 16" fill="none">
              <path
                d="M13 8H3M7 4L3 8l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Portfolio
          </Link>
          <span
            className="text-2xs text-white/20"
            style={{ letterSpacing: "var(--tracking-caps)" }}
            aria-hidden="true"
          >
            CASE STUDY
          </span>
        </div>
      </nav>

      {/* ── PAGE CONTENT ────────────────────────────────────── */}
      <div className="pt-12">

        {/* ── HEADER ──────────────────────────────────────────
            Larger vertical breathing room, max-readable width   */}
        <header className="border-b border-white/7 pt-14 pb-14 sm:pt-20 sm:pb-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-[720px]">

              {/* Eyebrow: company · period */}
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-5">
                <span
                  className="text-2xs text-white/22"
                  style={{ letterSpacing: "var(--tracking-caps)" }}
                >
                  CASE STUDY
                </span>
                {project.company && (
                  <>
                    <span className="w-px h-3 bg-white/14" aria-hidden="true" />
                    <span
                      className="text-2xs text-white/22"
                      style={{ letterSpacing: "var(--tracking-caps)" }}
                    >
                      {project.company}
                    </span>
                  </>
                )}
                {periodLabel && (
                  <>
                    <span className="w-px h-3 bg-white/14" aria-hidden="true" />
                    <span
                      className="text-2xs text-white/22 font-mono"
                      style={{ letterSpacing: "var(--tracking-mono)" }}
                    >
                      {periodLabel}
                    </span>
                  </>
                )}
              </div>

              {/* H1 */}
              <h1
                className="text-2xl sm:text-3xl lg:text-[2.25rem] font-bold text-white leading-tight mb-5"
                style={{ letterSpacing: "var(--tracking-tight)" }}
              >
                {project.title}
              </h1>

              {/* One-line impact */}
              {project.impact && (
                <p className="text-sm sm:text-base text-white/52 leading-relaxed">
                  {project.impact}
                </p>
              )}

            </div>
          </div>
        </header>

        {/* ── IMPACT METRICS ──────────────────────────────────── */}
        <div className="border-b border-white/7 py-10 sm:py-12">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {impactMetrics.map((m) => (
                <div key={m.label} className="impact-metric-card">
                  <p className="metric-value">{m.value}</p>
                  <p className="impact-metric-label">{m.label}</p>
                  <p className="impact-metric-context">{m.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MAIN BODY ────────────────────────────────────────── */}
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-[720px]">

            {/* Problem */}
            <section
              className="py-10 sm:py-12 border-b border-white/7"
              aria-labelledby="cs-problem"
            >
              <p
                id="cs-problem"
                className="text-2xs text-white/22 mb-5"
                style={{ letterSpacing: "var(--tracking-caps)" }}
              >
                THE PROBLEM
              </p>
              <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Project Scope: Role · Scale · System */}
            <section
              className="py-10 sm:py-12 border-b border-white/7"
              aria-labelledby="cs-scope"
            >
              <p
                id="cs-scope"
                className="text-2xs text-white/22 mb-6"
                style={{ letterSpacing: "var(--tracking-caps)" }}
              >
                PROJECT SCOPE
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {project.myRole && (
                  <div>
                    <p
                      className="text-2xs text-white/22 mb-2"
                      style={{ letterSpacing: "var(--tracking-caps)" }}
                    >
                      Project Role
                    </p>
                    <p className="text-xs sm:text-sm text-white/62 leading-relaxed">
                      {project.myRole}
                    </p>
                  </div>
                )}
                {project.scale && (
                  <div>
                    <p
                      className="text-2xs text-white/22 mb-2"
                      style={{ letterSpacing: "var(--tracking-caps)" }}
                    >
                      Scale
                    </p>
                    <p className="text-xs sm:text-sm text-white/62 leading-relaxed">
                      {project.scale}
                    </p>
                  </div>
                )}
                {project.systemScope && (
                  <div>
                    <p
                      className="text-2xs text-white/22 mb-2"
                      style={{ letterSpacing: "var(--tracking-caps)" }}
                    >
                      System Scope
                    </p>
                    <p className="text-xs sm:text-sm text-white/62 leading-relaxed">
                      {project.systemScope}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Decision Ledger */}
            <section
              className="py-10 sm:py-12 border-b border-white/7"
              aria-labelledby="cs-decisions"
            >
              <p
                id="cs-decisions"
                className="text-2xs text-white/22 mb-6"
                style={{ letterSpacing: "var(--tracking-caps)" }}
              >
                TECHNICAL DECISIONS
              </p>
              <div className="flex flex-col gap-4">
                {decisions.map((d, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/8 bg-white/[0.022] px-5 py-5"
                  >
                    <p
                      className="text-sm font-semibold text-white/85 mb-5 leading-snug"
                      style={{ letterSpacing: "var(--tracking-tight)" }}
                    >
                      {d.decision}
                    </p>
                    <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
                      <div>
                        <dt
                          className="text-2xs text-white/22 mb-1"
                          style={{ letterSpacing: "var(--tracking-caps)" }}
                        >
                          Why
                        </dt>
                        <dd className="text-xs text-white/52 leading-relaxed">{d.why}</dd>
                      </div>
                      <div>
                        <dt
                          className="text-2xs text-white/22 mb-1"
                          style={{ letterSpacing: "var(--tracking-caps)" }}
                        >
                          Tradeoff
                        </dt>
                        <dd className="text-xs text-white/52 leading-relaxed">{d.tradeoff}</dd>
                      </div>
                      <div>
                        <dt
                          className="text-2xs text-white/22 mb-1"
                          style={{ letterSpacing: "var(--tracking-caps)" }}
                        >
                          Outcome
                        </dt>
                        <dd className="text-xs text-white/52 leading-relaxed">{d.outcome}</dd>
                      </div>
                    </dl>
                  </div>
                ))}
              </div>
            </section>

            {/* What Made It Complex */}
            {project.complexity && (
              <section
                className="py-10 sm:py-12 border-b border-white/7"
                aria-labelledby="cs-complexity"
              >
                <p
                  id="cs-complexity"
                  className="text-2xs text-white/22 mb-5"
                  style={{ letterSpacing: "var(--tracking-caps)" }}
                >
                  WHAT MADE IT COMPLEX
                </p>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {project.complexity}
                </p>
              </section>
            )}

            {/* Outcome */}
            {project.outcome && (
              <section
                className="py-10 sm:py-12 border-b border-white/7"
                aria-labelledby="cs-outcome"
              >
                <p
                  id="cs-outcome"
                  className="text-2xs text-white/22 mb-5"
                  style={{ letterSpacing: "var(--tracking-caps)" }}
                >
                  OUTCOME
                </p>
                <p className="text-sm sm:text-base text-white/60 leading-relaxed">
                  {project.outcome}
                </p>
              </section>
            )}

            {/* Confidentiality Note */}
            {project.note && (
              <aside className="py-8 border-b border-white/7" aria-label="Confidentiality note">
                <div className="flex items-start gap-3 rounded-lg border border-border-1 bg-surface-1 px-4 py-3.5">
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-white/22"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <rect x="2" y="7" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                  <p className="text-xs text-white/42 leading-relaxed">
                    <span className="text-white/60 font-semibold">Confidentiality note. </span>
                    {project.note}
                  </p>
                </div>
              </aside>
            )}

          </div>
        </div>

        {/* ── RELATED CASE STUDIES ─────────────────────────────── */}
        {related.length > 0 && (
          <div className="border-t border-white/7 py-12 sm:py-16">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <p
                className="text-2xs text-white/22 mb-6"
                style={{ letterSpacing: "var(--tracking-caps)" }}
              >
                RELATED CASE STUDIES
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[720px]">
                {related.map((r) =>
                  r ? (
                    <Link
                      key={r.slug}
                      href={`/case-studies/${r.slug}`}
                      className="
                        group block rounded-lg border border-white/8 bg-white/[0.022]
                        px-4 py-4 sm:px-5 sm:py-4
                        hover:border-white/14 hover:bg-white/[0.038]
                        transition-all duration-slow
                        focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
                      "
                    >
                      {r.project.company && (
                        <p
                          className="text-2xs text-white/28 mb-1.5"
                          style={{ letterSpacing: "var(--tracking-caps)" }}
                        >
                          {r.project.company}
                        </p>
                      )}
                      <p
                        className="text-sm font-semibold text-white/72 group-hover:text-white/88 leading-snug mb-2 transition-colors duration-fast"
                        style={{ letterSpacing: "var(--tracking-tight)" }}
                      >
                        {r.project.title}
                      </p>
                      <div className="flex items-center gap-1 text-2xs text-white/28 group-hover:text-white/48 transition-colors duration-fast">
                        <span>Read case study</span>
                        <svg
                          className="w-3 h-3 transition-transform duration-fast group-hover:translate-x-0.5"
                          aria-hidden="true"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── FINAL CTA ────────────────────────────────────────── */}
        <div className="border-t border-white/7 py-14 sm:py-20">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-[520px]">
              <h2
                className="text-xl sm:text-2xl font-bold text-white mb-3"
                style={{ letterSpacing: "var(--tracking-tight)" }}
              >
                Let&rsquo;s build something important together.
              </h2>
              <p className="text-sm text-white/42 mb-7 leading-relaxed">
                Open to Software Engineer, Senior Frontend, Healthcare IT, and Technical Lead roles.
                Jakarta-based, remote-ready.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <a
                  href="mailto:aditiafarhan25@gmail.com?subject=Software%20Engineer%20Opportunity"
                  className="
                    group about-cta-btn about-cta-btn--weighted
                    flex items-center gap-2 px-5 py-2.5 text-sm
                  "
                  aria-label="Send email to discuss opportunities"
                >
                  Email Me
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-slow group-hover:translate-x-0.5"
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <Link
                  href="/"
                  className="
                    text-sm text-white/40 hover:text-white/62
                    flex items-center gap-1.5
                    border border-border-1 hover:border-border-2
                    rounded-btn px-4 py-2.5
                    transition-all duration-fast
                    focus-visible:outline-2 focus-visible:outline-white/55 focus-visible:outline-offset-2
                  "
                >
                  <svg className="w-3 h-3" aria-hidden="true" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 8H3M7 4L3 8l4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Back to Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
