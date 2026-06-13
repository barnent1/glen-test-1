# Architecture Decision: Refactor About page to use ContactInfo component

**Issue:** b235dad2-a840-4b5b-89d4-8aa7e9027038  
**Branch:** feature/b235dad2-refactor-about-page-to-use-contactinfo-component  
**Date:** 2026-06-13

---

## Context

This issue refactors `src/app/about/page.tsx` to import and render the `ContactInfo` component instead of inline JSX for contact details.

### Dependency State (at planning time)

Two upstream pieces must be merged before this work is meaningful:

| Dependency | Issue | Status |
|---|---|---|
| `ContactInfo` component | 6c484e6a (Create ContactInfo component) | ai_pr_ready (not yet merged) |
| `app/about/page.tsx` | 5f74a7af (Create About page) | ai_in_progress (not yet merged) |

As of planning, **neither file exists in the repo**. The developer must:
1. Merge (or cherry-pick from) both upstream branches before implementing.
2. Inspect the `ContactInfo` component's exported props interface to match the call-site correctly.

---

## Technical Approach

### What changes

- **`src/app/about/page.tsx`** (created upstream in issue 5f74a7af): Remove the inline contact-details JSX block. Replace it with an `<ContactInfo ... />` import and usage, passing the contact data already imported via the mock-data module.

### What does NOT change

- `src/components/ContactInfo.tsx` (or equivalent path from issue 6c484e6a): must not be modified — treat it as a black-box dependency.
- Mock data module (`src/lib/data.ts` or similar from issue e879c601): must not be modified — use the contact object it already exports.
- All other route files, layout, navigation, home page.

### Assumptions

- The `ContactInfo` component will live at `src/components/ContactInfo.tsx` and export a default or named `ContactInfo` React component.
- The component accepts a single `contact` prop (or spread props) typed against the `Contact` interface from the shared mock-data module.
- If the upstream component uses a different prop shape, the developer must inspect and adapt — the interface is the source of truth.
- The About page's mock-data import already surfaces a `contact` (or equivalent) object that can be passed directly to `<ContactInfo />`.

---

## File Ownership Map

Single workstream — no parallel splits.

| File | Owner | Notes |
|---|---|---|
| `src/app/about/page.tsx` | Developer WS-1 | Primary change: swap inline contact JSX for `<ContactInfo />` |
| `src/app/about/page.test.tsx` *(if tests exist)* | Developer WS-1 | Update/create tests for the refactored page |

> **Note (consolidated approach):** The upstream branches for the About page (`5f74a7af`) and ContactInfo component (`6c484e6a`) were not merged before this branch was created. Consequently, `src/components/ContactInfo.tsx`, `src/lib/mockData.ts`, and `src/lib/types.ts` were created directly in this branch. The sibling branches have not yet merged, so this branch contains all necessary files to complete the refactor end-to-end.

---

## Dependency Order

```
[merge: Create About page #5f74a7af]
         ↓
[merge: Create ContactInfo component #6c484e6a]
         ↓
[THIS ISSUE: refactor about/page.tsx]
```

Both upstream branches must be merged to `main` (or their content integrated into the working branch) before implementation begins.

---

## Implementation Steps

1. **Verify upstream merges**: Confirm `src/app/about/page.tsx` and `src/components/ContactInfo.tsx` (or wherever the component lands) exist on the current branch.
2. **Read `ContactInfo` component**: Inspect its exported props interface — specifically what prop key and type it expects for the contact data.
3. **Read `app/about/page.tsx`**: Identify the inline contact-details JSX block (email, phone, address, social links rendering).
4. **Add import**: Add `import { ContactInfo } from "@/components/ContactInfo"` (or `import ContactInfo from ...`) at the top of `src/app/about/page.tsx`.
5. **Replace inline JSX**: Delete the inline contact-details rendering block. Replace with `<ContactInfo contact={contact} />` (or the correct prop shape per step 2).
6. **Verify no orphaned variables**: Ensure any contact-related variables that were only used by the deleted block are either removed or still needed elsewhere.
7. **Run type-check**: `npx tsc --noEmit` — must exit 0.
8. **Run build**: `timeout 600 npm run build` — must exit 0.

---

## Acceptance Criteria

- `src/app/about/page.tsx` no longer contains inline contact-detail JSX — that rendering is delegated to `<ContactInfo />`.
- Import of `ContactInfo` is present and correctly paths to the component file.
- `npx tsc --noEmit` exits 0 (no TypeScript errors).
- `timeout 600 npm run build` exits 0 (Next.js production build succeeds).
- No other files are modified.

---

## Verification

GLORI-BUILDER.md already has a `## Verification` section. **Note:** the existing section references `npm run test` which has no corresponding script in `package.json`. The developer should skip that step (or replace it with `npx tsc --noEmit`) and use:

1. `npm run type-check` (exits 0)
2. `timeout 600 npm run build` (exits 0)

The `npx biome check .` step in GLORI-BUILDER.md requires `@biomejs/biome` — confirm it is installed before running, otherwise skip it and rely on `npm run lint` (`eslint`).

---

## Designer Required

`designer_required: false` — this is a pure refactor with no visual change. The `ContactInfo` component was already designed upstream; this issue only changes who renders it.
