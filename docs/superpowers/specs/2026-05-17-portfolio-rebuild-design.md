# Portfolio Rebuild — Design Spec

**Date:** 2026-05-17
**Owner:** Amaan Khan
**Status:** Approved, ready for plan

## Context

The current portfolio at `amaankhan63.github.io` is a single-page Vite + React + shadcn site originally scaffolded via Lovable.dev. It underperforms as a hiring artifact: it's a generic dev portfolio rather than something that signals taste to AI-startup founders evaluating Amaan for founding/early-engineer roles.

The rebuild is fully specified in `portfolio-instructions.md` (a handoff doc in the repo root). That document describes a Next.js 15 + MDX implementation. This spec **adapts that brief to the existing Vite + React 18 + TypeScript + Tailwind stack** rather than introducing Next.js — the user has chosen to evolve the current repo, not start over.

### Audience and job-to-be-done

Defined in `portfolio-instructions.md`: in under 60 seconds, convince a technical founder or hiring manager at a seed/Series A AI startup that Amaan is an AI-native solo shipper they should talk to.

### Source of content

The site copy is drawn from Amaan's **new resume** (`job-search/Amaan.tex`), not the older numbers that appear inline in `portfolio-instructions.md`. The new resume is sharper: Founding Engineer title, $500K+ signed contracts, FDE forks across MillerKnoll/Schneider Electric/NAC, Sustainability AI in beta 2026. The case study slugs from `portfolio-instructions.md` are kept; the content underneath them is rewritten off the new resume.

## Non-goals for v1

- A CMS or admin UI
- Real writing posts (skeleton only)
- Custom analytics
- A pixel-perfect custom OG image (placeholder, marked for replacement)
- Tests of any kind beyond the existing vitest placeholder
- Performance work past a clean Lighthouse score
- Theme toggle in the UI was not in the original brief — added per user request (see Design system § Light/dark below)

## Architecture

### Stack — what stays, what changes

**Stays:**
- Vite 5 + React 18 + TypeScript + Tailwind 3 (build pipeline unchanged)
- React Router (BrowserRouter — already present, see CLAUDE.md note about HashRouter → BrowserRouter churn)
- `next-themes` (already in `package.json`, currently unused — activated for light/dark)
- shadcn/ui directory at `src/components/ui/` — left intact, tree-shaken away if unused
- GitHub Actions deploy workflow at `.github/workflows/deploy.yml`
- vitest harness (no new tests added)
- TanStack Query, Toaster, Sonner — unused but harmless; cleanup is noise

**Removed:**
- All current section components: `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Skills.tsx`, `Education.tsx`, `Contact.tsx`, `Header.tsx`, `NavLink.tsx`, `Footer.tsx`
- `pages/Index.tsx` (replaced by `pages/home.tsx`)
- `src/assets/profile-photo.png` (old)
- `public/placeholder.svg` (if unused after rebuild)

**Added:**
- 5 page components (home, about, work index, writing, 4 case studies)
- 5 reusable components (footer, nav, theme-toggle, work-row, case-study-layout)
- Renamed asset: `src/assets/profile-generated.png` → `src/assets/profile.png`
- Postbuild SPA-fallback script in `package.json`
- Resume PDF at `public/resume.pdf` (user-supplied)
- New `src/index.css` (full rewrite of design tokens)
- Updated `tailwind.config.ts` (new color/font tokens)
- Updated `src/App.tsx` (new routes + ThemeProvider)

### File structure (post-rebuild)

```
src/
├── App.tsx                       # Routes + ThemeProvider
├── main.tsx                      # Unchanged
├── index.css                     # Rewritten — new design tokens
├── components/
│   ├── footer.tsx                # Email · GitHub · LinkedIn · X + theme toggle
│   ├── nav.tsx                   # Top nav for non-home pages
│   ├── theme-toggle.tsx          # Sun/Moon icon toggle
│   ├── work-row.tsx              # Row used on homepage + /work index
│   ├── case-study-layout.tsx     # Shared layout for /work/[slug]
│   └── ui/                       # Existing shadcn — untouched
├── pages/
│   ├── home.tsx                  # /
│   ├── about.tsx                 # /about (with photo + #hiring anchor)
│   ├── work.tsx                  # /work index
│   ├── writing.tsx               # /writing skeleton
│   ├── not-found.tsx             # Existing, restyled
│   └── work/
│       ├── cost-estimation.tsx
│       ├── multi-provider-ai.tsx
│       ├── wopi-adidas.tsx
│       └── realtime-collab.tsx
├── lib/
│   └── work-items.ts             # Shared data for homepage/work index rows
└── assets/
    └── profile.png               # Renamed from profile-generated.png
```

### Routing and GH Pages SPA fallback

Routes in `App.tsx`:

```
/                          home.tsx
/about                     about.tsx
/work                      work.tsx
/work/cost-estimation      work/cost-estimation.tsx
/work/multi-provider-ai    work/multi-provider-ai.tsx
/work/wopi-adidas          work/wopi-adidas.tsx
/work/realtime-collab      work/realtime-collab.tsx
/writing                   writing.tsx
*                          not-found.tsx
```

GitHub Pages has no server-side routing — a direct visit to `/work/cost-estimation` would 404 because no `dist/work/cost-estimation/index.html` exists. The standard fix: GH Pages serves `404.html` for unknown paths, so if `404.html` is identical to `index.html`, the React app boots and React Router resolves the route client-side.

Implementation: add a `postbuild` script in `package.json`:

```json
"postbuild": "node -e \"require('fs').copyFileSync('dist/index.html', 'dist/404.html')\""
```

Cross-platform (no shell-specific syntax). Runs automatically after `npm run build` via the npm `pre`/`post` hook convention. Verified to work on `peaceiris/actions-gh-pages` (the action used in the existing deploy workflow).

### Why not MDX, why not Next.js

- **MDX:** the `portfolio-instructions.md` brief calls for MDX. Adding `@mdx-js/rollup` to Vite is workable but introduces a build-time plugin, TypeScript shims, and prose-vs-component ambiguity in each file. The case studies are 400–700 words each with one diagram — TSX with raw JSX handles that with no extra plumbing. Decision: TSX.
- **Next.js:** the brief assumes Next.js. Migrating would mean deleting nearly the whole repo (Vite config, vite-plugin-react-swc, the existing GH Actions workflow, the test harness, the path alias setup). The user explicitly chose to adapt the existing repo. Decision: Vite stays.

## Design system

### CSS variables (`src/index.css`)

Full rewrite. The existing tokens (square corners, offset shadows, three font families, near-white #FFFFFF background) are replaced wholesale.

```css
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300..700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --bg: 39 22% 97%;        /* #FAFAF7 warm off-white */
    --fg: 0 0% 10%;          /* #1A1A1A near-black */
    --muted: 0 0% 42%;       /* #6B6B6B */
    --border: 36 19% 90%;    /* #E8E6E1 */

    /* ─── Active accent — uncomment one line ─── */
    --accent: 24 90% 37%;       /* amber */
    /* --accent: 162 43% 21%;       forest */
    /* --accent: 8 50% 36%;         terracotta */
    /* --accent: 244 100% 67%;      stripe blurple */
    /* --accent: 212 100% 48%;      vercel blue */
    /* --accent: 226 79% 49%;       cobalt */
    /* --accent: 14 100% 57%;       sentry orange */
    /* --accent: 349 78% 51%;       crimson */
    /* --accent: 191 91% 36%;       cyan */
    /* --accent: 0 57% 26%;         deep crimson */
    /* --accent: 313 41% 26%;       plum */
    /* --accent: 17 90% 41%;        burnt orange */
  }

  .dark {
    --bg: 0 0% 6%;           /* warm near-black */
    --fg: 39 22% 97%;
    --muted: 0 0% 60%;
    --border: 0 0% 18%;
    /* --accent inherits — same hex works on both modes */
  }

  body {
    background: hsl(var(--bg));
    color: hsl(var(--fg));
    font-family: var(--font-sans);
  }
}
```

All colors HSL (per existing CLAUDE.md convention). The accent block is the **swap mechanism**: edit one line in this file, hot-reload picks it up in ~2 seconds. Same hex works on light and dark — accent values were chosen at contrasts that pass WCAG AA on both `#FAFAF7` and a warm near-black background.

`tailwind.config.ts` wires these as utility classes:

```ts
extend: {
  colors: {
    bg: 'hsl(var(--bg))',
    fg: 'hsl(var(--fg))',
    muted: 'hsl(var(--muted))',
    border: 'hsl(var(--border))',
    accent: 'hsl(var(--accent))',
    'accent-soft': 'hsl(var(--accent) / 0.06)',
  },
  fontFamily: {
    serif: ['Fraunces', 'serif'],
    sans: ['Inter Tight', 'system-ui', 'sans-serif'],
  },
}
```

Tokens used as `bg-bg`, `text-fg`, `text-muted`, `border-border`, `text-accent`, `bg-accent-soft`, `font-serif`, `font-sans`.

### Fonts

- **Fraunces** for serif headings: variable optical-size axis (9–144), variable weight (300–900). Renders cleanly at the 48–56px name on the homepage.
- **Inter Tight** for sans body: weights 300–700.

Loaded via Google Fonts `@import` in `src/index.css`. The instructions' suggestion of `next/font` doesn't apply (Next-only). Google's `display=swap` is acceptable for a portfolio at this scale.

### Light/dark mode

Not in the original brief — added per user request.

- `next-themes` ThemeProvider wraps the route tree in `App.tsx`
- `defaultTheme="system"`, `enableSystem={true}` — auto-detects OS preference on first visit
- User choice persisted in `localStorage` via `next-themes`
- Toggle is a small icon button in the footer (next to `Email · GitHub · LinkedIn · X`)
- Sun/Moon icons from `lucide-react` (already installed)
- `<html class="dark">` toggling is handled by `next-themes`; Tailwind's `darkMode: 'class'` reads that class
- The accent palette uses the same hex for both modes (verified contrast on each)
- `prefers-reduced-motion: reduce` disables the homepage page-load stagger (via CSS media query)

### Animation

A single CSS animation, only on the homepage.

```css
@keyframes stagger-in {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.stagger-1 { animation: stagger-in 200ms ease-out 0ms both; }
.stagger-2 { animation: stagger-in 200ms ease-out 80ms both; }
.stagger-3 { animation: stagger-in 200ms ease-out 160ms both; }

@media (prefers-reduced-motion: reduce) {
  .stagger-1, .stagger-2, .stagger-3 { animation: none; }
}
```

Applied to: name, tagline, status paragraph. No other motion site-wide except `transition-colors duration-150` on hover states.

### Responsive

Mobile-first. The homepage on mobile stacks vertically with 16px horizontal padding. Work rows collapse — year on its own line, title + description below, arrow at the right of the title. Case study pages use a single column with 16–20px side padding. Tailwind breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px). Max content width on most pages ~680px.

### Accessibility

- Semantic HTML: `<main>`, `<nav>`, `<article>`, `<section>`
- All interactive elements keyboard-accessible with 2px focus ring in `--accent` at 2px offset
- WCAG AA contrast — verified on both modes
- `alt` text on the `/about` photo; decorative dividers `aria-hidden`
- `prefers-reduced-motion` respected (see Animation)

## Page-by-page content

### Homepage (`/`)

Three sections per `portfolio-instructions.md`.

**1. Identity (above fold)**

```
Amaan Khan
(Fraunces, 48–56px)

Software engineer. I ship AI-native products end-to-end
for enterprise customers — design through deployment, solo.
(Inter Tight, 18–20px)

Currently at Naya Studio. Open to founding-engineer roles.
(Inter Tight, 18–20px, muted)
```

Below: single horizontal rule, then row of links — `Work · Writing · About · GitHub`. Underline on hover only.

**2. Selected work**

Heading `Selected work` (uppercase, 12px, tracking 0.08em, muted). Four clickable rows linking to case studies, **using new resume data**:

```
2025–Present  Cost Estimation          Founding engineer. Solo-built. $500K+ signed enterprise contracts, 4k+ estimations in production.    →
2024          Multi-provider AI        10 providers, 50+ models. Powered a $200K+ Adidas deal plus MillerKnoll ARR.                          →
2024          WOPI for Adidas          In-platform Microsoft Office editing. Enterprise rollout to Adidas teams.                              →
2023          Real-time collaboration  WebSockets + MongoDB Change Streams + YJS for simultaneous multi-user editing.                         →
```

Row layout: grid of year | title | description | arrow. Hover: arrow translates 4px right, row gets `bg-accent-soft`. Each row 60–80px tall. Not cards — rows.

**3. Now**

```
Shipping AI-native products at Naya Studio — currently a Founding
Engineer on Cost Estimation and Sustainability AI (Beta 2026).
Writing about multi-provider orchestration and shipping solo with
Claude Code.

Open to early-engineer roles at seed/Series A AI startups —
remote, founding compensation conversation welcome.
```

"early-engineer roles at seed/Series A AI startups" links to `/about#hiring`.

**Footer:** `Email · GitHub · LinkedIn · X · [theme toggle]` (muted, dot separators, no icons except the toggle).

### /about

Three sections.

**1. Photo + "How I work"**

`profile.png` (renamed from `profile-generated.png`), ~140px square, at top of page. Color (the warm grey backdrop pairs with `#FAFAF7`). Followed by a 200–300 word first-person essay covering: AI-native tools as daily drivers (Claude Code, Cursor), solo end-to-end ownership, comfort with ambiguity and direct customer contact, shipping over over-engineering. No bullet points.

**2. Background**

Short prose bio: B.Tech CS at Swami Ramanand Teerth Marathwada University (2019–2023), Naya Studio since Nov 2022, currently Founding Engineer on Cost Estimation and Sustainability AI.

**3. Hiring (anchor `#hiring`)**

Per the instructions, with the new Cal.com URL filled in:

```
I'm open to founding-engineer or early-engineer roles at seed or
Series A AI startups, remote, with founding compensation (meaningful
equity + market cash). I work best with founders who ship weekly,
hire for ownership, and use AI-native tools as daily drivers rather
than experiments. If that's you, email me.

Or book a 30-minute call directly.
```

- "email me" → `mailto:amankhanak063@gmail.com`
- "book a 30-minute call directly" → `https://cal.com/amaan-khan/intro`

The Cal.com link appears nowhere else on the site.

### Case studies — content per slug

All four use `case-study-layout.tsx` for the common scaffolding (breadcrumb, title, subtitle, metadata strip, footer prev/next nav).

**`/work/cost-estimation`** — drawn from new resume

- Title: `Cost Estimation`
- Subtitle: `Solo-built the AI Cost Estimation product as Founding Engineer. Its codebase became the foundation for FDE forks across MillerKnoll, Schneider Electric, and NAC.`
- Metadata: Role `Founding Engineer · Solo` · Stack `Node.js, MongoDB, Anthropic, Gemini, Firebase, GCP, Sentry` · Customers `MillerKnoll, Schneider Electric, NAC` · Year `2025–Present`
- Problem, What I built (8-stage LLM workflow, editable intermediate outputs, per-stage Mongo persistence, user-selectable Opus/Gemini), How it works (architecture diagram: input → classify → load industry markdown context → 6 downstream stages → reconciliation → PDF), Outcome ($500K+ signed contracts, 4,000+ estimations in prod, 16 vertical industry knowledge system), What I'd do differently (TODO).

**`/work/multi-provider-ai`**

- Title: `Multi-provider AI orchestration`
- Subtitle: `10 providers, 50+ models powering enterprise generation workflows.`
- Metadata: Role `Software Developer` · Stack `TypeScript, Node, MongoDB, pub/sub, WebSockets` · Customers `Adidas, MillerKnoll` · Year `2024`
- Diagram: frontend → provider router → pub/sub queue → workers (fallback controller wrapping provider calls) → completion event via WebSocket. Hunyuan custom service noted as a sub-pipeline bypassing Tencent's hosted limits.
- Outcome: $200K+ Adidas deal, MillerKnoll ARR contribution.

**`/work/wopi-adidas`**

- Title: `WOPI integration for Adidas`
- Subtitle: `In-platform Microsoft Office editing for Adidas enterprise teams.`
- Diagram: WOPI protocol handshake (host ↔ Office Online server flow with access tokens).
- Outcome: enterprise rollout; mention CSPP/WOPI mentoring outside Naya.

**`/work/realtime-collab`**

- Title: `Real-time collaboration system`
- Subtitle: `Simultaneous multi-user editing via WebSockets + MongoDB Change Streams + YJS.`
- Diagram: client YJS doc ↔ WebSocket ↔ server ↔ MongoDB Change Stream feedback loop.
- Outcome: production-grade collaboration across Naya's Workflow platform.

Note: `portfolio-instructions.md` describes a fourth case study at slug `manufacturing-cost-estimation`. The new resume uses `cost-estimation` as the canonical name (no "manufacturing" qualifier). Spec uses the resume's framing.

**TODOs in case studies (left for Amaan):**
- "What I'd do differently" section in each
- Any specific metric numbers Amaan wants to refine (e.g., precise image-load improvement %, memory reduction figures)
- Optional inline code snippets

### `/work` (index)

Standalone page; lifts the `Selected work` section from the homepage. Same rows, same component (`work-row.tsx`). Heading `Work`. No additional content.

### `/writing`

Skeleton:
```
Writing

Notes on shipping AI-native products, multi-provider orchestration,
and solo engineering at scale.

First posts coming soon.
```

Routing-ready but no markdown loader for v1. When Amaan adds posts later, the layout is in place.

### Not-found (`*`)

Existing `NotFound.tsx` restyled to match the new design tokens. Single-line message, link back to home.

## Deployment

The existing `.github/workflows/deploy.yml` already builds and pushes to `gh-pages` via `peaceiris/actions-gh-pages@v3`. No workflow changes — the postbuild script in `package.json` runs as part of `npm run build`, so the `404.html` fallback ships automatically.

`vite.config.ts` keeps `base: '/'` (repo is `amaankhan63.github.io`, served at root — see CLAUDE.md). No changes there.

## SEO and metadata

- `<title>` per page set via `react-helmet-async` (light addition, ~6KB) OR via direct DOM manipulation in a small effect. **Decision: skip a helmet library; set `document.title` in each page component's effect.** Avoids a dependency for one use case.
- Description meta: set at build time in `index.html` (homepage description from instructions). Per-page description set via a tiny effect alongside title.
- OG image: placeholder `og.png` in `/public/` for v1, marked for replacement.

## Workflow and version control

- All work on `main` branch directly. No feature branch, no PR.
- Commit cadence: one commit per major milestone (scaffold cleanup → design system + tokens → home → about → 4 case studies → work index + writing skeleton → SPA fallback + deploy).
- The design doc itself is committed as part of the initial spec/plan commit.
- No push to remote without explicit user approval.

## Open items (TODOs in code)

These will appear as `{/* TODO: Amaan to fill in */}` JSX comments in the relevant files:

1. "What I'd do differently" section in each of 4 case studies
2. Any specific metric numbers Amaan wants refined
3. Optional inline code snippets in case studies
4. Custom OG image (placeholder ships for v1)

## Risks and what could go wrong

1. **Font rendering mismatch.** Fraunces' variable axes look excellent in Chrome/Edge but Firefox handles `opsz` slightly differently. Mitigation: visual check in both browsers at step "design system in place."
2. **GH Pages 404.html cache.** First deploy after adding the fallback may see cached 404s for ~10 minutes. Mitigation: known behavior, no action needed beyond patience.
3. **Theme toggle hydration flicker.** `next-themes` mounts after first paint; users with `localStorage` setting opposite system preference can briefly see the wrong theme. Mitigation: `next-themes` ships a `<Script>` for this in Next.js, but the manual equivalent in Vite is a small inline script in `index.html` that sets `class="dark"` on `<html>` before React mounts. Will include.
4. **Accent contrast regression on dark mode.** Most accents pass on both modes but the lighter ones (cyan `#0891B2`, stripe blurple `#635BFF`) are tightest against the dark background. Mitigation: contrast verified during implementation; if any fails AA on dark mode, add a dark-mode-only override for that specific hex.
5. **Cost Estimation case study leaking confidential details.** The new resume mentions "MillerKnoll, Schneider Electric, NAC" and exact contract value ($500K+). Mitigation: these are already publicly stated on Amaan's resume and on the LinkedIn version of his profile — no incremental disclosure on the portfolio.

## Success criteria

- Lighthouse scores ≥95 on all four categories (Performance, Accessibility, Best Practices, SEO).
- Homepage renders without scrolling on a 13" laptop (1440×900) — verified.
- Direct visit to `/work/cost-estimation` resolves correctly on the deployed GH Pages site.
- Light/dark toggle works without flicker on first paint.
- Editing one line in `src/index.css` swaps the accent color across the entire site without other code changes.
- The site looks like it was made by someone who has taste and ships (the brief's final note).
