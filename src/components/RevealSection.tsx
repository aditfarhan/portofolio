"use client";

import { useScrollReveal } from "@/hooks";
import type { ComponentProps } from "react";

interface RevealSectionProps extends Omit<ComponentProps<"section">, "ref"> {
  threshold?: number;
}

interface RevealAsideProps extends Omit<ComponentProps<"aside">, "ref"> {
  threshold?: number;
}

export function RevealSection({ threshold, children, ...props }: RevealSectionProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      data-visible={visible ? "true" : undefined}
      {...props}
    >
      {children}
    </section>
  );
}

export function RevealAside({ threshold, children, ...props }: RevealAsideProps) {
  const { ref, visible } = useScrollReveal(threshold);
  return (
    <aside
      ref={ref as React.RefObject<HTMLElement>}
      data-visible={visible ? "true" : undefined}
      {...props}
    >
      {children}
    </aside>
  );
}
