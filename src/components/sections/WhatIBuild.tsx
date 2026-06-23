"use client";

import { memo } from "react";
import { useScrollReveal } from "@/hooks";

const BUILD_FOCUS = [
  {
    id: "healthcare",
    number: "01",
    title: "Healthcare Platforms",
    desc: "HIS, EMR, inpatient workflows, clinical documentation, and discharge summaries across hospital networks.",
    prominent: true,
  },
  {
    id: "interop",
    number: "02",
    title: "Interoperability",
    desc: "SATUSEHAT integration, HL7 FHIR transformation, legacy database connectors, and data validation pipelines.",
    prominent: true,
  },
  {
    id: "enterprise",
    number: "03",
    title: "Enterprise Systems",
    desc: "HCIS, secretariat platforms, employee data governance, and corporate workflow digitization.",
    prominent: false,
  },
  {
    id: "architecture",
    number: "04",
    title: "Scalable Architecture",
    desc: "React, Next.js, Docker, Kubernetes, CI/CD, feature flags, and component design systems.",
    prominent: false,
  },
] as const;

const WhatIBuild = memo(function WhatIBuild() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="what-i-build"
      className="relative py-16 sm:py-20"
      aria-label="What I build"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className={`mb-8 sm:mb-10 transition-all duration-slower ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <p className="text-2xs text-white/25 mb-2" style={{ letterSpacing: "var(--tracking-caps)" }} aria-hidden="true">
            02 · EXPERTISE
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-white" style={{ letterSpacing: "var(--tracking-tight)" }}>
            What I Build
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {BUILD_FOCUS.map((item, idx) => (
            <div
              key={item.id}
              className={`
                group relative rounded-lg border px-4 py-4 sm:px-5 sm:py-4
                transition-all duration-slow ease-out
                hover:-translate-y-[2px] hover:shadow-lg
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                ${item.prominent
                  ? "border-white/18 bg-surface-2 hover:border-white/28 hover:bg-surface-hover"
                  : "border-border-1 bg-surface-1 hover:border-border-2 hover:bg-surface-2"
                }
              `}
              style={{ transitionDelay: visible ? `${80 + idx * 60}ms` : "0ms" }}
            >
              <span className="absolute top-3 right-3 text-2xs text-white/18 font-mono select-none" aria-hidden="true">
                {item.number}
              </span>
              <h3
                className={`
                  font-semibold leading-tight mb-1.5
                  ${item.prominent ? "text-sm sm:text-base text-white/88" : "text-sm text-white/70"}
                `}
                style={{ letterSpacing: "var(--tracking-tight)" }}
              >
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed ${item.prominent ? "text-white/50" : "text-white/38"}`}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
});

export default WhatIBuild;
