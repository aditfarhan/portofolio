import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

import ThemeProvider from "@/components/ThemeProvider";

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
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Muhammad Aditia Farhan | Software Engineer Portfolio",
    description:
      "Discover innovative projects in healthcare technology, logistics platforms, and modern web development.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aditia Farhan | Software Engineer Portfolio",
    description:
      "Portfolio showcasing expertise in scalable web applications and software engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
