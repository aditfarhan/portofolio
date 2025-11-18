import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import ThemeProvider from "@/components/ThemeProvider";

// Structured data for SEO
const structuredData = [
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
  },
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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Muhammad Aditia Farhan - Software Engineer Portfolio | React, Next.js, Healthcare Tech",
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
  metadataBase: new URL("https://aditfarhan-portofolio.vercel.app"),
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
    siteName: "Muhammad Aditia Farhan Portfolio",
    images: [
      {
        url: "https://aditfarhan-portofolio.vercel.app/og-image.jpg",
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
    creator: "@aditfarhan",
    images: ["https://aditfarhan-portofolio.vercel.app/og-image.jpg"],
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
    google: "your-google-site-verification-code",
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
