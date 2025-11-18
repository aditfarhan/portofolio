import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import ThemeProvider from "@/components/ThemeProvider";

// Structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Muhammad Aditia Farhan",
  jobTitle: "Software Engineer",
  description:
    "Experienced software engineer specializing in scalable web applications, healthcare technology, and modern development practices.",
  url: "https://aditfarhan-portofolio.vercel.app",
  sameAs: [
    "https://www.linkedin.com/in/muhammad-aditia-farhan",
    "https://github.com/your-github-username",
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
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Aditia Farhan | Software Engineer Portfolio",
  description:
    "Explore the portfolio of Muhammad Aditia Farhan, a skilled software engineer specializing in scalable web applications, healthcare technology, and modern development practices.",
  keywords: [
    "software engineer",
    "portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "web development",
  ],
  authors: [{ name: "Muhammad Aditia Farhan" }],
  creator: "Muhammad Aditia Farhan",
  metadataBase: new URL("https://aditfarhan-portofolio.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Muhammad Aditia Farhan | Software Engineer Portfolio",
    description:
      "Discover innovative projects in healthcare technology, logistics platforms, and modern web development.",
    type: "website",
    locale: "en_US",
    siteName: "Muhammad Aditia Farhan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aditia Farhan | Software Engineer Portfolio",
    description:
      "Portfolio showcasing expertise in scalable web applications and software engineering.",
    creator: "@your-twitter-handle",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
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
