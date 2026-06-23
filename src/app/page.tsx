import { Suspense } from "react";
import HomeDeck from "@/components/HomeDeck";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { portfolio, PROFILE_STATS, CONTACT_LINKS, PROFILE_INDUSTRIES } from "@/data/portfolio";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Aditia Farhan — Software Engineer Portfolio",
  description:
    "Professional software engineer Muhammad Aditia Farhan portfolio. 5+ years experience in React, Next.js, TypeScript. Healthcare tech, logistics platforms, scalable web apps. Jakarta Indonesia.",
  keywords: [
    "Muhammad Aditia Farhan portfolio",
    "software engineer Indonesia",
    "React developer Jakarta",
    "Next.js TypeScript expert",
    "healthcare technology developer",
    "logistics platform engineer",
    "scalable web applications",
    "frontend engineer Bandung",
    "full stack developer Indonesia",
    "enterprise software solutions",
  ],
  openGraph: {
    title:
      "Muhammad Aditia Farhan - Software Engineer | React, Next.js, Healthcare Tech",
    description:
      "View Muhammad Aditia Farhan's professional portfolio. Specializing in React, Next.js, TypeScript with 5+ years building scalable applications for healthcare and logistics.",
    type: "website",
    url: "/",
    siteName: "Muhammad Aditia Farhan Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Aditia Farhan - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aditia Farhan - Software Engineer Portfolio",
    description:
      "Professional software engineer specializing in React, Next.js, TypeScript, and healthcare technology solutions.",
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
        <p><strong>Muhammad Aditia Farhan — Software Engineer Portfolio</strong></p>
        <p>
          {(() => {
            const years = PROFILE_STATS.find(s => s.label === "years")!;
            const hospitals = PROFILE_STATS.find(s => s.label === "hospitals")!;
            const industries = PROFILE_STATS.find(s => s.label === "industries")!;
            return <>
              Muhammad Aditia Farhan is a software engineer with{" "}
              {years.value}{years.suffix} {years.label} of experience,
              having worked across {industries.value} industries including{" "}
              {PROFILE_INDUSTRIES}. He has deployed systems to{" "}
              {hospitals.value}{hospitals.suffix} {hospitals.label}, based in Jakarta, Indonesia.
            </>;
          })()}
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

        <h2>Contact</h2>
        <p>
          {emailLink && <>Email: {emailLink.href.replace("mailto:", "")}<br /></>}
          LinkedIn: linkedin.com/in/muhammad-aditia-farhan
        </p>
      </div>
    </>
  );
}
