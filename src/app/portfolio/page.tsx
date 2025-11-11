import type { Metadata } from "next";
import PortfolioSection from "@/components/Portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Projects and experience",
};

export default function PortfolioPage() {
  return <PortfolioSection />;
}
