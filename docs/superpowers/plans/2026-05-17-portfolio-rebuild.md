# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio per the approved spec at `docs/superpowers/specs/2026-05-17-portfolio-rebuild-design.md`. Replace the current single-page Lovable-scaffolded site with a 5-page typography-led portfolio adapted to the existing Vite stack.

**Architecture:** Vite + React 18 + TS + Tailwind + React Router (BrowserRouter, unchanged). New design system in CSS variables with a one-line accent-swap block. Light/dark via `next-themes` (already a dependency). Case studies as TSX components, not MDX. GH Pages SPA fallback via a postbuild step that duplicates `dist/index.html` → `dist/404.html`.

**Tech Stack:** Vite 5, React 18, TypeScript, Tailwind 3, React Router 6, next-themes, lucide-react, Fraunces + Inter Tight (Google Fonts).

**Conventions and clarifications:**
- **PascalCase** for component and page file names (matches existing repo convention; deviates from the lowercase names listed in the spec — a plan-level refinement).
- All colors defined as HSL (per existing CLAUDE.md convention).
- Direct commits to `main`. No PRs. Do **not** push to remote without explicit user approval.
- **TDD adapted for visual code:** there are no unit tests in this rebuild (matches CLAUDE.md note about the existing test setup being a placeholder). Each task that produces visual output ends with a manual verification step in the dev server. Routing-critical tasks include a smoke check (load each route, confirm no console errors, confirm correct page renders).

**Working tree at plan-start:**
- Branch: `main` (one commit ahead — the spec commit `ed95a25`)
- Untracked: `github-preview.md` (separate repo's README, leave alone), `public/Amaan Khan.pdf` (resume, rename in Task 4), `src/assets/profile-generated.png` (rename in Task 4)
- `job-search/` is gitignored — Amaan.tex stays local

---

## Task 1: Create new page stubs and rewire routing

Replace the single-route App with five top-level routes plus four case-study routes. Stub pages keep the build green while later tasks fill them in.

**Files:**
- Create: `src/pages/Home.tsx`
- Create: `src/pages/About.tsx`
- Create: `src/pages/Work.tsx`
- Create: `src/pages/Writing.tsx`
- Create: `src/pages/work/CostEstimation.tsx`
- Create: `src/pages/work/MultiProviderAi.tsx`
- Create: `src/pages/work/WopiAdidas.tsx`
- Create: `src/pages/work/RealtimeCollab.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Create the stub homepage**

`src/pages/Home.tsx`:

```tsx
export default function Home() {
  return <main className="p-8"><h1>Home (stub)</h1></main>;
}
```

- [ ] **Step 2: Create stub for About, Work, Writing**

`src/pages/About.tsx`:

```tsx
export default function About() {
  return <main className="p-8"><h1>About (stub)</h1></main>;
}
```

`src/pages/Work.tsx`:

```tsx
export default function Work() {
  return <main className="p-8"><h1>Work (stub)</h1></main>;
}
```

`src/pages/Writing.tsx`:

```tsx
export default function Writing() {
  return <main className="p-8"><h1>Writing (stub)</h1></main>;
}
```

- [ ] **Step 3: Create stubs for the 4 case studies**

`src/pages/work/CostEstimation.tsx`:

```tsx
export default function CostEstimation() {
  return <main className="p-8"><h1>Cost Estimation (stub)</h1></main>;
}
```

`src/pages/work/MultiProviderAi.tsx`:

```tsx
export default function MultiProviderAi() {
  return <main className="p-8"><h1>Multi-provider AI (stub)</h1></main>;
}
```

`src/pages/work/WopiAdidas.tsx`:

```tsx
export default function WopiAdidas() {
  return <main className="p-8"><h1>WOPI for Adidas (stub)</h1></main>;
}
```

`src/pages/work/RealtimeCollab.tsx`:

```tsx
export default function RealtimeCollab() {
  return <main className="p-8"><h1>Real-time collaboration (stub)</h1></main>;
}
```

- [ ] **Step 4: Rewire `src/App.tsx` with new routes (still importing old Index for now to avoid build break — replaced in Step 5)**

Replace `src/App.tsx` entirely with:

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Writing from "./pages/Writing";
import NotFound from "./pages/NotFound";
import CostEstimation from "./pages/work/CostEstimation";
import MultiProviderAi from "./pages/work/MultiProviderAi";
import WopiAdidas from "./pages/work/WopiAdidas";
import RealtimeCollab from "./pages/work/RealtimeCollab";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/cost-estimation" element={<CostEstimation />} />
          <Route path="/work/multi-provider-ai" element={<MultiProviderAi />} />
          <Route path="/work/wopi-adidas" element={<WopiAdidas />} />
          <Route path="/work/realtime-collab" element={<RealtimeCollab />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
```

(`ThemeProvider` will be added in Task 8 — this step keeps the diff small.)

- [ ] **Step 5: Smoke check — start dev server and visit each route**

```bash
npm run dev
```

Open in browser and verify each of these routes renders the stub heading without console errors:
- http://localhost:8080/
- http://localhost:8080/about
- http://localhost:8080/work
- http://localhost:8080/work/cost-estimation
- http://localhost:8080/work/multi-provider-ai
- http://localhost:8080/work/wopi-adidas
- http://localhost:8080/work/realtime-collab
- http://localhost:8080/writing
- http://localhost:8080/some-bogus-path  (should hit NotFound)

Stop the dev server (Ctrl+C).

- [ ] **Step 6: Commit**

```bash
git add src/pages/Home.tsx src/pages/About.tsx src/pages/Work.tsx src/pages/Writing.tsx src/pages/work/ src/App.tsx
git commit -m "$(cat <<'EOF'
Add new page stubs and rewire App router for portfolio rebuild

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Delete old single-page section components

Remove the old Hero/About/Experience/Skills/Education/Contact section components and the Index page. They are no longer referenced after Task 1.

**Files to delete:**
- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/Experience.tsx`
- `src/components/Skills.tsx`
- `src/components/Education.tsx`
- `src/components/Contact.tsx`
- `src/components/Header.tsx`
- `src/components/NavLink.tsx`
- `src/components/Footer.tsx`
- `src/pages/Index.tsx`
- `src/assets/profile-photo.png`
- `public/placeholder.svg`

- [ ] **Step 1: Confirm no references remain to the components being deleted**

```bash
grep -rE "from \"@/components/(Hero|About|Experience|Skills|Education|Contact|Header|NavLink|Footer)\"|from \"./pages/Index\"|profile-photo\.png|placeholder\.svg" src/ public/ index.html
```

Expected: no output (no matches). If anything appears, fix that reference first.

- [ ] **Step 2: Delete the files**

```bash
git rm src/components/Hero.tsx src/components/About.tsx src/components/Experience.tsx src/components/Skills.tsx src/components/Education.tsx src/components/Contact.tsx src/components/Header.tsx src/components/NavLink.tsx src/components/Footer.tsx src/pages/Index.tsx src/assets/profile-photo.png public/placeholder.svg
```

- [ ] **Step 3: Run build to confirm no broken imports**

```bash
npm run build
```

Expected: build succeeds, `dist/` is created without errors.

- [ ] **Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
Remove old single-page section components and unused assets

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Rename profile image and resume PDF

Clean up filenames that will appear in URLs.

**Files to rename:**
- `src/assets/profile-generated.png` → `src/assets/profile.png` (untracked, plain `mv`)
- `public/Amaan Khan.pdf` → `public/amaan-khan-resume.pdf` (untracked, plain `mv`)

- [ ] **Step 1: Rename the profile asset**

```bash
mv src/assets/profile-generated.png src/assets/profile.png
```

- [ ] **Step 2: Rename the resume PDF**

```bash
mv "public/Amaan Khan.pdf" public/amaan-khan-resume.pdf
```

- [ ] **Step 3: Verify both files exist at new paths**

```bash
ls src/assets/profile.png public/amaan-khan-resume.pdf
```

Expected: both files listed without error.

- [ ] **Step 4: Stage and commit**

```bash
git add src/assets/profile.png public/amaan-khan-resume.pdf
git commit -m "$(cat <<'EOF'
Add renamed profile photo and resume PDF assets

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Add postbuild SPA-fallback script

GitHub Pages has no server-side routing — direct visits to `/work/cost-estimation` would 404 because `dist/work/cost-estimation/index.html` doesn't exist. GH Pages serves `404.html` for unknown paths, so if `404.html` equals `index.html`, the React app boots and React Router resolves the route client-side.

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Add the `postbuild` script to `package.json`**

Edit `package.json` and add this line inside the `"scripts"` object (after `"build:dev"` is a clean spot):

```json
"postbuild": "node -e \"require('fs').copyFileSync('dist/index.html', 'dist/404.html')\"",
```

The full `scripts` block should read:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "build:dev": "vite build --mode development",
  "postbuild": "node -e \"require('fs').copyFileSync('dist/index.html', 'dist/404.html')\"",
  "lint": "eslint .",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
},
```

- [ ] **Step 2: Run build and verify `dist/404.html` is created**

```bash
npm run build
ls dist/index.html dist/404.html
```

Expected: both files exist.

- [ ] **Step 3: Verify the two files are identical**

```bash
diff dist/index.html dist/404.html
```

Expected: no output (files are identical).

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "$(cat <<'EOF'
Add postbuild step to copy index.html to 404.html for GH Pages SPA fallback

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Replace `src/index.css` with new design tokens

Wholesale rewrite of the design system. The old neo-brutalist tokens (square corners, offset shadows, Space Grotesk/Lora/Space Mono) are replaced with the new typography-led tokens (warm off-white, Fraunces + Inter Tight, single-accent block).

**Files:**
- Modify: `src/index.css` (full rewrite)

- [ ] **Step 1: Replace `src/index.css` entirely with the new content**

```css
@import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300..700&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ─── Background and text ─── */
    --bg: 39 22% 97%;        /* #FAFAF7 warm off-white */
    --fg: 0 0% 10%;          /* #1A1A1A near-black */
    --muted: 0 0% 42%;       /* #6B6B6B */
    --border: 36 19% 90%;    /* #E8E6E1 */

    /* ─── Active accent — uncomment ONE line to swap ─── */
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

  * {
    border-color: hsl(var(--border));
  }

  html {
    background: hsl(var(--bg));
    color: hsl(var(--fg));
  }

  body {
    background: hsl(var(--bg));
    color: hsl(var(--fg));
    font-family: 'Inter Tight', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  ::selection {
    background: hsl(var(--accent) / 0.2);
    color: hsl(var(--fg));
  }
}

@layer utilities {
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
}
```

- [ ] **Step 2: Build to confirm CSS compiles (Tailwind classes referencing old vars will warn but not fail)**

```bash
npm run build
```

Expected: build succeeds. Some Tailwind utilities that reference old vars (`bg-background`, `text-foreground`, etc.) may still resolve via Tailwind's defaults; they will be wired correctly in Task 6.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "$(cat <<'EOF'
Replace design tokens with typography-led palette and accent-swap block

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Replace `tailwind.config.ts` with new tokens

Map the new CSS variables to Tailwind utility classes.

**Files:**
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace `tailwind.config.ts` entirely with**

```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        fg: "hsl(var(--fg))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        accent: "hsl(var(--accent))",
        "accent-soft": "hsl(var(--accent) / 0.06)",
      },
      fontFamily: {
        serif: ["Fraunces", "ui-serif", "Georgia", "serif"],
        sans: ["Inter Tight", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "680px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

- [ ] **Step 2: Run dev server and confirm Tailwind compiles**

```bash
npm run dev
```

Open http://localhost:8080 — the stub Home page should render. There should be no Tailwind compilation errors in the terminal.

Stop dev server (Ctrl+C).

- [ ] **Step 3: Commit**

```bash
git add tailwind.config.ts
git commit -m "$(cat <<'EOF'
Update Tailwind config for new color tokens and font families

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Update `index.html` metadata and add theme-hydration script

Update the page title, description, and OG tags for the new positioning. Add a small inline script that sets `<html class="dark">` before React mounts — prevents the brief flash of wrong theme that `next-themes` would otherwise produce in a non-Next React app.

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace `index.html` entirely with**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Amaan Khan — Software Engineer</title>
    <meta
      name="description"
      content="Software engineer. I ship AI-native products end-to-end for enterprise customers — design through deployment, solo. Currently at Naya Studio."
    />
    <meta name="author" content="Amaan Khan" />

    <meta property="og:title" content="Amaan Khan — Software Engineer" />
    <meta
      property="og:description"
      content="Software engineer. I ship AI-native products end-to-end for enterprise customers — design through deployment, solo."
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Amaan Khan — Software Engineer" />
    <meta
      name="twitter:description"
      content="Software engineer. I ship AI-native products end-to-end for enterprise customers — design through deployment, solo."
    />
    <meta name="twitter:image" content="/og.png" />

    <link rel="icon" type="image/x-icon" href="/favicon.ico" />

    <script>
      // Prevent flash of wrong theme: read user preference or system preference
      // before React mounts and add 'dark' class to <html> immediately.
      (function () {
        try {
          var stored = localStorage.getItem("theme");
          var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
          var isDark = stored === "dark" || (stored !== "light" && prefersDark);
          if (isDark) document.documentElement.classList.add("dark");
        } catch (e) {}
      })();
    </script>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Verify dev server renders without errors**

```bash
npm run dev
```

Open http://localhost:8080. The page should render the stub Home. Open browser DevTools → Console — no errors. Open Application → Local Storage → http://localhost:8080 — should be empty (no theme set yet, the inline script defaults to system).

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
Update page metadata and add inline theme-hydration script

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Wire `next-themes` ThemeProvider in App.tsx

Wrap the app in `next-themes`' provider. Uses the existing dependency — no install needed.

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Replace `src/App.tsx` with the updated version that wraps the router in `ThemeProvider`**

```tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Writing from "./pages/Writing";
import NotFound from "./pages/NotFound";
import CostEstimation from "./pages/work/CostEstimation";
import MultiProviderAi from "./pages/work/MultiProviderAi";
import WopiAdidas from "./pages/work/WopiAdidas";
import RealtimeCollab from "./pages/work/RealtimeCollab";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/cost-estimation" element={<CostEstimation />} />
            <Route path="/work/multi-provider-ai" element={<MultiProviderAi />} />
            <Route path="/work/wopi-adidas" element={<WopiAdidas />} />
            <Route path="/work/realtime-collab" element={<RealtimeCollab />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
```

- [ ] **Step 2: Verify dev server still renders without errors**

```bash
npm run dev
```

Open http://localhost:8080. Stub home renders. Open DevTools → Elements: the `<html>` tag should have an attribute `class` set (either empty or "dark", depending on system preference) — confirms `next-themes` is mounted.

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "$(cat <<'EOF'
Wrap app in next-themes ThemeProvider with system default

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Create `src/lib/work-items.ts` — shared data for Home and Work index

Single source of truth for the 4 selected-work entries.

**Files:**
- Create: `src/lib/work-items.ts`

- [ ] **Step 1: Write the data module**

```ts
export type WorkItem = {
  year: string;
  title: string;
  description: string;
  slug: string;
};

export const workItems: WorkItem[] = [
  {
    year: "2025–Present",
    title: "Cost Estimation",
    description:
      "Founding engineer. Solo-built. $500K+ signed enterprise contracts, 4k+ estimations in production.",
    slug: "cost-estimation",
  },
  {
    year: "2024",
    title: "Multi-provider AI",
    description:
      "10 providers, 50+ models. Powered a $200K+ Adidas deal plus MillerKnoll ARR.",
    slug: "multi-provider-ai",
  },
  {
    year: "2024",
    title: "WOPI for Adidas",
    description:
      "In-platform Microsoft Office editing. Enterprise rollout to Adidas teams.",
    slug: "wopi-adidas",
  },
  {
    year: "2023",
    title: "Real-time collaboration",
    description:
      "WebSockets + MongoDB Change Streams + YJS for simultaneous multi-user editing.",
    slug: "realtime-collab",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/work-items.ts
git commit -m "$(cat <<'EOF'
Add work-items data module for shared Home and Work index rendering

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Build the `WorkRow` component

A single clickable row used on the homepage and `/work` index.

**Files:**
- Create: `src/components/WorkRow.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { Link } from "react-router-dom";
import type { WorkItem } from "@/lib/work-items";

type Props = {
  item: WorkItem;
};

export default function WorkRow({ item }: Props) {
  return (
    <Link
      to={`/work/${item.slug}`}
      className="group grid grid-cols-[7rem_1fr_auto] sm:grid-cols-[8rem_12rem_1fr_auto] items-baseline gap-4 sm:gap-6 px-2 py-4 sm:py-5 -mx-2 border-b border-border transition-colors duration-150 hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      <span className="text-sm text-muted font-sans tabular-nums">{item.year}</span>
      <span className="font-serif text-base sm:text-lg col-span-2 sm:col-span-1">
        {item.title}
      </span>
      <span className="hidden sm:block text-sm text-muted font-sans">
        {item.description}
      </span>
      <span
        aria-hidden="true"
        className="text-accent transition-transform duration-150 group-hover:translate-x-1"
      >
        →
      </span>
      <span className="sm:hidden col-span-3 text-sm text-muted font-sans -mt-2">
        {item.description}
      </span>
    </Link>
  );
}
```

- [ ] **Step 2: Smoke-render in the stub Home page**

Temporarily update `src/pages/Home.tsx`:

```tsx
import WorkRow from "@/components/WorkRow";
import { workItems } from "@/lib/work-items";

export default function Home() {
  return (
    <main className="mx-auto max-w-prose px-4 py-12">
      {workItems.map((item) => (
        <WorkRow key={item.slug} item={item} />
      ))}
    </main>
  );
}
```

```bash
npm run dev
```

Open http://localhost:8080. You should see 4 rows with year, title, description, and a `→` arrow. Hovering should slide the arrow right and tint the background. Clicking should navigate to the (still stub) case-study page.

Stop dev server.

- [ ] **Step 3: Commit (Home.tsx is still a stub — full page comes in Task 14)**

```bash
git add src/components/WorkRow.tsx src/pages/Home.tsx
git commit -m "$(cat <<'EOF'
Add WorkRow component with year/title/description/arrow layout

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Build the `ThemeToggle` component

Small icon button for light/dark switching. Uses `next-themes`' `useTheme` hook.

**Files:**
- Create: `src/components/ThemeToggle.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="inline-block w-4 h-4" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center w-4 h-4 text-muted hover:text-fg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
```

The `mounted` guard prevents an SSR-style hydration mismatch — `useTheme()` returns `undefined` before the client effect runs, so the icon would flicker on first render. The `inline-block` placeholder keeps the footer alignment stable.

- [ ] **Step 2: Commit (component will be wired into Footer in Task 12)**

```bash
git add src/components/ThemeToggle.tsx
git commit -m "$(cat <<'EOF'
Add ThemeToggle component with mounted-guard to prevent hydration flicker

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Build the `Footer` component

Plain text footer with social links and theme toggle. Appears on every page.

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Write the component**

```tsx
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { label: "Email", href: "mailto:amankhanak063@gmail.com" },
  { label: "GitHub", href: "https://github.com/Amaan2210" },
  { label: "LinkedIn", href: "https://linkedin.com/in/amaan-khan-gsm" },
  { label: "X", href: "https://x.com/Amaan2210" },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-prose px-4 py-12 mt-16 border-t border-border">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted font-sans">
        {links.map((link, i) => (
          <span key={link.href} className="inline-flex items-center gap-3">
            {i > 0 && <span aria-hidden="true">·</span>}
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              {link.label}
            </a>
          </span>
        ))}
        <span aria-hidden="true">·</span>
        <ThemeToggle />
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Smoke-render in the Home stub**

Temporarily update `src/pages/Home.tsx`:

```tsx
import WorkRow from "@/components/WorkRow";
import Footer from "@/components/Footer";
import { workItems } from "@/lib/work-items";

export default function Home() {
  return (
    <>
      <main className="mx-auto max-w-prose px-4 py-12">
        {workItems.map((item) => (
          <WorkRow key={item.slug} item={item} />
        ))}
      </main>
      <Footer />
    </>
  );
}
```

```bash
npm run dev
```

Open http://localhost:8080. Verify:
- Footer renders with `Email · GitHub · LinkedIn · X · [theme icon]`
- Clicking the theme icon toggles light/dark — backgrounds flip, accent color stays the same
- Refresh — theme persists (check Application → Local Storage → http://localhost:8080 has `theme` key)
- Email link opens mail client; GitHub/LinkedIn/X open in new tabs

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx src/pages/Home.tsx
git commit -m "$(cat <<'EOF'
Add Footer with social links and theme toggle

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Build the `Nav` component (for non-home pages)

Small top nav used on `/about`, `/work`, `/work/[slug]`, `/writing`. The homepage doesn't render this — its inline link row serves as nav (per spec).

**Files:**
- Create: `src/components/Nav.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { Link, NavLink } from "react-router-dom";

const items = [
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/about", label: "About" },
];

export default function Nav() {
  return (
    <nav className="mx-auto max-w-prose px-4 pt-8 pb-12 flex items-center justify-between text-sm font-sans">
      <Link
        to="/"
        className="font-serif text-base hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      >
        Amaan Khan
      </Link>
      <div className="flex gap-6 text-muted">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg ${
                isActive ? "text-fg" : ""
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit (will be used by subsequent pages)**

```bash
git add src/components/Nav.tsx
git commit -m "$(cat <<'EOF'
Add Nav component for non-home pages

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Build the full Home page

Replace the stub with the real homepage: identity section, selected work, now section. No top Nav (per spec — the inline link row replaces it).

**Files:**
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Write the full Home page**

```tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import WorkRow from "@/components/WorkRow";
import Footer from "@/components/Footer";
import { workItems } from "@/lib/work-items";

export default function Home() {
  useEffect(() => {
    document.title = "Amaan Khan — Software Engineer";
  }, []);

  return (
    <>
      <main className="mx-auto max-w-prose px-4 pt-20 pb-12">
        {/* Identity */}
        <section className="mb-20">
          <h1 className="stagger-1 font-serif text-[2.75rem] sm:text-5xl md:text-[3.5rem] leading-tight">
            Amaan Khan
          </h1>
          <p className="stagger-2 mt-6 text-lg sm:text-xl leading-relaxed">
            Software engineer. I ship AI-native products end-to-end for enterprise
            customers — design through deployment, solo.
          </p>
          <p className="stagger-3 mt-3 text-lg sm:text-xl text-muted leading-relaxed">
            Currently at Naya Studio. Open to founding-engineer roles.
          </p>

          <hr className="my-10 border-border" aria-hidden="true" />

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-sans text-muted">
            <Link
              to="/work"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Work
            </Link>
            <Link
              to="/writing"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              Writing
            </Link>
            <Link
              to="/about"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              About
            </Link>
            <a
              href="https://github.com/Amaan2210"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              GitHub
            </a>
          </div>
        </section>

        {/* Selected work */}
        <section className="mb-20">
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-2">
            Selected work
          </h2>
          <div>
            {workItems.map((item) => (
              <WorkRow key={item.slug} item={item} />
            ))}
          </div>
        </section>

        {/* Now */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4">
            Now
          </h2>
          <p className="text-base sm:text-lg leading-relaxed">
            Shipping AI-native products at Naya Studio — currently a Founding
            Engineer on Cost Estimation and Sustainability AI (Beta 2026).
            Writing about multi-provider orchestration and shipping solo with
            Claude Code.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed">
            Open to{" "}
            <Link
              to="/about#hiring"
              className="text-accent hover:underline underline-offset-4"
            >
              early-engineer roles at seed/Series A AI startups
            </Link>{" "}
            — remote, founding compensation conversation welcome.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080:
- Identity section: serif name, two paragraphs, stagger animation on load (subtle fade + 4px up). Refresh to re-trigger.
- Single horizontal rule, then row of links (Work · Writing · About · GitHub) — hover underlines/colors.
- Selected work: 4 rows, hover behavior works.
- Now: paragraph with the "early-engineer roles..." phrase colored as accent + underline on hover.
- Footer at bottom.

Try `prefers-reduced-motion` (DevTools → Rendering → Emulate CSS prefers-reduced-motion: reduce) and refresh — stagger animation should be disabled.

Toggle dark mode via footer button — entire page flips cleanly.

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "$(cat <<'EOF'
Build full homepage with identity, selected work, and now sections

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 15: Build the About page (with photo and `#hiring` anchor)

Three sections: photo + "How I work" essay, Background, Hiring.

**Files:**
- Modify: `src/pages/About.tsx`

- [ ] **Step 1: Write the full About page**

```tsx
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import profile from "@/assets/profile.png";

export default function About() {
  useEffect(() => {
    document.title = "About — Amaan Khan";
  }, []);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 pb-12">
        <header className="mb-12 flex items-start gap-6">
          <img
            src={profile}
            alt="Amaan Khan"
            className="w-[140px] h-[140px] object-cover rounded-sm flex-shrink-0"
          />
          <div className="pt-2">
            <h1 className="font-serif text-3xl sm:text-4xl leading-tight">About</h1>
          </div>
        </header>

        {/* How I work */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4">
            How I work
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              I ship. Most of what I build at Naya Studio has gone live in front of
              enterprise customers within weeks of starting it — the Cost Estimation
              product I'm currently founding-engineering went from architecture
              sketches to $500K+ in signed enterprise contracts in a single year,
              and the codebase now serves as the foundation for client-specific
              forks at MillerKnoll, Schneider Electric, and NAC.
            </p>
            <p>
              I work AI-native. Claude Code, Cursor, and a handful of model APIs
              are daily drivers, not experiments. I treat them the way a previous
              generation treated their IDE: as table stakes for shipping at the
              pace AI startups actually need. When I say I built something solo,
              I mean me plus the AI tools I use every day — and I think that's
              the honest framing.
            </p>
            <p>
              I'm comfortable with ambiguity and direct customer contact. The
              cleanest way to learn what an enterprise customer actually wants
              is to talk to them, not to triangulate it through a PM. I'd rather
              ship a smaller, less general thing that the customer is using
              tomorrow than a more elegant one they'll see in a quarter.
            </p>
            <p>
              I default to less. Less abstraction, fewer dependencies, fewer
              clever frameworks. The hard part of shipping isn't writing code —
              it's knowing what not to write.
            </p>
          </div>
        </section>

        {/* Background */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4">
            Background
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              B.Tech in Computer Science from Swami Ramanand Teerth Marathwada
              University (2019–2023). Joined Naya Studio in November 2022 and
              have been there since — currently a Founding Engineer on Cost
              Estimation and Sustainability AI (Beta 2026), and a Software
              Developer on the broader Workflow platform.
            </p>
            <p>
              Outside Naya, I contribute to the CSPP community and mentor on
              WOPI (the Microsoft Office in-platform editing protocol) for
              engineers building enterprise integrations.
            </p>
            <p>
              Resume:{" "}
              <a
                href="/amaan-khan-resume.pdf"
                className="text-accent hover:underline underline-offset-4"
              >
                PDF
              </a>
              .
            </p>
          </div>
        </section>

        {/* Hiring */}
        <section id="hiring" className="scroll-mt-8">
          <h2 className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-4">
            Hiring
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p>
              I'm open to founding-engineer or early-engineer roles at seed or
              Series A AI startups, remote, with founding compensation (meaningful
              equity + market cash). I work best with founders who ship weekly,
              hire for ownership, and use AI-native tools as daily drivers
              rather than experiments. If that's you,{" "}
              <a
                href="mailto:amankhanak063@gmail.com"
                className="text-accent hover:underline underline-offset-4"
              >
                email me
              </a>
              .
            </p>
            <p>
              Or{" "}
              <a
                href="https://cal.com/amaan-khan/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline underline-offset-4"
              >
                book a 30-minute call directly
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080/about:
- Top nav renders with name (Fraunces) on left, Work/Writing/About on right (About highlighted)
- Photo loads (~140px square, top-left of content)
- Three sections, each with small uppercase label and prose
- Resume PDF link works — clicking opens `/amaan-khan-resume.pdf`
- "email me" opens mail client
- "book a 30-minute call directly" opens Cal.com in new tab
- Scroll to `#hiring`: open http://localhost:8080/about#hiring and the page should jump to the Hiring section (CSS `scroll-mt-8` ensures it isn't tucked under the top edge)

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/About.tsx
git commit -m "$(cat <<'EOF'
Build About page with photo, How I work, Background, and Hiring sections

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 16: Build the `CaseStudyLayout` component

Shared scaffolding for all 4 case studies: breadcrumb, title, subtitle, metadata strip, children slot, prev/next footer nav.

**Files:**
- Create: `src/components/CaseStudyLayout.tsx`

- [ ] **Step 1: Write the layout**

```tsx
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { workItems } from "@/lib/work-items";

type Metadata = {
  label: string;
  value: string;
};

type Props = {
  slug: string;
  title: string;
  subtitle: string;
  metadata: Metadata[];
  children: ReactNode;
};

export default function CaseStudyLayout({
  slug,
  title,
  subtitle,
  metadata,
  children,
}: Props) {
  const index = workItems.findIndex((item) => item.slug === slug);
  const prev = index > 0 ? workItems[index - 1] : null;
  const next = index >= 0 && index < workItems.length - 1 ? workItems[index + 1] : null;

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 pb-12">
        <p className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-6">
          <Link to="/work" className="hover:text-accent transition-colors">
            Work
          </Link>{" "}
          / {title}
        </p>

        <header className="mb-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            {title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-muted leading-relaxed">
            {subtitle}
          </p>
        </header>

        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 mb-12 pb-12 border-b border-border">
          {metadata.map((m) => (
            <div key={m.label}>
              <dt className="text-xs uppercase tracking-[0.08em] text-muted font-sans mb-1">
                {m.label}
              </dt>
              <dd className="text-sm sm:text-base">{m.value}</dd>
            </div>
          ))}
        </dl>

        <article className="space-y-10 text-base sm:text-lg leading-relaxed">
          {children}
        </article>

        <nav className="mt-20 pt-8 border-t border-border flex items-center justify-between text-sm font-sans">
          {prev ? (
            <Link
              to={`/work/${prev.slug}`}
              className="text-muted hover:text-accent transition-colors"
            >
              ← {prev.title}
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
          {next ? (
            <Link
              to={`/work/${next.slug}`}
              className="text-muted hover:text-accent transition-colors"
            >
              {next.title} →
            </Link>
          ) : (
            <span aria-hidden="true" />
          )}
        </nav>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/CaseStudyLayout.tsx
git commit -m "$(cat <<'EOF'
Add CaseStudyLayout component with breadcrumb, metadata, and prev/next nav

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 17: Build the Cost Estimation case study

Lead case study, drawn from the new resume.

**Files:**
- Modify: `src/pages/work/CostEstimation.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function CostEstimation() {
  useEffect(() => {
    document.title = "Cost Estimation — Amaan Khan";
  }, []);

  return (
    <CaseStudyLayout
      slug="cost-estimation"
      title="Cost Estimation"
      subtitle="Solo-built the AI Cost Estimation product as Founding Engineer. Its codebase became the foundation for FDE forks at MillerKnoll, Schneider Electric, and NAC."
      metadata={[
        { label: "Role", value: "Founding Engineer · Solo" },
        { label: "Stack", value: "Node.js, MongoDB, Anthropic, Gemini, GCP" },
        { label: "Customers", value: "MillerKnoll, Schneider, NAC" },
        { label: "Year", value: "2025–Present" },
      ]}
    >
      <section>
        <h2 className="font-serif text-2xl mb-4">The problem</h2>
        <p>
          Enterprise manufacturing teams spend weeks producing per-product cost
          estimates: gathering supplier prices, applying industry-specific markup
          conventions, reconciling against BOM data, and packaging the result as
          a defensible report. The work is high-leverage but slow and uneven —
          it depends heavily on which estimator picks it up.
        </p>
        <p>
          Naya needed a product that could compress this from weeks to minutes
          per estimate while staying defensible to customers spending serious
          money against the output. The product also had to be deployable as
          client-specific forks: MillerKnoll, Schneider Electric, and NAC each
          required their own isolated instance with their own data, integrations,
          and customizations.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A sequential 8-stage LLM workflow in Node.js, with editable intermediate
          outputs at each stage and per-stage state persistence in MongoDB. Each
          run is reproducible: every stage's input, prompt, model selection, and
          output is stored, so a user can audit or branch from any midpoint.
        </p>
        <p>
          Users select the model per execution (Anthropic Opus or Google Gemini)
          based on cost/quality preferences. Firebase handles asset storage for
          uploaded reference docs and generated PDF reports. Sentry covers
          observability; the whole thing runs on GCP with CI/CD.
        </p>
        <p>
          The classifier in the first stage of the pipeline loads
          domain-specific markdown context — a markdown-driven industry
          knowledge system I built across 16 verticals via expert collaboration.
          This is what makes the downstream pipeline accurate without fine-tuning:
          the model gets the right reference material at the right moment.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <p>
          The 8-stage pipeline runs sequentially with user-editable handoffs
          between stages. Each stage reads its inputs from MongoDB, writes its
          output back, and either auto-advances or pauses for human review:
        </p>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`Input (product spec, refs)
   │
   ▼
[1] Classify ──── loads 1 of 16 industry markdown contexts
   │
   ▼
[2] Decompose ── into BOM line items
   │
   ▼
[3] Source ───── supplier prices per line
   │
   ▼
[4] Apply markups ── per-industry conventions
   │
   ▼
[5] Reconcile ── against historical estimates
   │
   ▼
[6] Format ───── PDF report
   │
   ▼
[7] Validate ─── self-check pass
   │
   ▼
[8] Deliver ──── store, notify
   │
   ▼
Output (PDF + structured JSON)`}</pre>
        <p>
          Per-stage MongoDB persistence is the key architectural decision. It's
          what makes the same codebase deployable as isolated client forks
          (MillerKnoll, Schneider Electric, NAC each get their own DB) and what
          makes individual runs auditable for enterprise procurement teams who
          can't accept "the model said so."
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Outcome</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>$500K+ in signed enterprise contracts</strong> across the
            base product plus FDE forks (MillerKnoll, Schneider Electric, NAC)
          </li>
          <li>
            <strong>4,000+ estimations</strong> run in active production
          </li>
          <li>
            <strong>16 industry verticals</strong> covered by the markdown
            knowledge system
          </li>
          <li>
            The codebase became the architectural template for Sustainability
            AI (Beta 2026), reusing the same pipeline pattern for carbon, water,
            plastic, and energy analysis
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I'd do differently</h2>
        <p className="text-muted italic">
          {/* TODO: Amaan to fill in */}
          [Pending — to be written by Amaan. Should be honest about a real
          tradeoff he'd revisit if starting again. Founders read this section
          most carefully.]
        </p>
      </section>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080/work/cost-estimation:
- Top nav (Work / Writing / About)
- Breadcrumb "Work / Cost Estimation"
- Title in Fraunces, subtitle in muted Inter Tight
- 4-column metadata strip
- 5 sections, each with a serif h2
- Pipeline diagram in mono font, light tinted background (uses `bg-accent-soft`)
- Outcome bullets render
- "What I'd do differently" shows the placeholder italics text
- Footer prev/next nav: "← " (none on left since this is the first case) and "Multi-provider AI →" on the right

Click "Multi-provider AI →" to confirm it navigates correctly.

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/CostEstimation.tsx
git commit -m "$(cat <<'EOF'
Build Cost Estimation case study with pipeline diagram and outcomes

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 18: Build the Multi-provider AI case study

**Files:**
- Modify: `src/pages/work/MultiProviderAi.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function MultiProviderAi() {
  useEffect(() => {
    document.title = "Multi-provider AI — Amaan Khan";
  }, []);

  return (
    <CaseStudyLayout
      slug="multi-provider-ai"
      title="Multi-provider AI orchestration"
      subtitle="10 providers, 50+ models powering enterprise generation workflows for Adidas, MillerKnoll, and others."
      metadata={[
        { label: "Role", value: "Software Developer" },
        { label: "Stack", value: "TypeScript, Node, MongoDB, pub/sub" },
        { label: "Customers", value: "Adidas, MillerKnoll" },
        { label: "Year", value: "2024" },
      ]}
    >
      <section>
        <h2 className="font-serif text-2xl mb-4">The problem</h2>
        <p>
          Naya's Workflow platform generates images, 3D models, and other assets
          for enterprise design teams. The customers don't care which AI
          provider sits behind it — they care that the generation works, looks
          good, and stays available when one provider has an outage or rate-limits
          a critical workload.
        </p>
        <p>
          Building against a single provider was a non-starter for any customer
          paying real money. The platform needed to fan out across providers,
          fall back transparently, and let internal users select models without
          knowing which infrastructure was running them.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A multi-provider AI generation platform spanning text-to-image,
          text-to-3D, and image-to-3D. 10 providers (OpenAI, Anthropic, Google
          Gemini, Stability AI, Meshy, Hunyuan, and others) and 50+ models in
          total. Each generation request flows through a provider router that
          handles model selection, fan-out, fallback, and queueing — the
          frontend doesn't know which provider served which response.
        </p>
        <p>
          I also engineered a custom Hunyuan 3D service that bypasses Tencent's
          hosted API limits. This dropped the per-generation cost for
          enterprise 3D workflows significantly and removed the licensing
          dependency that came with using their hosted offering.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`Frontend
   │
   ▼
Provider router ── model selection, params
   │
   ▼
Pub/sub queue ── decouples request from execution
   │
   ▼
Workers ── pool per provider class
   │   ├─ wraps each call in fallback controller
   │   └─ retries on rate-limit / quota / provider error
   │
   ▼
Completion event ── delivered via WebSocket
   │
   ▼
Frontend renders result`}</pre>
        <p>
          The fallback controller is the load-bearing piece. When a provider
          fails (rate limit, quota, outage, model deprecation), the controller
          re-issues the request against the next-best provider for that
          capability without surfacing the failure to the user. This is what
          makes the platform feel like one thing instead of ten.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Outcome</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>$200K+ Adidas deal</strong> — the platform's generation
            capabilities were a major component of the contract
          </li>
          <li>
            <strong>Additional MillerKnoll ARR</strong> through enterprise
            deployments
          </li>
          <li>
            <strong>Custom Hunyuan 3D service</strong> bypassing Tencent API
            limits — lower per-generation cost and reduced licensing dependency
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I'd do differently</h2>
        <p className="text-muted italic">
          {/* TODO: Amaan to fill in */}
          [Pending — to be written by Amaan.]
        </p>
      </section>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080/work/multi-provider-ai. Same shape as cost-estimation. Verify the prev/next nav: "← Cost Estimation" on left, "WOPI for Adidas →" on right.

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/MultiProviderAi.tsx
git commit -m "$(cat <<'EOF'
Build Multi-provider AI case study with provider-routing diagram

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 19: Build the WOPI for Adidas case study

**Files:**
- Modify: `src/pages/work/WopiAdidas.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function WopiAdidas() {
  useEffect(() => {
    document.title = "WOPI for Adidas — Amaan Khan";
  }, []);

  return (
    <CaseStudyLayout
      slug="wopi-adidas"
      title="WOPI integration for Adidas"
      subtitle="In-platform Microsoft Office editing for Adidas enterprise teams — Word and Excel documents edited without leaving Naya's Workflow platform."
      metadata={[
        { label: "Role", value: "Software Developer" },
        { label: "Stack", value: "TypeScript, Node, Microsoft WOPI protocol" },
        { label: "Customer", value: "Adidas" },
        { label: "Year", value: "2024" },
      ]}
    >
      <section>
        <h2 className="font-serif text-2xl mb-4">The problem</h2>
        <p>
          Adidas's enterprise teams needed to view and edit Microsoft Office
          documents — Word and Excel — inside Naya's Workflow platform, not
          download-edit-reupload through their desktop apps. The standard
          experience (open in Word, save locally, drag-drop back into the
          platform) loses version history, makes review cycles slower, and
          adds friction for non-technical users.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A full WOPI (Web Application Open Platform Interface) integration. WOPI
          is Microsoft's protocol for letting third-party document hosts plug
          into Office Online — when an authenticated request lands, Office
          Online opens the document inside an iframe in our platform, talks
          back to our WOPI host endpoints for read/write/lock operations, and
          users edit the document inline.
        </p>
        <p>
          The integration also covers Google Drive and SharePoint as additional
          enterprise storage backends — customers like Adidas keep documents
          in their existing storage and Naya brokers the editing flow.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`User clicks document in Workflow
        │
        ▼
Naya WOPI host generates access token
        │
        ▼
Frontend opens Office Online in iframe
        │  (URL includes access token + WOPI src)
        ▼
Office Online ◄──── reads file (CheckFileInfo, GetFile)
        │     ◄──── locks for edit
        │     ─────► writes back (PutFile)
        ▼
Naya WOPI host persists to backend
   (S3 / SharePoint / Google Drive)`}</pre>
        <p>
          The trickiest part of WOPI isn't the happy path — it's the locking
          semantics. Office Online expects exclusive write locks during an
          edit session, and the platform has to handle stale locks, refresh
          tokens, and concurrent-edit attempts cleanly. Most of the bugs
          I shipped lived in lock state.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Outcome</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Production rollout to Adidas enterprise teams; documents edited
            in-platform without context-switching to desktop Office
          </li>
          <li>
            Google Drive and SharePoint integrations layered on top — customers
            keep their existing storage strategy
          </li>
          <li>
            Outside Naya, I mentor engineers in the CSPP community on WOPI
            specifically — the protocol's documentation has historically been
            hard to navigate
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I'd do differently</h2>
        <p className="text-muted italic">
          {/* TODO: Amaan to fill in */}
          [Pending — to be written by Amaan.]
        </p>
      </section>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080/work/wopi-adidas. Verify prev/next: "← Multi-provider AI" / "Real-time collaboration →".

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/WopiAdidas.tsx
git commit -m "$(cat <<'EOF'
Build WOPI for Adidas case study with protocol-flow diagram

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 20: Build the Real-time collaboration case study

**Files:**
- Modify: `src/pages/work/RealtimeCollab.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { useEffect } from "react";
import CaseStudyLayout from "@/components/CaseStudyLayout";

export default function RealtimeCollab() {
  useEffect(() => {
    document.title = "Real-time collaboration — Amaan Khan";
  }, []);

  return (
    <CaseStudyLayout
      slug="realtime-collab"
      title="Real-time collaboration system"
      subtitle="Simultaneous multi-user editing across Naya's Workflow platform — WebSockets + MongoDB Change Streams + YJS."
      metadata={[
        { label: "Role", value: "Software Developer" },
        { label: "Stack", value: "TypeScript, Node, MongoDB, WebSockets, YJS" },
        { label: "Customers", value: "Workflow enterprise users" },
        { label: "Year", value: "2023" },
      ]}
    >
      <section>
        <h2 className="font-serif text-2xl mb-4">The problem</h2>
        <p>
          The Workflow platform's documents and design surfaces needed
          Google-Docs-style concurrent editing — multiple users editing the
          same document with live cursors, conflict-free merges, and durable
          server-side state. Customers expected this as table stakes by 2023;
          enterprise design teams don't work alone.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I built</h2>
        <p>
          A real-time collaboration layer combining three pieces: a YJS-based
          CRDT for in-memory document state (handles merge conflicts
          deterministically), WebSockets for low-latency client transport, and
          MongoDB Change Streams as the server-side feedback loop that keeps
          the persisted document in sync with the live one.
        </p>
        <p>
          I also engineered Python cloud functions for CAD-format conversion
          and ingestion pipelines that feed into the same collaborative
          documents — designs uploaded as STEP/IGES files get converted and
          ingested without breaking the collab session in progress.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">How it works</h2>
        <pre className="text-xs sm:text-sm font-mono bg-accent-soft p-4 overflow-x-auto leading-relaxed">{`Client A           Client B
   │ YJS doc          │ YJS doc
   │                  │
   ▼                  ▼
   WebSocket  ◄────►  WebSocket
        │                │
        ▼                ▼
   ┌────────────────────────┐
   │  WebSocket server      │
   │  (YJS sync protocol)   │
   └────────────────────────┘
              │
              ▼
   ┌────────────────────────┐
   │  MongoDB               │
   │  (document store)      │
   └────────────────────────┘
              │
              ▼ Change Streams
   ┌────────────────────────┐
   │  Server-side observers │
   │  (replay back to YJS)  │
   └────────────────────────┘`}</pre>
        <p>
          The reason MongoDB Change Streams sit in the loop alongside YJS is
          that not every change comes from a connected client. Server-side
          mutations (CAD ingestion, AI generation results, scheduled imports)
          need to flow back into the live document. Change Streams give a
          single source of truth for "the document changed, regardless of who
          changed it" and the YJS layer handles the merge.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">Outcome</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Production-grade concurrent editing across the Workflow platform's
            document surfaces
          </li>
          <li>
            Sleep Mode — a DOM offload system that suspends inactive
            collaborative sessions while preserving server state, eliminating
            long-session tab crashes for returning users
          </li>
          <li>
            Combined with React virtualization, lazy loading, and code-splitting:{" "}
            <strong>90% image-load improvement, 50% page-render speedup,
            500MB+ memory reduction</strong> on long sessions
          </li>
        </ul>
      </section>

      <section>
        <h2 className="font-serif text-2xl mb-4">What I'd do differently</h2>
        <p className="text-muted italic">
          {/* TODO: Amaan to fill in */}
          [Pending — to be written by Amaan.]
        </p>
      </section>
    </CaseStudyLayout>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080/work/realtime-collab. Verify prev/next: "← WOPI for Adidas" on left, no next-link (this is the last case study — should show an empty span instead of breaking the layout).

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/work/RealtimeCollab.tsx
git commit -m "$(cat <<'EOF'
Build Real-time collaboration case study with YJS+ChangeStreams diagram

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 21: Build the `/work` index page

Lifts the Selected work rows from the homepage into a standalone page.

**Files:**
- Modify: `src/pages/Work.tsx`

- [ ] **Step 1: Write the full Work page**

```tsx
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkRow from "@/components/WorkRow";
import { workItems } from "@/lib/work-items";

export default function Work() {
  useEffect(() => {
    document.title = "Work — Amaan Khan";
  }, []);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 pb-12">
        <header className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight">Work</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Selected projects from my time at Naya Studio.
          </p>
        </header>

        <div>
          {workItems.map((item) => (
            <WorkRow key={item.slug} item={item} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080/work. Nav at top with "Work" highlighted. Header + 4 rows. Click each row, verify it lands on the right case study.

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Work.tsx
git commit -m "$(cat <<'EOF'
Build Work index page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 22: Build the `/writing` skeleton page

Routing-ready but no posts yet.

**Files:**
- Modify: `src/pages/Writing.tsx`

- [ ] **Step 1: Write the page**

```tsx
import { useEffect } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function Writing() {
  useEffect(() => {
    document.title = "Writing — Amaan Khan";
  }, []);

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-prose px-4 pb-12">
        <header className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl leading-tight">Writing</h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Notes on shipping AI-native products, multi-provider orchestration,
            and solo engineering at scale.
          </p>
        </header>

        <p className="text-muted italic">First posts coming soon.</p>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080/writing. Nav at top with "Writing" highlighted. Header + placeholder line.

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Writing.tsx
git commit -m "$(cat <<'EOF'
Build Writing skeleton page

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 23: Restyle the NotFound page

Match the new design tokens. The existing console-error logging and useLocation can go — quiet 404 is fine.

**Files:**
- Modify: `src/pages/NotFound.tsx`

- [ ] **Step 1: Replace `src/pages/NotFound.tsx` with**

```tsx
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not found — Amaan Khan";
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-prose text-center">
        <p className="font-serif text-5xl mb-4">404</p>
        <p className="text-muted mb-6">
          That page doesn't exist (or hasn't been written yet).
        </p>
        <Link
          to="/"
          className="text-accent hover:underline underline-offset-4"
        >
          Back home
        </Link>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open http://localhost:8080/some-bogus-path. NotFound renders with Fraunces "404", muted prose, accent link back home. Toggle dark mode via the homepage and reload to ensure NotFound respects theme too — though it doesn't have the footer (intentional, matches the minimal feel).

Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add src/pages/NotFound.tsx
git commit -m "$(cat <<'EOF'
Restyle NotFound page to match new design tokens

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 24: Final integration check — build, route smoke, accent swap, theme

A self-contained dry-run of the whole site before declaring v1 ready.

- [ ] **Step 1: Run a clean production build and confirm 404.html ships**

```bash
rm -rf dist/
npm run build
ls dist/index.html dist/404.html dist/amaan-khan-resume.pdf dist/assets/
```

Expected: `dist/index.html`, `dist/404.html`, and `dist/amaan-khan-resume.pdf` all present. `dist/assets/` contains the bundled JS/CSS and `profile-*.png` (Vite hashes the filename).

- [ ] **Step 2: Run `npm run preview` and walk every route**

```bash
npm run preview
```

Open http://localhost:4173 (Vite preview's default port) and visit, in order:

- `/` — homepage, all 3 sections render, stagger animation plays
- `/about` — photo loads, all 3 sections render, hiring anchor jumps correctly via `/about#hiring`
- `/work` — index renders 4 rows
- `/work/cost-estimation` — full content + diagram
- `/work/multi-provider-ai` — full content + diagram
- `/work/wopi-adidas` — full content + diagram
- `/work/realtime-collab` — full content + diagram
- `/writing` — skeleton renders
- `/nonexistent` — NotFound renders

For each, open DevTools → Console and confirm no errors or warnings about missing assets.

Test the SPA fallback: in preview's URL bar, manually type http://localhost:4173/work/cost-estimation directly (not via a click). Reload (Ctrl+R). It should still load the case study — confirms the 404.html fallback works the way GH Pages will serve it.

Stop preview (Ctrl+C).

- [ ] **Step 3: Cycle through 3 accent colors and confirm the swap works**

```bash
npm run dev
```

Open http://localhost:8080. Note the current accent color (amber by default). Then edit `src/index.css`:

1. Comment out the `--accent: 24 90% 37%;` line (amber)
2. Uncomment `--accent: 162 43% 21%;` (forest)
3. Save — the browser should hot-reload within 1–2 seconds with green-tinted arrows, hover states, and accent text

Repeat with a brighter accent (uncomment `--accent: 244 100% 67%;` — stripe blurple). Then revert to amber for the commit.

Stop dev server.

- [ ] **Step 4: Toggle light/dark and confirm contrast holds across all pages**

```bash
npm run dev
```

Open http://localhost:8080. Click the footer's theme toggle and walk each route again. Look specifically for:
- Anywhere the contrast feels low (especially the work-row hover tint on dark mode — `accent-soft` at 0.06 may be too subtle on dark)
- Any image/SVG that has a transparent background and disappears on dark mode
- Focus rings visible on both modes

Stop dev server.

- [ ] **Step 5: If anything broke during Steps 1–4, fix and commit**

If hover backgrounds are too subtle on dark mode, bump `accent-soft` to 0.10 in `tailwind.config.ts`:

```ts
"accent-soft": "hsl(var(--accent) / 0.10)",
```

If any other contrast issue surfaces, fix the specific token in either `src/index.css` or `tailwind.config.ts`. Commit each fix as its own commit:

```bash
git add <file>
git commit -m "Fix <specific issue> uncovered in final integration check"
```

If nothing needs fixing, skip to Step 6.

- [ ] **Step 6: Run Lighthouse in Chrome and record scores**

In Chrome DevTools → Lighthouse → run for `/` (Mobile, all categories). Expected scores: ≥95 in Performance, Accessibility, Best Practices, SEO.

If anything is below 95, address the specific finding (most likely candidates: missing alt text, missing meta description on a subpage, low contrast on a dark-mode color). Commit each fix as above.

- [ ] **Step 7: Final commit if there are any uncommitted changes**

```bash
git status
```

If clean, you're done. If anything is uncommitted, group the changes thematically and commit.

---

## Self-Review

**Spec coverage:** Walking through the spec section by section:

- *Architecture, stack changes (kept/removed/added):* Task 1 (add stubs), Task 2 (delete old components), Task 3 (rename assets), Task 4 (postbuild script), Task 5 (index.css), Task 6 (tailwind config), Task 7 (index.html metadata + hydration script), Task 8 (ThemeProvider). ✓
- *File structure:* Tasks 1, 9, 10, 11, 12, 13, 16. ✓ (slight deviation: PascalCase naming, called out in plan header)
- *Routing + SPA fallback:* Task 1 (routes), Task 4 (postbuild fallback). ✓
- *Design system (tokens, fonts, light/dark, animation, responsive, accessibility):* Tasks 5, 6, 7, 8, 11, 12, 14 (stagger), 15 (focus rings throughout components). ✓
- *Homepage content (3 sections):* Task 14. ✓
- *About content (photo + 3 sections):* Task 15. ✓
- *4 case studies:* Tasks 17, 18, 19, 20. ✓
- */work index:* Task 21. ✓
- */writing skeleton:* Task 22. ✓
- *NotFound restyle:* Task 23. ✓
- *Deployment:* Task 4 (postbuild script) + no workflow change needed. ✓
- *SEO metadata:* Task 7 (index.html base), per-page `document.title` set in each page's `useEffect`. ✓
- *Risks (theme hydration flicker):* Task 7 inline script + Task 11 mounted-guard. ✓
- *Success criteria (Lighthouse ≥95, all routes work, swap mechanism, no flicker):* Task 24. ✓

**Placeholder scan:** The only TODO comments in code are the four "What I'd do differently" sections in the case studies, which are user-content placeholders explicitly marked in the spec under "Open items." Each is clearly marked `{/* TODO: Amaan to fill in */}` with italicized placeholder text so it's visually obvious when reading the rendered page. No internal "TBD" or "implement later" in the plan.

**Type consistency:** `WorkItem` type defined in `lib/work-items.ts` (Task 9), used by `WorkRow` (Task 10), `Home` (Task 14), `Work` (Task 21), and `CaseStudyLayout`'s prev/next derivation (Task 16). All references use the same shape. Slug values used in `lib/work-items.ts` (`cost-estimation`, `multi-provider-ai`, `wopi-adidas`, `realtime-collab`) exactly match the routes registered in `App.tsx` (Task 1) and the `slug` prop passed to each case study's `CaseStudyLayout` call (Tasks 17–20). Verified.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-17-portfolio-rebuild.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?
