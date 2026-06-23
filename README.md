# Muhammad Aditia Farhan — Portfolio

A precision-crafted software engineering portfolio built with **Next.js 16**, **React 19**, and **TypeScript**. Designed to communicate technical clarity and personal brand through deliberate architecture and cognitive UX principles.

**Live:** [aditfarhan-portofolio.vercel.app](https://aditfarhan-portofolio.vercel.app)

---

## Architecture

```
src/
├── app/                  # Next.js App Router
│   ├── layout.tsx         # Root layout: fonts, metadata, structured data (JSON-LD)
│   ├── page.tsx           # Single-page entry: renders HomeDeck
│   ├── sitemap.ts         # Dynamic sitemap from portfolio data
│   ├── robots.ts          # Crawl rules
│   └── opengraph-image.tsx # Edge-rendered OG image
├── components/
│   ├── HomeDeck.tsx       # Root orchestrator: card layout + flip state
│   ├── ProfileCard.tsx    # Identity card (front-face)
│   ├── AboutMe.tsx        # Principles + skills card (right)
│   ├── ProjectCard.tsx    # Projects viewer with keyboard + swipe nav
│   ├── ProjectEntry.tsx   # Individual project log entry
│   ├── BackgroundEffects.tsx # Stars, moon, meteors (lazy-loaded)
│   ├── ErrorBoundary.tsx  # Graceful fallback for ProjectsViewer
│   └── ThemeProvider.tsx  # Applies data-theme attribute (no external dep)
├── data/
│   └── portfolio.ts       # Single source of truth for all project data
├── hooks/
│   ├── useFlipAnimation.ts # Card flip state with animation guard
│   ├── useCountUp.ts      # Shared rAF loop for stat counters
│   ├── useShineEffect.ts  # rAF-throttled cursor shine effect
│   └── index.ts
├── lib/
│   ├── utils.ts           # formatDate (UTC-safe)
│   ├── constants.ts       # Star/meteor animation configs
│   └── performance.ts     # Web vitals helpers
├── styles/
│   ├── globals.css        # Design tokens, Tailwind base
│   ├── components.css     # Background effects, about card, shared components
│   ├── profile-card.css   # Profile card: spotlight, action group, availability badge
│   ├── project-card.css   # Project entry: company badge, tags, links, nav
│   ├── single-focus.css   # Card flip layout, landscape breakpoints
│   └── responsive.css     # Global responsive overrides
└── types/
    └── index.ts           # All TypeScript types (only used types kept)
```

---

## Key Design Decisions

### Cognitive UX
- **Numbers-first stat row** on Profile Card — "5+ yrs · 12+ hospitals" — pattern-matches how people scan credentials. Numbers are anchors; labels are context.
- **Reading-flow vertical rail** on Profile Card — a faint `1px` line on the left guides eye movement from MAF mark → name → stats → CTA. Brightens on hover.
- **"clarity" emphasis** in About Me thesis — single italic word as visual hook without disrupting prose flow.
- **Decision → Outcome label grammar** in Project entries — "Decision" is brighter (cause); "Outcome" is dimmer (effect). Encodes causality visually.
- **Lazy stat counters** re-trigger via `IntersectionObserver` each time the About card enters the viewport — the animation always plays on arrival, never stale.

### Performance
- **`BackgroundEffects` lazy-loaded** via `React.lazy` — deferred until after TTI. Stars/meteors/moon are decoration, not layout-critical.
- **Back-face cards lazy-mounted** (`{isFlipped && <Component />}`) — `ProjectsViewer` and the back `ProfileCard` don't exist in the DOM until the card flips, eliminating 3 unnecessary `useEffect` runs at startup.
- **Single unified rAF loop** for all 3 count-up stat counters in About Me — not 3 separate `requestAnimationFrame` chains.
- **rAF throttle** on `handleShine` mousemove — style recalculations capped to once per frame, not 120Hz raw.
- **`ResizeObserver`** gates the project scroll-fade gradient — only visible when content actually overflows (no false "more below" on short projects).

### Accessibility
- `aria-live` in ProjectCard uses a DOM write (`ref.current.textContent = …`) for guaranteed screen reader announcement on fast keyboard navigation.
- Progress dots use `role="radiogroup"` + `role="radio"` + `aria-checked` — correct ARIA pattern for a step selector.
- Arrow key navigation in projects calls `contentRef.current?.focus()` after navigation, moving keyboard focus to the content region.

### Security
Full security header suite in `next.config.ts`:
- **Content-Security-Policy** (script-src, style-src, img-src, connect-src, frame-ancestors)
- X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

---

## Running Locally

```bash
npm install
npm run dev        # http://localhost:3000
```

**Bundle analysis:**
```bash
npm run analyze    # Opens webpack bundle visualizer
```

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Next.js 16 (App Router) | Turbopack dev, edge metadata, RSC |
| UI | React 19 + TypeScript | Concurrent rendering, typed everything |
| Styling | Tailwind CSS v4 + vanilla CSS | Utilities for composition, hand-rolled for complex motion |
| Analytics | Vercel Analytics + Speed Insights | Core Web Vitals tracking in production |
| Deployment | Vercel | Zero-config, edge network, OG image generation |

---

## Portfolio Data

All project data lives in [`src/data/portfolio.ts`](./src/data/portfolio.ts).  
Add or edit projects there — the structured data in `layout.tsx`, project count labels, and sitemap all update automatically.
