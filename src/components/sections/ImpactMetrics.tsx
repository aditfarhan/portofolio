"use client";

import { memo } from "react";
import { useScrollReveal } from "@/hooks";
import { useCountUp } from "@/hooks";

// Numeric count-up targets — must match METRICS order
const TARGETS = [5, 12, 4] as const;

interface MetricCardProps {
  value:   string | number;
  label:   string;
  context: string;
  visible: boolean;
  delay:   number;
}

function MetricCard({ value, label, context, visible, delay }: MetricCardProps) {
  return (
    <div
      className={`
        impact-metric-card
        transition-all duration-slower
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}
      `}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      <p
        className="metric-value"
        aria-label={`${value} ${label}`}
        aria-atomic="true"
      >
        {value}
      </p>
      <p className="impact-metric-label">{label}</p>
      <p className="impact-metric-context">{context}</p>
    </div>
  );
}

const ImpactMetrics = memo(function ImpactMetrics() {
  const { ref, visible } = useScrollReveal(0.12);
  const [years, hospitals, industries] = useCountUp([...TARGETS], 1000, visible);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="impact"
      className="relative py-10 sm:py-12"
      aria-label="Career impact metrics"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <MetricCard
            value={`${years}+`}
            label="Years Experience"
            context="Healthcare, logistics, e-commerce & telecom"
            visible={visible}
            delay={0}
          />
          <MetricCard
            value={`${hospitals}+`}
            label="Hospitals"
            context="Nationwide HIS/EMR deployment under Pertamina IHC"
            visible={visible}
            delay={70}
          />
          <MetricCard
            value={industries}
            label="Industries"
            context="Healthcare · Logistics · E-commerce · Telecom"
            visible={visible}
            delay={140}
          />
          <MetricCard
            value="1000s"
            label="Daily Clinical Transactions"
            context="Handled by production HIS/EMR at active hospitals"
            visible={visible}
            delay={210}
          />
        </div>
      </div>
    </section>
  );
});

export default ImpactMetrics;
