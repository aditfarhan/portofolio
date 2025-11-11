import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/ThemeProvider";
import UtilityBar from "@/components/UtilityBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Farhan | Portfolio",
  description: "Coffee & Soccer themed portfolio powered by Next.js",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Farhan | Portfolio",
    description: "Coffee & Soccer themed portfolio powered by Next.js",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farhan | Portfolio",
    description: "Coffee & Soccer themed portfolio powered by Next.js",
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
          {/* Compact floating actions */}
          <UtilityBar />

          {/* Full-viewport canvas, no vertical scrolling */}
          <main id="main" className="h-[100dvh] overflow-hidden">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
