// Canonical, Notion-free portfolio dataset and schema.
// This is a pure TypeScript module imported by Server Components for static rendering.

export type LinkType =
  | "github"
  | "demo"
  | "docs"
  | "npm"
  | "storybook"
  | "article"
  | "design"
  | "video";

export interface Link {
  type: LinkType;
  url: string;
  label?: string;
}

export interface Period {
  start: string; // ISO-8601 or human string, e.g. "2023-01" or "Jan 2023"
  end?: string; // same format or "Present"
}

export interface Project {
  id: string;
  title: string;
  tagline?: string;
  description: string;
  tags: string[];
  links?: Link[];
  period?: Period;
  image?: string; // public path e.g. /images/project.png
  highlights?: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: Period;
  location?: string;
  details?: string[];
  links?: Link[];
  skills?: string[];
}

export interface Profile {
  name: string;
  title: string;
  location?: string;
  email?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}

export interface PortfolioData {
  profile: Profile;
  skills: string[];
  projects: Project[];
  experience?: Experience[];
}

// Example dataset — replace with real content as desired.
export const portfolio: PortfolioData = {
  profile: {
    name: "Farhan",
    title: "Frontend Engineer",
    location: "Indonesia",
    email: "me@example.com",
    social: {
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/",
      website: "https://example.com",
    },
  },
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Design Systems",
    "Accessibility",
    "Performance",
  ],
  projects: [
    {
      id: "proj-01",
      title: "Design System Foundations",
      tagline: "Composable UI library with tokens and theming",
      description:
        "A component library built with React, TypeScript, and Tailwind CSS, featuring semantic tokens, dark mode, and accessibility-first patterns.",
      tags: ["React", "TypeScript", "Tailwind", "A11y", "Design System"],
      period: { start: "2024-01", end: "2024-06" },
      links: [
        { type: "github", url: "https://github.com/", label: "Source" },
        {
          type: "storybook",
          url: "https://example.com/storybook",
          label: "Storybook",
        },
      ],
      highlights: [
        "Token-driven theming with CSS variables",
        "Composable primitives with strong typing",
        "Automated visual regression tests",
      ],
    },
    {
      id: "proj-02",
      title: "Real-time Dashboard",
      tagline: "Streaming metrics and alerting",
      description:
        "A responsive dashboard for real-time metrics with server-sent events, skeleton loading states, and optimistic UI updates.",
      tags: ["Next.js", "React 19", "Server Components", "Streaming UI"],
      period: { start: "2024-03", end: "2024-09" },
      links: [
        { type: "demo", url: "https://example.com/demo", label: "Live Demo" },
        { type: "docs", url: "https://example.com/docs", label: "Docs" },
      ],
      highlights: [
        "Server Components for fast static routes",
        "Edge-friendly data access patterns",
        "Accessible charts and keyboard navigation",
      ],
    },
    {
      id: "proj-03",
      title: "E-commerce Micro-frontend",
      tagline: "Cart, checkout, payments",
      description:
        "Modular e-commerce features with route-level code-splitting, caching strategies, and payment integration.",
      tags: ["Next.js", "TypeScript", "Payments", "SSR", "Caching"],
      period: { start: "2023-07", end: "2023-12" },
      links: [
        { type: "github", url: "https://github.com/", label: "Source" },
        {
          type: "article",
          url: "https://example.com/blog",
          label: "Case Study",
        },
      ],
      highlights: [
        "Optimized CLS and LCP with image & font strategies",
        "Robust form UX and validation",
        "Secure checkout flows with PCI-compliant provider",
      ],
    },
  ],
  experience: [
    {
      company: "Acme Corp",
      role: "Frontend Engineer",
      period: { start: "2022-01", end: "Present" },
      location: "Remote",
      details: [
        "Delivered accessible UI for enterprise dashboards",
        "Led migration to TypeScript and component ownership",
        "Improved performance budgets and CI quality gates",
      ],
      skills: ["React", "Next.js", "TypeScript", "Testing"],
    },
  ],
};
