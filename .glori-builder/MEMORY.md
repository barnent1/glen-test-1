# Architect Memory: glen-test-1

## Stack
Next.js 16 App Router + TypeScript strict + Tailwind CSS v4 + Framer Motion.
No ShadCN UI (not installed — no components.json, no @radix-ui packages).
TanStack Query + Zustand present in package.json (not yet used).

## Key Patterns
- Tailwind v4: CSS-first config, `@import "tailwindcss"` in globals.css. No tailwind.config.ts.
- Path alias `@/*` → `src/*` (configured in tsconfig.json).
- App Router layout: `src/app/layout.tsx` wraps all pages; navigation belongs there.
- Framer Motion requires `"use client"` directive in App Router files.
- Mock data lives on sibling branch (issue e879c601), likely exports from `src/lib/data.ts`.
- Navigation component on sibling branch (issue 519b8ee8), likely `src/components/Navigation.tsx`.

## Gotchas
- ShadCN UI is NOT installed despite PRD mentioning it. Use Tailwind-only card styling.
- GLORI-BUILDER.md verification section IS present (snapshot flag "false" was stale/incorrect).
- Verification step 3 calls `npm run test` but no test script exists in package.json — this will fail at QA. Developer should be aware.
- Sibling branches (mock data, navigation) must be merged before final integration; stub inline until then.

## Decisions Log
- 2026-06-13: ShadCN not installed → use Tailwind inline card styling as equivalent (see .issue/architecture-decision.md for issue 38120130).
