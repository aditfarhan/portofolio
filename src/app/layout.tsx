import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

import { ThemeProvider } from "@/components";
import { WebVitals } from "@/app/web-vitals";
import { Analytics } from "@vercel/analytics/react";

// Structured data for SEO - Enhanced with additional schema types
const structuredData = [
  // Person schema - for Knowledge Graph and rich results
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Aditia Farhan",
    jobTitle: "Software Engineer",
    description:
      "Experienced software engineer specializing in scalable web applications, healthcare technology, and modern development practices.",
    url: "https://aditfarhan-portofolio.vercel.app",
    sameAs: [
      "https://www.linkedin.com/in/muhammad-aditia-farhan",
      "https://github.com/aditfarhan",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jakarta & Bandung",
      addressCountry: "Indonesia",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Bandung State Polytechnic",
    },
    knowsAbout: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Healthcare Technology",
      "Web Development",
      "Software Engineering",
    ],
    email: "aditiafarhan25@gmail.com",
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
      description: "Software Engineer with 5+ years of experience",
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
    numberOfItems: 6,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "National HIS & EMR Platform",
        description: "Healthcare information system serving hospitals across Indonesia",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Warehouse Management System",
        description: "Enterprise logistics platform for order management",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "SIRCLO Commerce Platform",
        description: "E-commerce ecosystem for multi-tenant operations",
      },
    ],
  },
  // FAQPage schema - for FAQ rich results
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What technologies does Muhammad Aditia Farhan specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan specializes in React.js, Next.js, TypeScript, Node.js, and modern web development frameworks. He has extensive experience in healthcare technology, logistics platforms, and scalable enterprise applications.",
        },
      },
      {
        "@type": "Question",
        name: "How many years of experience does Muhammad Aditia Farhan have?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan has over 5 years of professional experience as a software engineer, working on complex web applications and enterprise solutions.",
        },
      },
      {
        "@type": "Question",
        name: "What kind of projects has Muhammad Aditia Farhan worked on?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad has worked on various projects including healthcare information systems, logistics platforms, e-commerce ecosystems, telecom dashboards, and sales prediction platforms using modern technologies like React, Next.js, and TypeScript.",
        },
      },
      {
        "@type": "Question",
        name: "Where is Muhammad Aditia Farhan located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan is based in Jakarta and Bandung, Indonesia, and has experience working with both local and international clients.",
        },
      },
      {
        "@type": "Question",
        name: "What is Muhammad Aditia Farhan's educational background?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Muhammad Aditia Farhan graduated from Bandung State Polytechnic with a degree in software engineering, and continues to stay updated with the latest technologies and best practices.",
        },
      },
    ],
  },
];

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // Optimize font loading
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aditfarhan-portofolio.vercel.app"),
  title: {
    default:
      "Muhammad Aditia Farhan - Software Engineer Portfolio | React, Next.js, Healthcare Tech",
    template: "%s | Muhammad Aditia Farhan", // Template for child pages
  },
  description:
    "Professional software engineer portfolio of Muhammad Aditia Farhan. Expert in React, Next.js, TypeScript, and healthcare technology. 5+ years experience building scalable web applications for enterprise clients.",
  keywords: [
    "Muhammad Aditia Farhan",
    "software engineer portfolio",
    "React developer",
    "Next.js developer",
    "TypeScript expert",
    "healthcare technology",
    "web development Indonesia",
    "full stack developer",
    "frontend engineer",
    "scalable web applications",
  ],
  authors: [{ name: "Muhammad Aditia Farhan" }],
  creator: "Muhammad Aditia Farhan",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Muhammad Aditia Farhan - Expert Software Engineer | React, Next.js, Healthcare Tech",
    description:
      "View Muhammad Aditia Farhan's professional portfolio. 5+ years experience building scalable web applications with React, Next.js, and TypeScript. Specializing in healthcare technology and enterprise solutions.",
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Muhammad Aditia Farhan Portfolio",
    images: [
      {
        url: "/og-image.jpg",
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
      "Professional software engineer with 5+ years experience in React, Next.js, TypeScript, and healthcare technology. View my portfolio of scalable web applications.",
    creator: "@adtfrhan",
    images: ["/og-image.jpg"],
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
        <title>Muhammad Aditia Farhan - Software Engineer Portfolio</title>
        <link rel="manifest" href="/manifest.json" />
        {/* Performance optimizations */}
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="color-scheme" content="dark light" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta
          name="google-site-verification"
          content="ZysRmiDkYuRgfl21-iOq7EsNByZb4kS1hxtoCJJjLX4"
        />
        <link rel="preload" href="/icons.svg" as="image" type="image/svg+xml" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://logo.clearbit.com" />
        <link rel="preconnect" href="https://vercel.com" />
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
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>

          {/* Full-viewport canvas, no vertical scrolling */}
          <main id="main" className="h-[100dvh] overflow-hidden">
            {children}
          </main>
        </ThemeProvider>

      </body>
    </html>
  );
}
