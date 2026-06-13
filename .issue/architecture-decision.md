# Architecture Decision: Responsive Design Polish & Accessibility Enhancements

**Issue ID:** bce9633f-b566-450b-ad56-1724229f1e26  
**Branch:** feature/bce9633f-add-responsive-design-polish-and-accessibility-enh

---

## Scope

Enhance five files for semantic HTML, ARIA, keyboard navigation, WCAG AA colour contrast, and responsive breakpoint coverage:

1. `src/app/page.tsx`
2. `src/app/about/page.tsx` *(does not yet exist on main — dependent issues are `ai_pr_ready`; developer must create it)*
3. `src/components/Navigation.tsx`
4. `src/components/TeamMemberCard.tsx`
5. `src/components/ContactInfo.tsx`

---

## Technical Approach

### Semantic HTML

- `src/app/page.tsx` already uses `<main>` and `<section>`. Ensure value cards in the "Our Values" section are wrapped in `<article>` elements; the surrounding grid is already a `<section>`.
- `src/app/about/page.tsx` must use `<main>`, `<section>` (mission, values, team, contact), and `<article>` per team member card.
- `src/components/Navigation.tsx` wraps links in a `<nav>` already. Add `aria-label="Main navigation"` to `<nav>`.
- `src/components/TeamMemberCard.tsx` card root should be `<article>` instead of bare `<div>`.
- `src/components/ContactInfo.tsx` should wrap the contact section in `<address>` (HTML semantic element for contact info) with a containing `<section aria-label="Contact information">`.

### ARIA Labels & Roles

| Element | ARIA addition |
|---|---|
| `<nav>` in Navigation | `aria-label="Main navigation"` |
| Active link in Navigation | `aria-current="page"` |
| TeamMemberCard `<article>` | `aria-label={member.name}` |
| ContactInfo social links | `aria-label={\`Visit us on ${item.platform}\`}` |
| ContactInfo external links | `aria-label` already implied by `rel="noopener noreferrer"` — add `aria-label` explicitly |
| Image in TeamMemberCard | alt already set; ensure it is non-empty at runtime |

### Keyboard Navigation

- Navigation links are `<a>` via Next.js `<Link>` — natively keyboard-focusable. Add a `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500` style to the active/inactive link classes.
- Social media links in ContactInfo: same `focus-visible:ring` additions.
- No custom interactive widgets; no `tabindex` manipulation needed.

### WCAG AA Contrast Ratios (via Tailwind palette)

Current issues detected:
- Navigation active state uses `text-gray-900 bg-gray-100` — contrast ratio ≥ 7:1 ✓. Inactive uses `text-gray-600` on white background — 5.74:1 ✓ (passes AA for normal text).
- `TeamMemberCard` uses `text-muted-foreground` for title — this is a ShadCN custom prop that is **not defined** in this project (ShadCN not installed). Replace with `text-slate-500` (explicit Tailwind, contrast 4.6:1 vs white ✓ AA normal-size).
- `ContactInfo` uses `text-gray-500` for labels — 3.95:1 vs white. This **fails WCAG AA (4.5:1)** for normal text. Use `text-gray-600` (5.74:1 ✓).
- ContactInfo social link buttons `text-gray-700 border-gray-300` on white: 4.7:1 ✓.

### Responsive Breakpoints

Tailwind responsive classes strategy (375px → 768px → 1280px):
- `Navigation.tsx`: currently `flex gap-2 p-4` — full width nav bar; acceptable but should have `container mx-auto` max-width and appropriate padding at each breakpoint: `px-4 sm:px-6 lg:px-8`.
- `src/app/page.tsx`: already uses `sm:` and `lg:` prefixes throughout. Add `sm:px-6` intermediate step where currently `px-6 sm:px-12` jumps too large.
- `src/app/about/page.tsx`: must use same responsive padding/grid patterns as home page.
- `TeamMemberCard`: image height `h-48` — sufficient at all breakpoints.
- `ContactInfo`: `p-6` is adequate at all sizes; ensure `flex-wrap` on social links is present (already is).

---

## File Ownership Map

This is a **single workstream** — all five files are tightly related (accessibility audit is holistic; the same patterns must be consistent across all), and `about/page.tsx` does not yet exist on `main` so it must be created by the same developer who writes the components it consumes.

| File | Owner |
|---|---|
| `src/app/page.tsx` | WS-accessibility |
| `src/app/about/page.tsx` | WS-accessibility (create if not yet merged from dependency) |
| `src/components/Navigation.tsx` | WS-accessibility |
| `src/components/TeamMemberCard.tsx` | WS-accessibility |
| `src/components/ContactInfo.tsx` | WS-accessibility |

---

## Dependency Notes

- Issues `5f74a7af` (Create About page), `7ed270bd` (Refactor About page with TeamMemberCard), and `b235dad2` (Refactor About page with ContactInfo) are all `ai_pr_ready` (not yet merged). The developer **must** cherry-pick or wait for those PRs to merge, OR create `src/app/about/page.tsx` directly incorporating TeamMemberCard and ContactInfo with the accessibility enhancements. The latter approach is recommended to avoid blocking on sibling PR merges.
- The `Navigation.tsx` from merged issue `519b8ee8` and `TeamMemberCard` from `f0f5a8c7` and `ContactInfo` from `6c484e6a` are already on `main` — modify in place.

---

## Assumptions

1. `text-muted-foreground` in `TeamMemberCard.tsx` is treated as a bug (undefined CSS variable); replaced with `text-slate-500`.
2. The About page will be created as a new file by this workstream since upstream PRs are not yet merged.
3. No `src/lib/data.ts` module exists yet; About page will use the same inline stub pattern as `page.tsx` (same pattern the home page uses) per MEMORY.md note about `e879c601`.
4. Framer Motion is available and used on home page; About page may use the same animation variants.
5. ShadCN UI is NOT available — all card styling uses Tailwind classes per `.glori-builder/decisions.md`.

---

## Acceptance Criteria

### WS-accessibility

1. `npm run build` exits 0 with no TypeScript or compilation errors.
2. `npx tsc --noEmit` exits 0 — zero type errors.
3. `<nav>` in Navigation.tsx has `aria-label="Main navigation"`.
4. Active `<Link>` in Navigation.tsx has `aria-current="page"`.
5. All focusable interactive elements (links, buttons) have `focus-visible:ring` visible focus styles — keyboard navigable.
6. `<TeamMemberCard>` root element is `<article>` with `role` implied by semantic tag.
7. `ContactInfo` label text uses `text-gray-600` or darker (contrast ≥ 4.5:1 vs white background).
8. `text-muted-foreground` removed from TeamMemberCard (replaced with `text-slate-500`).
9. `src/app/about/page.tsx` exists and uses `<main>`, `<section>`, `<article>` semantic elements.
10. All pages use responsive Tailwind breakpoint classes covering 375px, 768px, 1280px.
11. `npm run lint` exits 0.

---

## Verification

Run in this order before marking PR ready:

```bash
npm run type-check
npm run lint
timeout 600 npm run build
```

All three must exit 0.

---

## Designer Required

`designer_required: false` — this is an accessibility and semantic HTML polish task. Color choices are constrained to WCAG AA compliance within the existing Tailwind palette already in use. No net-new visual design decisions are needed.
