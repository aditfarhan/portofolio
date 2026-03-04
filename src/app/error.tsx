"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center h-[100dvh] bg-background px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Something went wrong
        </h1>
        <p className="text-muted mb-6">
          We encountered an error while loading the portfolio. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-accent text-background rounded-md hover:bg-accent/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
