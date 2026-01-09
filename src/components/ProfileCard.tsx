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

  function handleShine(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
  }

  return (
    <div
      onMouseMove={handleShine}
      className="profile-card shine-card group relative h-full flex items-center justify-center"
    >
      {/* Decorative sparkles */}
      <div className="jewel-sparkle opacity-20" />
      <div className="jewel-sparkle opacity-10" />

      <div
        className={`
          flex flex-col items-center text-center
          ${isLarge ? "gap-3 py-4 px-4" : "gap-2 py-3 px-3"}
        `}
      >
        {/* ======================
            MAF MARK
        ====================== */}
        <div
          tabIndex={0}
          className={`
            maf-logo shine-card
            inline-flex items-center justify-center rounded-full
            border border-white/20 bg-card/60 text-white font-semibold
            transition-transform duration-300
            hover:scale-[1.06]
            ${isLarge ? "w-11 h-11 text-sm" : "w-9 h-9 text-xs"}
          `}
          aria-label="Personal mark"
        >
          MAF
        </div>

        {/* ======================
            IDENTITY
        ====================== */}
        <div className="space-y-0.5">
          <h1
            className={`
              font-extrabold tracking-tight
              transition-all duration-300
              ${isLarge ? "text-3xl" : "text-xl"}
              group-hover:-translate-y-[1px]
            `}
            style={{ letterSpacing: "-0.015em" }}
          >
            Muhammad Aditia Farhan
          </h1>

          <h2
            className={`
              text-white/80
              transition-all duration-300 delay-75
              ${isLarge ? "text-base leading-snug" : "text-sm leading-snug"}
              group-hover:text-white/90
            `}
          >
            Senior Full-stack Software Engineer
          </h2>
        </div>

        {/* ======================
            VALUE PROPOSITION
        ====================== */}
        <p
          className={`
            max-w-md text-white/65
            transition-all duration-300 delay-100
            ${isLarge ? "text-sm leading-relaxed" : "text-xs leading-relaxed"}
            group-hover:text-white/75
          `}
        >
          Building enterprise systems for healthcare, logistics, and
          e-commerce with a focus on reliability and long-term
          maintainability.
        </p>

        {/* Quiet credibility */}
        <p
          className="
            text-xs text-white/40
            transition-opacity duration-300 delay-150
            group-hover:text-white/55
          "
        >
          Production-hardened • Compliance-aware • Infrastructure-centric
        </p>

        {/* ======================
            CAPABILITY CHIPS
        ====================== */}
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {[
            "Full-stack Software Engineer",
            "5+ Years Production Systems",
          ].map((chip) => (
            <span
              key={chip}
              className="
                capability-chip
                px-3 py-1 rounded-full
                bg-white/10 text-white/80 font-medium
              "
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Location */}
        <p
          className="
            text-white/45 text-xs
            transition-opacity duration-300 delay-200
            group-hover:text-white/60
          "
        >
          Jakarta & Bandung • Open to remote & hybrid roles
        </p>

        {/* ======================
            ACTIONS
        ====================== */}
        {showActionButton && (
          <div className="mt-2 flex justify-center">
            <div className="action-group inline-flex items-center overflow-hidden">
              {/* PRIMARY CTA */}
              <button
                onClick={handleToggleFlip}
                disabled={isAnimating}
                className={`
                  action-cta underline-react
                  transition-transform duration-300
                  ${isAnimating ? "opacity-50" : "hover:opacity-90 hover:translate-x-[1px]"}
                `}
              >
                {isFlipped ? "← About Me" : "Explore Projects"}
              </button>

              <span aria-hidden="true" className="action-divider" />

              {/* UTILITY CTAs */}
              {[
                {
                  href: "mailto:aditiafarhan25@gmail.com",
                  icon: "icon-mail",
                  label: "Email",
                },
                {
                  href: "/ATS CV 2025 3.0 - Muhammad Aditia Farhan.pdf",
                  icon: "icon-download",
                  label: "Download CV",
                  download: true,
                },
                {
                  href: "https://www.linkedin.com/in/muhammad-aditia-farhan",
                  icon: "icon-linkedin",
                  label: "LinkedIn",
                  external: true,
                },
              ].map(({ href, icon, label, download, external }) => (
                <a
                  key={label}
                  href={href}
                  download={download}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="
                    action-icon
                    transition-all duration-200
                    hover:scale-[1.08]
                    hover:bg-white/10
                  "
                  aria-label={label}
                >
                  <svg className="w-5 h-5">
                    <use href={`/icons.svg#${icon}`} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ProfileCard;
