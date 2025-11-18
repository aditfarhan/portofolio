import React, { memo, useCallback } from "react";

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
    <div
      className={`h-full flex flex-col items-center justify-center text-center ${
        isLarge ? "gap-4" : "gap-3"
      }`}
    >
      {/* Classy sparkle elements */}
      <div className="jewel-sparkle"></div>
      <div className="jewel-sparkle"></div>
      <div className="jewel-sparkle"></div>
      <div className="jewel-sparkle"></div>

      <div
        className="w-full h-1.5 rounded-full bg-[linear-gradient(90deg,var(--brand-a),var(--brand-b),var(--brand-c))]"
        aria-hidden="true"
      ></div>

      <div
        className={`mx-auto mt-2 inline-flex items-center justify-center rounded-full border border-token bg-card/80 font-bold select-none ${
          isLarge ? "w-12 h-12" : "w-10 h-10"
        }`}
        aria-label="Avatar initials"
      >
        MAF
      </div>

      <h1
        className={`font-extrabold tracking-tight ${
          isLarge ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"
        }`}
      >
        Muhammad Aditia Farhan
      </h1>

      <div
        className={`text-muted text-center ${
          isLarge ? "text-xs sm:text-sm" : "text-xs"
        }`}
      >
        <p>Software Engineer · 5+ yrs · Bandung State Polytechnic '20</p>
        <p className="mt-1">
          High-impact scalable tech for essential industries
        </p>
        <p className="mt-1">Jakarta & Bandung, Indonesia</p>
      </div>

      {showActionButton && (
        <div className="mt-3 flex justify-center">
          <div
            role="group"
            aria-label="Profile actions"
            className="action-group inline-flex items-center overflow-hidden"
          >
            <button
              onClick={handleToggleFlip}
              disabled={isAnimating}
              className={`action-cta transition-all duration-300 ${
                isAnimating
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              aria-label={
                isFlipped
                  ? "Switch back to show About Me"
                  : "Switch to show Projects"
              }
            >
              {isFlipped ? "← About Me" : "Explore Projects →"}
            </button>

            <span aria-hidden="true" className="action-divider"></span>

            <a
              href="mailto:aditia.farhan@yourdomain.com"
              className="action-icon"
              aria-label="Email Muhammad Aditia Farhan"
              title="Email"
            >
              <svg className="w-5 h-5" aria-hidden="true" focusable="false">
                <use href="/icons.svg#icon-mail"></use>
              </svg>
            </a>

            <a
              href="/ATS CV 2025 3.0 - Muhammad Aditia Farhan.pdf"
              download="Muhammad_Aditia_Farhan_CV_2025.pdf"
              className="action-icon cv-download-btn"
              aria-label="Download CV"
              title="Download CV"
              onClick={(e) => {
                // Add download animation
                const button = e.currentTarget;
                button.classList.add("cv-download-animating");
                setTimeout(() => {
                  button.classList.remove("cv-download-animating");
                }, 2000);
              }}
            >
              <svg className="w-5 h-5" aria-hidden="true" focusable="false">
                <use href="/icons.svg#icon-download"></use>
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/muhammad-aditia-farhan"
              className="action-icon"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" aria-hidden="true" focusable="false">
                <use href="/icons.svg#icon-linkedin"></use>
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
});

export default ProfileCard;
