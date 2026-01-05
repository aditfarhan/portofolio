import { memo, useCallback } from "react";
import "@/styles/profile-card.css";

interface ProfileCardProps {
  showActionButton?: boolean;
  size?: "large" | "small";
  onToggleFlip?: () => void;
  isFlipped?: boolean;
  isAnimating?: boolean;
}

const ProfileCard = memo(function ProfileCard({
  showActionButton = true,
  size = "large",
  onToggleFlip,
  isFlipped = false,
  isAnimating = false,
}: ProfileCardProps) {
  const isLarge = size === "large";

  const handleToggleFlip = useCallback(() => {
    if (isAnimating || !onToggleFlip) return;
    onToggleFlip();
  }, [isAnimating, onToggleFlip]);

  return (
    <div className="profile-card relative h-full flex items-center justify-center">
      {/* Decorative sparkles */}
      <div className="jewel-sparkle opacity-20" />
      <div className="jewel-sparkle opacity-10" />

      <div
        className={`
          flex flex-col items-center text-center
          ${isLarge ? "gap-3 py-4 px-4" : "gap-2 py-3 px-3"}
        `}
      >
        {/* MAF mark */}
        <div
          tabIndex={0}
          className={`
            maf-logo inline-flex items-center justify-center rounded-full
            border border-white/20 bg-card/60 text-white font-semibold
            ${isLarge ? "w-11 h-11 text-sm" : "w-9 h-9 text-xs"}
          `}
          aria-label="Personal mark"
        >
          MAF
        </div>

        {/* Identity */}
        <div className="space-y-0.5">
          <h1
            className={`font-extrabold tracking-tight ${isLarge ? "text-3xl" : "text-xl"
              }`}
            style={{ letterSpacing: "-0.015em" }}
          >
            Muhammad Aditia Farhan
          </h1>

          <h2
            className={`text-white/80 ${isLarge ? "text-base leading-snug" : "text-sm leading-snug"
              }`}
          >
            Senior Full-stack Software Engineer
          </h2>
        </div>

        {/* Value proposition */}
        <p
          className={`max-w-md text-white/65 ${isLarge ? "text-sm leading-relaxed" : "text-xs leading-relaxed"
            }`}
        >
          Building enterprise web systems for healthcare, logistics, and
          e-commerce with strong focus on reliability and long-term
          maintainability.
        </p>

        {/* Quiet credibility signal */}
        <p className="text-xs text-white/40">
          Production systems • Compliance-aware • Infra-conscious
        </p>

        {/* Capability chips */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          <span className="capability-chip px-3 py-1 rounded-full bg-white/10 text-white/80 font-medium">
            Full-stack Software Engineer
          </span>
          <span className="capability-chip px-3 py-1 rounded-full bg-white/10 text-white/80 font-medium">
            5+ Years Production Systems
          </span>
        </div>

        {/* Location */}
        <p className="text-white/45 text-xs">
          Jakarta & Bandung • Open to remote & hybrid roles
        </p>

        {/* Actions */}
        {showActionButton && (
          <div className="mt-2 flex justify-center">
            <div className="action-group inline-flex items-center overflow-hidden">
              <button
                onClick={handleToggleFlip}
                disabled={isAnimating}
                className={`action-cta ${isAnimating ? "opacity-50" : "hover:opacity-90"
                  }`}
              >
                {isFlipped ? "← About Me" : "Explore Projects"}
              </button>

              <span aria-hidden="true" className="action-divider" />

              <a
                href="mailto:aditiafarhan25@gmail.com"
                className="action-icon"
                aria-label="Email"
              >
                <svg className="w-5 h-5">
                  <use href="/icons.svg#icon-mail" />
                </svg>
              </a>

              <a
                href="/ATS CV 2025 3.0 - Muhammad Aditia Farhan.pdf"
                download
                className="action-icon"
                aria-label="Download CV"
              >
                <svg className="w-5 h-5">
                  <use href="/icons.svg#icon-download" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/in/muhammad-aditia-farhan"
                target="_blank"
                rel="noopener noreferrer"
                className="action-icon"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5">
                  <use href="/icons.svg#icon-linkedin" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ProfileCard;
