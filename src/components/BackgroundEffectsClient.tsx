"use client";

import dynamic from "next/dynamic";

const BackgroundEffects = dynamic(
  () => import("@/components/BackgroundEffects"),
  {
    ssr: false,
    loading: () => <div className="night-sky" aria-hidden="true" />,
  }
);

export default function BackgroundEffectsClient() {
  return <BackgroundEffects />;
}
