# Reviewer Memory: glen-test-1

## Recurring Issues (watch for these)
- Generic layout metadata (`title: "App"`, `description: "App description"`) left in `src/app/layout.tsx` — not yet updated to match real product content. Flag if still unresolved when navigation/branding PR lands.

## Anti-patterns in this codebase
- Do NOT import ShadCN/Radix components — they are not installed. Use Tailwind inline card styling (`rounded-2xl border bg-white shadow-sm p-6`). Documented in `.glori-builder/decisions.md`.
- Do NOT add `"use client"` to layout.tsx (server component) — only leaf/interactive components need it.
- Framer Motion variant orchestration: stagger parent must NOT redeclare `initial`/`animate` on children; children set only `variants` and (optionally) `transition`. Correctly done in issue 38120130.

## Areas of risk
- `src/app/layout.tsx` — metadata title/description are generic placeholders; needs update when branding is finalised.
- `src/app/page.tsx` inline stub data (`companyData`) — must be replaced with import from `src/lib/data.ts` when issue `e879c601` branch merges; easy to forget.
- `GLORI-BUILDER.md` verification step 3 calls `npm run test` — no test script exists in `package.json`. Will fail QA gate until a test runner is added or the step is removed.
- `staggerContainer` variant object lacks an `initial` key — intentional (Framer Motion propagation), but future developers may add one incorrectly and break stagger.
