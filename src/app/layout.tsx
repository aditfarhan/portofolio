import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

import { WebVitals } from "@/app/web-vitals";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { portfolio, PROFILE_ROLE, CONTACT_LINKS } from "@/data/portfolio";

const _emailLink = CONTACT_LINKS.find(l => l.href.startsWith("mailto:"))!;
const _emailAddress = _emailLink.href.replace("mailto:", "");

// Structured data for SEO - Enhanced with additional schema types
const structuredData = [
  // Person schema - for Knowledge Graph and rich results
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Aditia Farhan",
    jobTitle: PROFILE_ROLE,
    description:
      "Software Engineer with 5+ years of experience building enterprise healthcare systems, HIS/EMR platforms, and scalable web applications. Lead engineer for a nationwide HIS/EMR platform deployed across 12+ hospitals in Indonesia.",
    url: "https://aditfarhan-portofolio.vercel.app",
    sameAs: [
      "https://www.linkedin.com/in/muhammad-aditia-farhan",
      "https://github.com/aditfarhan",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta",
      addressCountry: "Indonesia",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Bandung State Polytechnic",
      description: "B.A.Sc. Informatics Engineering, GPA 3.34 / 4.00",
    },
    knowsAbout: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Laravel",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CI/CD",
      "Healthcare Information Systems",
      "Electronic Medical Records",
      "HIS/EMR Platform",
      "SATUSEHAT Integration",
      "HL7 FHIR",
      "Healthcare Interoperability",
      "Unleash Feature Flags",
      "HashiCorp Vault",
      "MinIO",
      "Storybook",
      "Enterprise Web Development",
      "Software Engineering",
      "Engineering Leadership",
      "Sprint Planning",
      "Architecture Reviews",
    ],
    email: _emailAddress,
    worksFor: {
      "@type": "Organization",
      name: "PT. Pertamina Bina Medika IHC",
    },
  },
  // WebSite schema - for site search box in Google
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Muhammad Aditia Farhan Portfolio",
    url: "https://aditfarhan-portofolio.vercel.app",
    description: "Professional portfolio showcasing software engineering projects and experience",
    author: {
      "@type": "Person",
      name: "Muhammad Aditia Farhan",
    },
    inLanguage: "en-US",
  },
  // ProfilePage schema - indicates this is a profile page
  {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Muhammad Aditia Farhan",
      alternateName: "MAF",
      description: "Software Engineer with 5+ years of experience building enterprise healthcare systems, HIS/EMR platforms, SATUSEHAT integration, and scalable web architecture across 4 industries in Indonesia.",
    },
  },
  // BreadcrumbList schema - for search result breadcrumbs
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://aditfarhan-portofolio.vercel.app",
      },
    ],
  },
  // ItemList schema - for projects showcase
  {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Software Engineering Projects",
    description: "Portfolio of professional projects and contributions",
    numberOfItems: portfolio.projects.length,
    itemListElement: portfolio.projects.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.description,
    })),
  },
  // FAQPage schema - for FAQ rich results
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Muhammad Aditia Farhan specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan specializes in enterprise healthcare systems, HIS/EMR platforms, and healthcare interoperability. He is the lead engineer behind a nationwide Hospital Information System and Electronic Medical Record platform deployed across 12+ hospitals in Indonesia, with SATUSEHAT (Ministry of Health) integration using HL7 FHIR standards.",
        },
      },
      {
        "@type": "Question",
        name: "How many years of experience does Muhammad Aditia Farhan have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan has over 5 years of professional experience as a Software Engineer, building enterprise web applications across healthcare, logistics, e-commerce, and telecommunications industries.",
        },
      },
      {
        "@type": "Question",
        name: "What technology stack does Muhammad Aditia Farhan use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan works with React, Next.js, TypeScript, Laravel, PostgreSQL, Docker, Kubernetes, Jenkins, CI/CD pipelines, Unleash feature flags, HashiCorp Vault, MinIO, and Storybook. He specializes in both frontend architecture and backend integration for enterprise healthcare and web systems.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Muhammad Aditia Farhan located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan is based in Jakarta, Indonesia, and is open to remote opportunities. He is experienced working with healthcare organizations, enterprise clients, and cross-functional teams.",
        },
      },
      {
        "@type": "Question",
        name: "What roles is Muhammad Aditia Farhan open to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan is open to Software Engineer, Senior Frontend Engineer, Full-stack Engineer, Healthcare IT Engineer, and Technical Lead / Lead Software Engineer roles.",
        },
      },
    ],
  },
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aditfarhan-portofolio.vercel.app"),
  title: {
    default: "Muhammad Aditia Farhan — Software Engineer | Healthcare & Enterprise Systems",
    template: "%s | Muhammad Aditia Farhan",
  },
  description:
    "Software Engineer in Jakarta with 5+ years of experience building enterprise healthcare systems, HIS/EMR platforms, and scalable web applications across healthcare, logistics, e-commerce, and telecom. Lead engineer for HIS/EMR deployed across 12+ hospitals in Indonesia.",
  keywords: [
    "Muhammad Aditia Farhan",
    "software engineer portfolio",
    "healthcare software engineer Indonesia",
    "HIS EMR developer",
    "SATUSEHAT integration engineer",
    "enterprise web development Jakarta",
    "React Next.js TypeScript developer",
    "Docker Kubernetes Jenkins engineer",
    "healthcare IT engineer Indonesia",
    "hospital information system developer",
  ],
  authors: [{ name: "Muhammad Aditia Farhan" }],
  creator: "Muhammad Aditia Farhan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muhammad Aditia Farhan — Software Engineer | Healthcare & Enterprise Systems",
    description:
      "Healthcare and enterprise software engineer with 5+ years experience. Lead engineer for HIS/EMR systems across 12+ hospitals in Indonesia. Specializing in React, Next.js, TypeScript, Laravel, Docker, Kubernetes, and healthcare interoperability.",
    type: "website",
    locale: "en_US",
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
      "Software Engineer specializing in enterprise healthcare systems, HIS/EMR platforms, SATUSEHAT integration, and scalable web architecture. 5+ years experience in Jakarta, Indonesia.",
    creator: "@adtfrhan",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "ZysRmiDkYuRgfl21-iOq7EsNByZb4kS1hxtoCJJjLX4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* Performance optimizations */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <link rel="preload" href="/icons.svg" as="image" type="image/svg+xml" />
        {structuredData.map((data, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(data),
            }}
          />
        ))}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <WebVitals />
        <Analytics />
        <SpeedInsights />
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <main id="main" className="min-h-dvh overflow-x-hidden">
          {children}
        </main>

      </body>
    </html>
  );
}
