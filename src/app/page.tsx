import { Suspense } from "react";
import HomeDeck from "@/components/HomeDeck";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { portfolio, PROFILE_STATS, CONTACT_LINKS, PROFILE_INDUSTRIES } from "@/data/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Aditia Farhan — Software Engineer | Healthcare & Enterprise Systems",
  description:
    "Software Engineer in Jakarta with 5+ years building enterprise web systems across healthcare, logistics, e-commerce, and telecom. Lead engineer for HIS/EMR platforms deployed across 12+ hospitals in Indonesia.",
  keywords: [
    "Muhammad Aditia Farhan portfolio",
    "healthcare software engineer Indonesia",
    "HIS EMR developer Jakarta",
    "SATUSEHAT integration engineer",
    "enterprise web development Indonesia",
    "React Next.js TypeScript developer",
    "Docker Kubernetes engineer",
    "healthcare IT engineer Indonesia",
    "hospital information system developer",
    "full stack engineer healthcare",
  ],
  openGraph: {
    title: "Muhammad Aditia Farhan — Software Engineer | Healthcare & Enterprise Systems",
    description:
      "Healthcare and enterprise software engineer. Lead engineer for HIS/EMR systems deployed across 12+ hospitals in Indonesia. Expert in React, Next.js, TypeScript, Laravel, Docker, and Kubernetes.",
    type: "website",
    url: "/",
    siteName: "Muhammad Aditia Farhan Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Aditia Farhan — Software Engineer | Healthcare & Enterprise Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aditia Farhan — Software Engineer | Healthcare & Enterprise Systems",
    description:
      "Software Engineer specializing in enterprise healthcare systems, HIS/EMR platforms, SATUSEHAT integration, React, Next.js, TypeScript, and cloud-native infrastructure.",
    images: ["/opengraph-image"],
  },
};

// Collect unique tags from all projects for the skills section
function collectAllTags(projects: typeof portfolio.projects): string[] {
  const seen = new Set<string>();
  for (const p of projects) {
    for (const tag of p.tags) seen.add(tag);
  }
  return Array.from(seen);
}

export default function Home() {
  const allTags = collectAllTags(portfolio.projects);
  const emailLink = CONTACT_LINKS.find((l) => l.href.startsWith("mailto:"));

  return (
    <>
      <Suspense fallback={<LoadingSkeleton />}>
        <HomeDeck />
      </Suspense>

      {/* Hidden SEO content — generated from portfolio data so it never goes stale */}
      <div className="sr-only">
        <h1>Muhammad Aditia Farhan — Software Engineer | Healthcare &amp; Enterprise Systems</h1>
        <p>
          {(() => {
            const years = PROFILE_STATS.find(s => s.label === "years")!;
            const hospitals = PROFILE_STATS.find(s => s.label === "hospitals")!;
            const industries = PROFILE_STATS.find(s => s.label === "industries")!;
            return <>
              Muhammad Aditia Farhan is a Software Engineer based in Jakarta, Indonesia, with{" "}
              {years.value}{years.suffix} {years.label} of experience building enterprise-grade web
              applications across healthcare, logistics, e-commerce, and telecom.
              He is the lead engineer behind a nationwide HIS/EMR platform deployed across{" "}
              {hospitals.value}{hospitals.suffix} {hospitals.label} under PT. Pertamina Bina Medika IHC,
              supporting thousands of daily clinical transactions.
              His work spans {industries.value} industries: {PROFILE_INDUSTRIES}.
            </>;
          })()}
        </p>

        <h2>Core Expertise</h2>
        <p>
          Enterprise healthcare systems, HIS/EMR platforms, SATUSEHAT integration, healthcare
          interoperability, HL7 FHIR, hybrid cloud and on-premise deployment, Docker, Kubernetes,
          Jenkins CI/CD, React, Next.js, TypeScript, Laravel, PostgreSQL, Unleash feature flags,
          HashiCorp Vault, MinIO, Storybook design systems, sprint planning, architecture reviews,
          engineering mentorship, and stakeholder collaboration.
        </p>

        <h2>Key Projects ({portfolio.projects.length} total)</h2>
        <ul>
          {portfolio.projects.map((p) => (
            <li key={p.id}>
              <strong>{p.title}</strong>
              {p.company ? ` — ${p.company}` : ""}
              {p.impact ? `: ${p.impact}.` : "."}
              {" "}{p.description}
            </li>
          ))}
        </ul>

        <h2>Technologies</h2>
        <p>{allTags.join(", ")}.</p>

        <h2>Open To</h2>
        <p>
          Software Engineer, Senior Frontend Engineer, Full-stack Engineer,
          Healthcare IT Engineer, Technical Lead / Lead Software Engineer.
        </p>

        <h2>Contact</h2>
        <p>
          {emailLink && <>Email: {emailLink.href.replace("mailto:", "").split("?")[0]}<br /></>}
          LinkedIn: linkedin.com/in/muhammad-aditia-farhan
        </p>
      </div>
    </>
  );
}
