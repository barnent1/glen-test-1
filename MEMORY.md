# Reviewer Memory: glen-test-1

## Recurring Issues (watch for these)
- Generic layout metadata (`title: "App"`, `description: "App description"`) left in `src/app/layout.tsx` — not yet updated to match real product content. Flag if still unresolved when navigation/branding PR lands. (Recurring — still unfixed after bce9633f)
- Framer Motion stagger + children both re-declare `initial`/`animate` — architecturally inconsistent with the documented pattern (stagger parent should not also declare `initial`/`animate` on children that propagate variants). Present in `about/page.tsx` and `page.tsx`. Non-blocking (build passes) but flag if a dedicated animation-refactor PR appears.

## Anti-patterns in this codebase
- Do NOT import ShadCN/Radix components — they are not installed. Use Tailwind inline card styling (`rounded-2xl border bg-white shadow-sm p-6`). Documented in `.glori-builder/decisions.md`.
- Do NOT add `"use client"` to layout.tsx (server component) — only leaf/interactive components need it.
- Framer Motion variant orchestration: stagger parent must NOT redeclare `initial`/`animate` on children; children set only `variants` and (optionally) `transition`. Correctly done in issue 38120130. **VIOLATION: about/page.tsx and page.tsx stagger containers both re-declare `initial="initial" animate="animate"` on the stagger parent AND each child gets inherited `fadeInUp` which also has `initial`/`animate` keys — this contradicts the documented pattern. Build still passes but is architecturally inconsistent.**
- `text-muted-foreground` is NOT a valid Tailwind class in this project — ShadCN is not installed. Fixed in bce9633f (replaced with `text-slate-500`).

## Accessibility / WCAG notes
- `text-gray-500` on white background is 3.95:1 — fails WCAG AA for normal text. Fixed in bce9633f (now `text-gray-600`).
- Navigation active/inactive link contrast: `text-gray-600` inactive on white is 5.74:1 ✓; `text-gray-900 bg-gray-100` active is ≥7:1 ✓.
- Active link `text-gray-900` class added in fix commit c19f107 ✓. `aria-current="page"` also added ✓.
- All focusable links must have `focus-visible:ring` visible focus styles. ✓ Fixed in bce9633f.
- `<nav>` must have `aria-label="Main navigation"`. ✓ Fixed in bce9633f.
- Double-nested `<section>` landmark resolved: `ContactInfo` no longer renders its own `<section>`; it now renders `<div><div>...<address>` — callers own the wrapping `<section>`. ✓ Fixed in c19f107.

## Fixed issues (do NOT re-flag)
- `next.config.ts` `images.remotePatterns` for `images.unsplash.com` — ✓ resolved in c19f107.
- `text-muted-foreground` in `TeamMemberCard` — ✓ replaced with `text-slate-500` in bce9633f.
- `ContactInfo` label text `text-gray-500` → `text-gray-600` — ✓ resolved in bce9633f.
- Double-nested `<section>` landmark in `ContactInfo` — ✓ resolved in c19f107 (outer `<section>` → `<div>`).
- Navigation active link missing `text-gray-900` — ✓ resolved in c19f107.

## Areas of risk
- `src/app/layout.tsx` — metadata title/description are generic placeholders; needs update when branding is finalised.
- `src/app/page.tsx` inline stub data (`companyData`) — must be replaced with import from `src/lib/data.ts` when issue `e879c601` branch merges; easy to forget.
- `src/app/about/page.tsx` inline stub data (`teamMembers`, `contact`) — must be replaced with import from `src/lib/data.ts` when issue `e879c601` branch merges; same risk.
- `GLORI-BUILDER.md` verification section now correct: `npm run type-check`, `npm run lint`, `timeout 600 npm run build`.
- `staggerContainer` variant object lacks an `initial` key — intentional (Framer Motion propagation), but future developers may add one incorrectly and break stagger.
- `ContactInfo` outer wrapper is now a redundant bare `<div>` wrapping another `<div class="rounded-lg ...">`. Functionally harmless but adds superfluous DOM nesting — low priority cleanup item.
