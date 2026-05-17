# Portfolio Rebuild — Instructions for Claude Code

## Context for you (Claude Code)

You're rebuilding a portfolio site for Amaan Khan, a software engineer with ~3.5 years at Naya Studio (SaaS startup serving enterprise clients). His current portfolio is on GitHub Pages and underperforms. You will replace it.

Read this entire document before writing any code. The strategy and design rationale matter — they drive the implementation. Do not skim ahead to the file structure section and start coding from there.

---

## The job this portfolio has to do

**Primary goal:** convince a technical founder or hiring manager, in under 60 seconds, that Amaan is an AI-native solo shipper they should talk to.

This is not a generic developer portfolio. The visitors are:

1. **Founders of seed/Series A AI startups** browsing applicants for founding/early-engineer roles
2. **Hiring managers at AI-native companies** (YC, Wellfound)
3. **Solo builders** evaluating whether Amaan is the technical partner they need

What they care about, in order: can he ship end-to-end alone, has he done it for real customers, does he understand AI-native development, can they trust the engineering. They do NOT care about: skills lists, progress bars, animated hero text, a contact form, downloadable CV buttons styled as primary CTAs, a section called "About Me" written in third person.

The portfolio must answer their questions before they ask, in the order they'd ask them, and stop.

---

## Design direction — non-negotiable

**Typography-led, minimal, technical-but-warm.** Think Linear's website, Vercel's marketing pages, Rauno Freiberg's personal site, Brian Lovin's site, Paco Coursey's site. Reference these mentally — do not copy them.

Specifically this means:

- **Light or near-light background by default.** Off-white (`#FAFAF9` or similar), not pure white. Dark mode toggle is acceptable but not required for v1; if you build it, do it properly with a system-preference default, not as decoration.
- **One accent color, used sparingly.** A single warm accent (a deep amber, a forest green, or a muted terracotta — pick one and commit). Used for links, hover states, and at most one decorative element per page. Not a gradient. Not purple.
- **Generous whitespace.** Max content width ~640–720px on the homepage. Reading like an essay, not a brochure.
- **Real typography.** Use a distinctive serif for headings (suggestions: Fraunces, Newsreader, GT Sectra, Tiempos, Source Serif) paired with a clean sans for body (suggestions: Inter Tight, Geist, Söhne, Untitled Sans). Do not use Roboto, Arial, Open Sans, or default system fonts. Pick one serif + one sans and stick with them site-wide.
- **No hero illustrations, no stock graphics, no 3D blobs, no animated gradient backgrounds.** The content is the design.
- **Subtle motion only.** A single page-load stagger reveal on the homepage (200ms total, fade + 4px upward translate) is the most you should do. No scroll-jacking. No parallax. No mouse-tracking effects.
- **Density on case study pages is OK.** Homepage is sparse, case studies can be denser with diagrams, code snippets, and screenshots.

If you find yourself reaching for a gradient, a glow, a glassmorphism panel, or a particle effect — stop. That's the AI-slop aesthetic. Resist.

---

## Site structure

Five pages total. No more.

```
/                  → Homepage (the 60-second pitch)
/work              → Case studies index
/work/[slug]       → Individual case study (4 of these)
/writing           → Writing index (empty for now, structure ready)
/about             → Longer-form bio + how he works
```

No `/contact` page. Contact links live in the footer of every page and on `/about`. No `/skills` page or section. No `/resume` page (the resume is a downloadable PDF linked from `/about`).

---

## Homepage — exact structure and copy

The homepage is the single most important page. It must work without scrolling on a 13" laptop and reward scrolling for the curious. Use this exact structure:

### Section 1: Identity (above the fold)

```
Amaan Khan

Software engineer. I ship AI-native products end-to-end
for enterprise customers — design through deployment, solo.

Currently at Naya Studio. Open to founding-engineer roles.
```

That's it. No photo. No "Hello, I'm…" Three lines, generous line-height, the serif on the name (large but not huge — 48–56px), the sans for the rest (18–20px). Below this, a single horizontal rule and a row of links: `Work`, `Writing`, `About`, and one external link (GitHub). Links are underlined on hover only — never by default.

### Section 2: Selected work (below the fold)

Heading: `Selected work` (small, uppercase, letter-spaced — 12px, tracking 0.08em, muted color).

Then four entries, each one row:

```
2024–2025    Manufacturing Cost Estimation    Solo-shipped AI product. In use at Schneider Electric, MillerKnoll, MIT.    →
2024         Multi-provider AI orchestration  8 providers, 40+ models, dynamic routing and fallbacks. Six-figure ARR.     →
2024         WOPI integration for Adidas      In-platform Microsoft Office editing. Enterprise rollout to Adidas teams.   →
2023         Real-time collaboration system   WebSockets + MongoDB Change Streams + YJS. Multi-user concurrent editing.    →
```

These are clickable rows that go to `/work/[slug]`. On hover: the arrow (`→`) translates 4px right, the row gets a subtle background tint (the accent color at 4% opacity). Each row is roughly 60–80px tall with the year/title/description in a clean grid.

Do NOT make these cards with images and shadows. Rows. Just rows.

### Section 3: Now (small section, below selected work)

Heading: `Now` (same style as `Selected work`).

One short paragraph:

```
Shipping AI-powered features at Naya Studio. Writing about
multi-provider AI orchestration and shipping solo with Claude Code.
Open to early-engineer roles at seed/Series A AI startups —
remote, founding compensation conversation welcome.
```

The phrase "early-engineer roles at seed/Series A AI startups" should link to `/about#hiring`.

### Footer (every page)

```
Email · GitHub · LinkedIn · X
```

Plain text, dot separators, muted color. No icons. Nothing else.

---

## Case study pages — structure

Each of the four case studies follows the same template. Use this exact structure:

1. **Breadcrumb:** `Work / [Project Name]` — small, muted, top of page.

2. **Title:** the project name in the serif, large.

3. **Subtitle:** one sentence describing what it is. 20px sans, muted.

4. **Metadata strip:** Four small data points in a row, each with a tiny label above the value. Examples: `Role: Solo builder`, `Stack: React, Node, Python, MongoDB, GCP`, `Customers: Schneider Electric, MillerKnoll, MIT`, `Year: 2024–2025`. Small text, muted labels, regular-weight values.

5. **The problem.** One short section (2–3 paragraphs max) — what was broken, why it mattered to the business.

6. **What I built.** The core narrative section. Mix of prose and concrete details. Include code snippets if relevant (using a real syntax-highlighted block, not a screenshot). Include architecture diagrams as inline SVG or images. Length: 400–700 words.

7. **How it works.** A more technical section. This is where Amaan demonstrates depth. Include one architecture diagram per case study. For the multi-provider one, the diagram should show: frontend → provider router → pub/sub queue → workers (with fallback controller wrapping provider calls) → completion event back via WebSocket. For WOPI: the WOPI protocol handshake and document host flow. For real-time collab: YJS CRDT + WebSocket + MongoDB Change Stream feedback loop. For cost estimation: input → AI synthesis pipeline → BOM/supply-chain reconciliation → output.

8. **Outcome.** Concrete numbers where possible. Customer names. Performance metrics (the 90% image load improvement, the 500MB+ memory reduction, the six-figure ARR contribution).

9. **What I'd do differently.** One paragraph. This is the hardest section to write and the one founders read most carefully. It signals seniority — engineers who can criticize their own work in writing are rare.

10. **Footer nav:** `← Previous case study` on the left, `Next case study →` on the right.

For v1, you can write the case studies as placeholder content with TODO markers for the parts that need Amaan's input — specifically the "What I'd do differently" section, exact metric numbers if you're not sure, and any code snippets. Mark these clearly with `<!-- TODO: Amaan fill in -->` comments.

---

## /about — exact structure

Three sections:

### How I work

A 200–300 word essay in first person. Cover: AI-native development (Claude, Cursor, Stitch as daily tools — not experiments), solo end-to-end ownership preference, comfort with ambiguity and direct customer contact, the discipline of shipping rather than over-engineering. Write it like a person, not a LinkedIn post. No bullet points.

### Background

A short prose bio. Where he studied (B.Tech CS, Swami Ramanand Teerth University, 2019–2023), where he's worked (Jobs Territory internship → Naya Studio), one sentence on what he's done outside of work (CSPP community contributor, mentoring on WOPI).

### Hiring (anchor: `#hiring`)

A short, direct paragraph stating what he's looking for. Suggested text:

```
I'm open to founding-engineer or early-engineer roles at seed
or Series A AI startups, remote, with founding compensation
(meaningful equity + market cash). I work best with founders
who ship weekly, hire for ownership, and use AI-native tools
as daily drivers rather than experiments. If that's you,
email me.
```

The word "email me" links to `mailto:amankhanak063@gmail.com`. Immediately after that sentence, add one more line: `Or book a 30-minute call directly.` where "book a 30-minute call directly" links to Amaan's Cal.com URL (leave as `<!-- TODO: Cal.com URL -->` for him to fill in). Do NOT add the Cal.com link anywhere else on the site — not the homepage, not the footer. It belongs only here, after the hiring paragraph, where the visitor has already self-qualified.

---

## /writing — structure only

Build the page. Title `Writing`. Subtitle: `Notes on shipping AI-native products, multi-provider orchestration, and solo engineering at scale.` Then an empty list with a placeholder line: `First posts coming soon.` Real posts will be added later. Set up the routing and layout so adding a post is just dropping a markdown file in `/content/writing/`.

---

## Technical implementation

### Stack

Use **Next.js 15 (App Router) + TypeScript + Tailwind CSS + MDX**. Reasons:

- Next.js: static export still works (`output: 'export'`) so it deploys cleanly to GitHub Pages, but if Amaan moves to Vercel later it's already there.
- App Router: file-based routing matches the site structure cleanly.
- TypeScript: signals seriousness.
- Tailwind: fast iteration, easy theming via CSS variables, doesn't lock into a component library.
- MDX: writing and case studies authored as markdown files with optional React components embedded. This is the right tool for prose-heavy content with occasional diagrams.

Do NOT use: a UI component library (shadcn is fine for primitives like buttons if needed, but don't lean on it for layout), a CMS, an animation library beyond what Tailwind provides, or any analytics package by default. Keep dependencies minimal.

### File structure

```
portfolio/
├── app/
│   ├── layout.tsx                  # Root layout, fonts, footer
│   ├── page.tsx                    # Homepage
│   ├── work/
│   │   ├── page.tsx                # Work index (same content as homepage "Selected work" but standalone)
│   │   └── [slug]/
│   │       └── page.tsx            # Dynamic case study renderer
│   ├── writing/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   └── globals.css                 # Tailwind base + CSS variables for colors, fonts
├── content/
│   ├── work/
│   │   ├── manufacturing-cost-estimation.mdx
│   │   ├── multi-provider-ai.mdx
│   │   ├── wopi-adidas.mdx
│   │   └── realtime-collaboration.mdx
│   └── writing/
│       └── .gitkeep
├── components/
│   ├── footer.tsx
│   ├── nav.tsx                     # Only used on non-home pages
│   ├── work-row.tsx                # The row component for selected work
│   └── case-study-layout.tsx       # Shared layout for /work/[slug]
├── lib/
│   └── mdx.ts                      # MDX loading helpers
├── public/
│   ├── resume.pdf                  # Amaan drops this in
│   └── og.png                      # Open Graph image, generated separately
├── next.config.mjs                 # output: 'export' for GH Pages compatibility
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### Fonts

Use `next/font` to self-host fonts (faster, no FOUT). Specifically:

```ts
import { Fraunces } from 'next/font/google'  // serif for headings
import { Inter_Tight } from 'next/font/google' // sans for body
```

Configure in `app/layout.tsx`, expose as CSS variables (`--font-serif`, `--font-sans`), reference in Tailwind config under `theme.extend.fontFamily`. If Fraunces or Inter Tight don't feel right when rendered, swap to Newsreader + Geist as a second option — but commit to one pair.

### Colors

Define as CSS variables in `globals.css`. Light theme:

```css
:root {
  --bg: #FAFAF7;           /* off-white, warm */
  --fg: #1A1A1A;           /* near-black, not pure */
  --muted: #6B6B6B;        /* secondary text */
  --border: #E8E6E1;       /* subtle dividers */
  --accent: #B4540A;       /* warm amber — single accent */
  --accent-soft: rgba(180, 84, 10, 0.06);  /* hover backgrounds */
}
```

Wire these into Tailwind's color extension so classes like `text-fg`, `bg-bg`, `text-muted`, `bg-accent-soft` work. If the amber feels wrong against the off-white, try `#1F4D3F` (forest green) or `#8B3A2E` (terracotta) instead — pick whichever has the best contrast against the chosen body text color and stick with it.

### Animation

One animation only: page-load stagger on the homepage. Three elements (name, tagline, status line) fade in with 4px upward translate, staggered by 80ms each, total duration 200ms. Use CSS animation, not JS. After page load, no further animations except `transition-colors duration-150` on hover states.

### Responsive

Mobile-first. The homepage on mobile is a vertical stack with the same content, just narrower (16px horizontal padding). The work rows collapse: year on its own line, title + description below, arrow at the right of the title. Case study pages use a single column, no side margins beyond 16–20px.

### Accessibility

- Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`).
- All interactive elements keyboard-accessible with visible focus rings (a 2px outline in the accent color, 2px offset).
- Color contrast must pass WCAG AA (4.5:1 for body text — check `#1A1A1A` on `#FAFAF7` passes).
- `prefers-reduced-motion` respected: if set, the page-load stagger is disabled.
- All images have `alt` text. Decorative dividers use `aria-hidden`.

### SEO and metadata

- Set `metadata` in each page's exports. Title format: `[Page] — Amaan Khan` (homepage is just `Amaan Khan — Software Engineer`).
- Description on homepage: `Software engineer. I ship AI-native products end-to-end for enterprise customers — design through deployment, solo. Currently at Naya Studio.`
- One Open Graph image, generated as a static PNG. Simple: off-white background, name in the serif, one line of subtitle, accent-color underline under the name. 1200×630.

### Deployment

GitHub Pages compatibility:

- `next.config.mjs` includes `output: 'export'` and `images: { unoptimized: true }`.
- `basePath` set if the repo name is not `amaan2210.github.io` — leave this commented and noted for Amaan to configure.
- Add a GitHub Action that runs `next build` and deploys the `out/` directory to the `gh-pages` branch.

If Amaan later moves to Vercel, the static export still works — Vercel auto-detects Next.js. No code changes needed.

---

## What you should NOT do

- Do not add a hero photo of Amaan.
- Do not add a "Skills" section with logos or bars or grids of tech stack icons.
- Do not add testimonials. He doesn't have public ones and inventing them is dishonest.
- Do not add a typing animation, a moving gradient, or a custom cursor.
- Do not add a contact form. Email link in the footer is enough.
- Do not add light/dark theme toggle in v1 unless implemented properly with system preference detection.
- Do not add analytics by default — leave a commented-out Plausible script for Amaan to enable if he wants.
- Do not write copy in third person ("Amaan is a developer who..."). First person, everywhere.
- Do not use the words "passionate," "results-driven," "team player," or any other resume-speak.

---

## What to confirm with Amaan before merging

Leave these as `<!-- TODO -->` comments in the relevant files for Amaan to fill in:

- The "What I'd do differently" section in each case study.
- Exact customer logos/quotes if he wants to add any (none by default).
- The X / Twitter handle in the footer (you have his GitHub `Amaan2210` and LinkedIn `amaan-khan-gsm`).
- Resume PDF — placeholder file goes in `/public/resume.pdf`.
- Open Graph image — generate a placeholder, mark for replacement.

---

## Build order

Do it in this order so each step is reviewable:

1. Scaffold the Next.js app, fonts, globals.css, Tailwind config, color variables.
2. Build the homepage (`app/page.tsx`) and the shared footer.
3. Build `/about` (it's the simplest content page after homepage).
4. Build the case study layout and one case study (`manufacturing-cost-estimation.mdx`) end-to-end as the template.
5. Build the remaining three case studies using the same template.
6. Build `/work` index (lift the "Selected work" section from homepage into a standalone page).
7. Build `/writing` skeleton.
8. Wire up GitHub Pages deployment.
9. Generate the OG image.
10. Run Lighthouse and fix anything that scores below 95.

After step 1, pause and show Amaan the rendered homepage scaffold before continuing. After step 4, pause and show the first complete case study. These are the two highest-risk design moments — get sign-off before propagating the pattern.

---

## One last note

The whole point of this site is to look like it was made by someone who has taste and ships. The hardest part of executing this brief is *restraint* — every instinct to add something decorative should be resisted. If you finish the build and it looks too plain, that probably means you got it right. Compare against linear.app, vercel.com, rauno.me, brianlovin.com before declaring it done.
