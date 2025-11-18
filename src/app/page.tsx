import HomeDeck from "@/components/HomeDeck";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Aditia Farhan | Software Engineer Portfolio",
  description:
    "Explore innovative software engineering projects in healthcare, logistics, and web development. Discover scalable solutions built with modern technologies.",
};

export default function Home() {
  return <HomeDeck />;
}
