# Farhan Portfolio — Coffee + Soccer

A distinctive, compact, and accessible portfolio powered by Next.js App Router (React 19), styled with a unified Coffee + Soccer theme. Static-first rendering with a local, typed dataset and an interactive project explorer.

- Static-first Server Components (fast, SEO-friendly)
- Typed local dataset (no external fetches)
- Unified Coffee + Soccer theme and branded gradients
- Interactive Explorer: Search, Filter, Sort, Show More
- Strong accessibility (aria/live regions, keyboard, reduced motion)
- Tailwind CSS v4 + custom tokens/utilities

## Quick Start

- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`

## Highlights

- Interactive Portfolio Explorer:
  - Search with “/” keyboard shortcut to focus instantly
  - Tag filters (aria-pressed) with live updates
  - Sorting (Most recent, Title A–Z)
  - Progressive “Show more” pagination to keep pages compact
  - Keyboard-friendly controls with proper labels and roles
- Compact presentation:
  - Line clamping (2–3 lines) for concise overviews
  - Collapsible “Details” per project to reduce scrolling
  - About Me “Interests” hidden by default, revealed on demand
- Accessibility:
  - Skip-to-content link and visible focus rings
  - aria-live announcements for results count
  - Toolbar semantics for filters; descriptive aria-labels for external links
  - Respects Reduced Motion preferences globally
- Memorable identity:
  - Unified Coffee + Soccer palette and tokens
  - Branded gradient for slogan/CTAs; ambient hero textures
  - Themed, animated assets that remain subtle and refined

## Structure

- App shell and layout
  - [src/app/layout.tsx](src/app/layout.tsx)
  - [src/app/globals.css](src/app/globals.css)
- Home and routes
  - [src/app/page.tsx](src/app/page.tsx)
  - [src/app/portfolio/page.tsx](src/app/portfolio/page.tsx)
- Components
  - [src/components/PortfolioInteractive.tsx](src/components/PortfolioInteractive.tsx)
  - [src/components/Portfolio.tsx](src/components/Portfolio.tsx)
  - [src/components/ThemeProvider.tsx](src/components/ThemeProvider.tsx)
  - [src/components/ThemeSwitcher.tsx](src/components/ThemeSwitcher.tsx)
- Data (typed, local)
  - [src/data/portfolio.ts](src/data/portfolio.ts)
- Assets
  - [public/coffee-cup.svg](public/coffee-cup.svg), [public/soccer-ball.svg](public/soccer-ball.svg)

## Home Deck (One-screen Layout)

- Single-screen, two-column deck: left Hero, right flipping card (About | Projects)
- Flip by clicking the card, pressing Enter/Space with focus, or using Left/Right arrow keys; swipe horizontally on touch
- Inactivity auto-rotate every 15s; respects Reduced Motion and disables transitions
- No vertical scrolling: full viewport height with centered content and compact grids

### UtilityBar (Compact floating)

- Draggable, floating toolbar with:
  - Flip ← / → buttons
  - Direct goto: A (About), P (Projects)
  - Auto toggle: ▶ / ⏸
  - Theme chip: Coffee + Soccer
- Keyboard and screen-reader friendly: role=toolbar, aria-labels, and visible focus rings

## Interactive Explorer (UX Guide)

- Keyboard
  - “/” focuses search input from anywhere
  - Tab through tag filters and press Enter/Space to toggle (aria-pressed updates)
- Controls
  - Search: full-text match across title, tagline, description, and tags
  - Filters: popular tags as quick chips; multi-select supported
  - Sort: “Most recent” (by start period) or “Title A–Z”
  - Pagination: “Show more” reveals additional items to keep screens compact
- Accessibility
  - Role=toolbar for tag filters; labels on all controls
  - Results count announced via aria-live
  - Details per project use native <details/> + <summary/> for built-in accessibility

## Theming & Visual Identity

- Unified theme “coffee-soccer”:
  - Tokens: background, foreground, primary, accent, muted, border, ring
  - Brand trio: `--brand-a`, `--brand-b`, `--brand-c` for signature gradient accents
- Utilities (globals.css)
  - .brand-gradient (animated text gradient)
  - .btn-gradient (primary CTA gradient)
  - .grid-cards, .chip, .card-floating (tactile elevation)
  - .reveal micro-interaction and .clamp-2 / .clamp-3 line clamps
  - .hero background vignette and subtle texture (latte/pitch)

## Editing Content

All content lives in a typed module:

- [src/data/portfolio.ts](src/data/portfolio.ts)

Edit the exported `portfolio` object to update:

- Profile (name/title/location/email/social)
- Skills (string[])
- Projects (id/title/tagline/description/tags/links/period/highlights)
- Experience (company/role/period/location/details/links/skills)

## Accessibility Principles Applied

- Keyboard: logical tab order, shortcut to search
- Semantics: toolbar/labels/aria-pressed for filters; aria-live for counts
- Links: external targets labeled with “(opens in new tab)” for screen readers
- Motion: reduced-motion respected with global overrides
- Focus: visible outlines, skip-link for screen readers and keyboard users

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Start: `npm run start`
- Lint: `npm run lint`

## License

MIT
