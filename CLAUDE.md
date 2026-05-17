# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio (Amaan Khan) built with Vite + React 18 + TypeScript + shadcn/ui + Tailwind. Originally scaffolded via Lovable.dev (hence the generic README and the `lovable-tagger` dev plugin). Deployed to GitHub Pages at `https://amaankhan63.github.io/` — repo is named `amaankhan63.github.io` and serves at the root path (renamed from earlier `amaan.github.io`, which required a sub-path base).

## Commands

```sh
npm run dev          # Vite dev server on http://localhost:8080
npm run build        # Production build → dist/
npm run build:dev    # Dev-mode build (includes lovable-tagger)
npm run lint         # ESLint over the repo
npm run preview      # Serve the production build locally
npm test             # vitest run (one-shot)
npm run test:watch   # vitest in watch mode
```

Run a single test file: `npx vitest run src/path/to/file.test.ts`. Filter by name: `npx vitest run -t "name pattern"`.

Use **npm** even though `bun.lockb` is also present — CI (`.github/workflows/deploy.yml`) installs with `npm install`.

## Deployment

Push to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes `dist/` to the `gh-pages` branch via `peaceiris/actions-gh-pages@v3`. No manual deploy step.

## Architecture

### One page, many sections (not many routes)

The portfolio is a single route. `src/pages/Index.tsx` composes section components in order: `Hero → About → Experience → Skills → Education → Contact → Footer`. The header (`src/components/Header.tsx`) navigates with **anchor links** (`#about`, `#experience`, `#skills`, `#contact`) and `html { scroll-behavior: smooth }` in `src/index.css` handles the scrolling.

**To add a new portfolio section:** create a component in `src/components/`, import + render it in `Index.tsx`, and add a matching `{ href: "#newid", label: "..." }` entry to `navLinks` in `Header.tsx`. Don't add a `<Route>` — `App.tsx` only routes `/` and a catch-all 404.

### GitHub Pages base path

The repo is named `amaankhan63.github.io` and GitHub Pages serves it at root (`https://amaankhan63.github.io/`). Both config locations should reflect this:

- `vite.config.ts` → `base: '/'`
- `src/App.tsx` → `<BrowserRouter>` (no `basename`)

If the repo ever moves to a non-root path (e.g. renamed to a non-`<user>.github.io` repo), both need to be updated together. Recent commits show this area has churned (HashRouter ↔ BrowserRouter, base URL adjustments) — be careful here.

### Path alias

`@/*` → `./src/*` is configured in `tsconfig.json`, `tsconfig.app.json`, `vite.config.ts`, and `vitest.config.ts`. Prefer `@/components/...` over relative imports.

### Design system

Defined in `src/index.css` as CSS variables consumed by `tailwind.config.ts`. Conventions to follow when adding UI:

- **Colors must be HSL** (e.g. `0 0% 100%`), not hex or rgb. They are referenced as `hsl(var(--name))`.
- `--radius: 0rem` — the design is intentionally **square**. Don't add `rounded-*` classes unless matching an existing exception (Header's social/menu buttons are explicitly `rounded-full`).
- **Neo-brutalist offset shadows**: use the `shadow-{xs,sm,md,lg,xl,2xl}` scale (or the inline `shadow-[Npx_Npx_0px_0px_hsl(var(--foreground))]` form) — they're solid offset blocks, not soft drop shadows.
- Three font families: `font-sans` (Space Grotesk), `font-serif` (Lora), `font-mono` (Space Mono). Mono is used for nav/labels in uppercase tracking.
- Light + dark variants both defined in `:root` / `.dark` — but no theme toggle is wired up in the UI today.

### shadcn/ui is mostly scaffolding

`src/components/ui/` contains ~55 shadcn components. The portfolio actually uses only a handful (Button, Toaster, Sonner, TooltipProvider). Don't assume an unused component is referenced before grepping. When adding shadcn components, use the aliases in `components.json` (`@/components/ui`, `@/lib/utils`, `@/hooks`).

### TanStack Query is wired but unused

`App.tsx` wraps the tree in `QueryClientProvider`, but the portfolio has no queries. Left in place from the template — fine to leave, fine to use if you need data fetching.

## TypeScript & lint posture

The TS config is intentionally loose: `strict: false`, `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedLocals: false`, `noUnusedParameters: false` (in both `tsconfig.json` and `tsconfig.app.json`). ESLint also disables `@typescript-eslint/no-unused-vars`. Don't be surprised by missing narrowing or unused symbols — match the existing style rather than fighting it.

## Tests

Vitest + jsdom + `@testing-library/react`. Config in `vitest.config.ts`, setup in `src/test/setup.ts` (which mocks `window.matchMedia` — needed for components using media queries / `useIsMobile`). Test files match `src/**/*.{test,spec}.{ts,tsx}`. Only `src/test/example.test.ts` exists today; treat it as the placeholder it is.

## Misc gotchas

- `vite.config.ts` sets `server.hmr.overlay: false` — HMR errors won't pop up over the page. Check the terminal/console.
- `Amaan.tex` in the repo root is a LaTeX résumé, not part of the build. Leave it alone.
- The README is the Lovable.dev default and contains placeholder URLs; don't treat it as authoritative.
