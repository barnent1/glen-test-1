# Reviewer Memory: glen-test-1

## Recurring Issues (watch for these)
- Generic layout metadata (`title: "App"`, `description: "App description"`) left in `src/app/layout.tsx` — not yet updated to match real product content. Flag if still unresolved when navigation/branding PR lands.

## Anti-patterns in this codebase
- Do NOT import ShadCN/Radix components — they are not installed. Use Tailwind inline card styling (`rounded-2xl border bg-white shadow-sm p-6`). Documented in `.glori-builder/decisions.md`.
- Do NOT add `"use client"` to layout.tsx (server component) — only leaf/interactive components need it.
- Framer Motion variant orchestration: stagger parent must NOT redeclare `initial`/`animate` on children; children set only `variants` and (optionally) `transition`. Correctly done in issue 38120130.
- `text-muted-foreground` is NOT a valid Tailwind class in this project — ShadCN is not installed. TeamMemberCard.tsx uses it for the title; this must be replaced with `text-slate-500`.

## Accessibility / WCAG notes
- `text-gray-500` on white background is 3.95:1 — fails WCAG AA for normal text. Use `text-gray-600` (5.74:1) or darker for label text in ContactInfo and similar components.
- Navigation active/inactive link contrast: `text-gray-600` inactive on white is 5.74:1 ✓; `text-gray-900 bg-gray-100` active is ≥7:1 ✓.
- All focusable links must have `focus-visible:ring` visible focus styles.
- `<nav>` must have `aria-label="Main navigation"`. Active link must have `aria-current="page"`.

## Areas of risk
- `src/app/layout.tsx` — metadata title/description are generic placeholders; needs update when branding is finalised.
- `src/app/page.tsx` inline stub data (`companyData`) — must be replaced with import from `src/lib/data.ts` when issue `e879c601` branch merges; easy to forget.
- `GLORI-BUILDER.md` verification section was broken (called `npm run test` and `npx biome check` — neither is available). Fixed in issue bce9633f to: `npm run type-check`, `npm run lint`, `timeout 600 npm run build`.
- `staggerContainer` variant object lacks an `initial` key — intentional (Framer Motion propagation), but future developers may add one incorrectly and break stagger.
- `src/app/about/page.tsx` does not exist on `main` as of 2026-06-13 (upstream PRs 5f74a7af, 7ed270bd, b235dad2 are `ai_pr_ready` but not merged). Accessibility issue bce9633f must create it directly.
