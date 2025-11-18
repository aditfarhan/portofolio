import HomeDeck from "@/components/HomeDeck";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Muhammad Aditia Farhan - Software Engineer Portfolio | React Next.js TypeScript Developer",
  description:
    "Professional software engineer Muhammad Aditia Farhan portfolio. 5+ years experience in React, Next.js, TypeScript. Healthcare tech, logistics platforms, scalable web apps. Jakarta Indonesia.",
  keywords: [
    "Muhammad Aditia Farhan portfolio",
    "software engineer Indonesia",
    "React developer Jakarta",
    "Next.js TypeScript expert",
    "healthcare technology developer",
    "logistics platform engineer",
    "scalable web applications",
    "frontend engineer Bandung",
    "full stack developer Indonesia",
    "enterprise software solutions",
  ],
  openGraph: {
    title:
      "Muhammad Aditia Farhan - Software Engineer | React, Next.js, Healthcare Tech",
    description:
      "View Muhammad Aditia Farhan's professional portfolio. Expert in React, Next.js, TypeScript with 5+ years building scalable applications for healthcare and logistics.",
    type: "website",
    url: "https://aditfarhan-portofolio.vercel.app",
    siteName: "Muhammad Aditia Farhan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Aditia Farhan - Software Engineer Portfolio",
    description:
      "Professional software engineer specializing in React, Next.js, TypeScript, and healthcare technology solutions.",
  },
};

export default function Home() {
  return (
    <>
      <HomeDeck />
      {/* Hidden SEO content for search engines */}
      <div className="sr-only">
        <h1>
          Muhammad Aditia Farhan - Professional Software Engineer Portfolio
        </h1>
        <p>
          Muhammad Aditia Farhan is a skilled software engineer with over 5
          years of experience specializing in React.js, Next.js, TypeScript, and
          healthcare technology solutions. Based in Jakarta and Bandung,
          Indonesia, he has worked on enterprise-scale applications for
          healthcare information systems, logistics platforms, and e-commerce
          ecosystems.
        </p>

        <h2>Technical Expertise</h2>
        <ul>
          <li>Frontend Development: React.js, Next.js, TypeScript, Vue.js</li>
          <li>Backend Development: Laravel, Node.js, REST APIs, GraphQL</li>
          <li>DevOps & Cloud: Docker, Kubernetes, CI/CD, GCP, AWS</li>
          <li>Databases: PostgreSQL, MySQL, MongoDB</li>
          <li>Tools: Git, Jenkins, Storybook, Figma</li>
        </ul>

        <h2>Professional Experience</h2>
        <h3>
          Software Engineer at PT. Pertamina Bina Medika IHC (2023-Present)
        </h3>
        <p>
          Leading digital transformation across Indonesia's hospital network,
          developing scalable EMR/HIS platforms used by medical teams
          nationwide.
        </p>

        <h3>Frontend Engineer at OrderOnline.id (2023)</h3>
        <p>
          Built logistics tracking applications and warehousing automation
          systems for SMEs, implementing feature flags and API standardization.
        </p>

        <h3>Frontend Engineer at Orami by SIRCLO (2021-2022)</h3>
        <p>
          Developed core modules for reseller, brand, and influencer platforms,
          creating scalable component foundations for high-traffic applications.
        </p>

        <h2>Key Projects</h2>
        <h3>National HIS & EMR Platform</h3>
        <p>
          Large-scale hospital information system serving corporate and regional
          hospitals across Indonesia with clinical workflows and hybrid
          deployments.
        </p>

        <h3>OEXpress Logistics Platform</h3>
        <p>
          Modern logistics platform for delivery tracking, revenue monitoring,
          and shipment management with reliability and smooth user experience.
        </p>

        <h3>IbuSibuk E-commerce Ecosystem</h3>
        <p>
          Multi-platform e-commerce solution for resellers, brands, and
          influencers with elegant user experiences and scalable frontend
          architecture.
        </p>

        <h2>Contact Information</h2>
        <p>
          Location: Jakarta & Bandung, Indonesia
          <br />
          Email: Available upon request
          <br />
          LinkedIn: linkedin.com/in/muhammad-aditia-farhan
          <br />
          Education: Bandung State Polytechnic (2020)
        </p>

        <h2>Skills & Technologies</h2>
        <p>
          Muhammad Aditia Farhan is proficient in modern web development
          technologies including React.js, Next.js, TypeScript, Node.js,
          Laravel, Docker, Kubernetes, PostgreSQL, MySQL, and various DevOps
          tools. He specializes in building scalable applications for
          healthcare, logistics, and e-commerce industries.
        </p>
      </div>
    </>
  );
}
