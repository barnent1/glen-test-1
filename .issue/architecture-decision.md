# Architecture Decision — Create Home Page (Issue 38120130)

## Summary

Implement `src/app/page.tsx` as the Quetrex Foundation home page. The page uses
Framer Motion entrance animations, Tailwind CSS v4 responsive layout, and
inline card-like components (ShadCN UI is **not** installed; use Tailwind + CVA
equivalents instead).

---

## Technical Approach

### Dependencies available (confirmed in package.json)
- `framer-motion` ^12 — entrance animations ✓
- `tailwindcss` ^4 — Tailwind v4 (uses `@import "tailwindcss"` syntax, no `tailwind.config.[ts|js]`)
- `class-variance-authority`, `clsx`, `tailwind-merge` — component styling utilities ✓
- `lucide-react` — icons ✓
- **ShadCN UI is NOT installed** — no `components.json`, no `@radix-ui/*` packages

### ShadCN fallback
The issue says "ShadCN UI Card or **similar**". Since ShadCN is not installed and
there is no `components.json`, implement a native card component using Tailwind
classes (`rounded-2xl border bg-white shadow-sm p-6` or similar). This achieves
the same visual structure without the ShadCN dependency. Do NOT attempt to
`npx shadcn-ui add card` — the developer owns only `src/app/page.tsx`.

### Dependency on sibling branches (NOT yet merged)
This issue depends on two sibling issues that are marked `[ai_pr_ready]` but
not yet merged onto `main`:

1. **Mock data module** (issue `e879c601`) — likely at `src/lib/data.ts`.
2. **Navigation component** (issue `519b8ee8`) — likely at
   `src/components/Navigation.tsx`.

Because neither file exists on `main` yet, the developer MUST create local
stubs/type definitions within `src/app/page.tsx` (or adjacent co-located files
in `src/app/`) that will be replaced when those branches land. Specifically:

- **Mock data stub**: Define the company/contact types and a `companyData`
  constant inline in `page.tsx` (or in a co-located `src/app/_data.ts`).
  Mirror the shape the real module will export so the import path swap is trivial.
- **Navigation stub**: Do NOT import the Navigation component (it doesn't exist
  yet on `main`). Skip `<Navigation />` usage in `page.tsx`; `layout.tsx` will
  add it (issue `5d152ebf`). The home page should rely on `layout.tsx` for the
  nav wrapper.

### File scope
`src/app/page.tsx` only — exact as required. No new shared modules, no new
`/components` directory.

### Layout structure
```
<main>
  ├── Hero / Welcome section   (Framer Motion fade-in-up)
  │   ├── Foundation name (h1)
  │   └── Mission statement tagline (p)
  ├── About card section        (Framer Motion fade-in, delay)
  │   └── Card: description + founding year
  └── Values section            (Framer Motion staggered cards)
      └── Card grid (1-col mobile / 2-col tablet / 3-col desktop)
</main>
```

Responsive breakpoints: `sm:` (640 px), `md:` (768 px), `lg:` (1024 px).

### Framer Motion usage
Use `"use client"` directive at the top — Framer Motion requires it in the
Next.js App Router. Use `motion.div` with `initial/animate/transition` props.
No `AnimatePresence` needed (page already mounted on navigation).

### Tailwind v4 note
Tailwind v4 uses CSS-first config. No `tailwind.config.ts` exists. All classes
are available via the `@import "tailwindcss"` directive in `globals.css`. Use
standard utility classes only; no `@apply` of non-existent custom tokens
(except `--color-background` / `--color-foreground` which are defined in
`globals.css`).

---

## Assumptions

1. The mock data shape from issue `e879c601` will have at minimum:
   - `company.name`, `company.mission`, `company.description`,
     `company.foundingYear`, `company.values: string[]`
   The developer should define matching types locally.

2. The `<Navigation />` component will be added by `src/app/layout.tsx` (issue
   `5d152ebf`). `page.tsx` does NOT import it.

3. "ShadCN UI Card or similar" is satisfied by inline Tailwind card styling
   given ShadCN is not installed.

---

## File Ownership Map

### Workstream: `main` (single developer)

| File | Action |
|---|---|
| `src/app/page.tsx` | **Rewrite** — full home page implementation |

**No other files are touched.**

---

## Dependency Order

This is a single-workstream issue. No parallelism required.

External unmerged dependencies:
- `src/lib/data.ts` (mock data, `e879c601`) — stub inline until merged
- `src/components/Navigation.tsx` (`519b8ee8`) — not imported; layout handles it

---

## Acceptance Criteria

1. `src/app/page.tsx` renders a welcome section with Quetrex Foundation name and
   mission statement using Framer Motion entrance animation.
2. Page uses Tailwind responsive classes: single-column on mobile, multi-column
   grid on tablet/desktop for the values section.
3. Card-style visual structure is applied to at least the About and Values
   sections using Tailwind utility classes.
4. File uses `"use client"` directive (required for Framer Motion).
5. `npm run type-check` (`tsc --noEmit`) exits 0.
6. `timeout 600 npm run build` exits 0.
7. No `@radix-ui` or ShadCN imports (packages not installed).
8. Only `src/app/page.tsx` is modified; no other existing files are altered.

---

## Verification Section Status

`GLORI-BUILDER.md` already contains a correct `## Verification` section for the
Node/TypeScript stack (confirmed present). No changes required.

---

## Designer Required

`designer_required: false` — layout and visual design are fully specified by
Tailwind utility classes; no custom design assets or Figma handoff needed.
