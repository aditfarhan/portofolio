import { Suspense } from "react";
import HomeDeck from "@/components/HomeDeck";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Aditia Farhan — Senior Software Engineer | Healthcare & Enterprise Systems",
  description:
    "Senior Software Engineer in Jakarta with 5+ years building nationwide HIS/EMR platforms, SATUSEHAT integrations, and enterprise web systems. Lead engineer for HIS/EMR across 12+ hospitals.",
  keywords: [
    "Muhammad Aditia Farhan portfolio",
    "senior software engineer Indonesia",
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
    title: "Muhammad Aditia Farhan — Senior Software Engineer | Healthcare & Enterprise Systems",
    description:
      "Senior Software Engineer — Lead engineer for nationwide HIS/EMR across 12+ hospitals in Indonesia. Expert in React, Next.js, TypeScript, Laravel, Docker, Kubernetes, and healthcare interoperability.",
    type: "website",
    url: "/",
    siteName: "Muhammad Aditia Farhan Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Muhammad Aditia Farhan — Senior Software Engineer | Healthcare & Enterprise Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aditia Farhan — Senior Software Engineer | Healthcare & Enterprise Systems",
    description:
      "Senior Software Engineer specializing in nationwide HIS/EMR platforms, SATUSEHAT integration, enterprise systems, React, Next.js, TypeScript, and cloud-native infrastructure.",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <HomeDeck />
    </Suspense>
  );
}
