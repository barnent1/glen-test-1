# Architecture Decision: Refactor About page to use TeamMemberCard component

**Issue:** 7ed270bd-cacb-4da2-afc7-894c48ae1917  
**Branch:** feature/7ed270bd-refactor-about-page-to-use-teammembercard-componen

## Context

This is a brownfield refactor. The About page (`src/app/about/page.tsx`) does not exist yet at the time of planning — it is being built by a sibling issue (`5f74a7af`) that is `[ai_in_progress]`. The `TeamMemberCard` component (`src/components/TeamMemberCard.tsx`) has just been merged into `main` (PR-ready issue `f0f5a8c7` is `[ai_pr_ready]`, now actually merged per `git pull`).

The mock data module (`e879c601`) is also `[ai_pr_ready]` — it hasn't merged yet. The About page may or may not use a shared data module when it is created. This issue must work with whatever the About page looks like when its sibling merges, or create the About page from scratch if it doesn't exist.

## Technical Approach

1. **Create `src/app/about/page.tsx`** if it does not already exist (or update it if the sibling issue has merged). This page is the sole deliverable of this workstream.
2. **Import `TeamMemberCard`** from `@/components/TeamMemberCard` (which exports `TeamMember` interface and the default component).
3. **Define mock team member data inline** in the About page as a `const teamMembers: TeamMember[]` array, referencing the `TeamMember` interface exported from `TeamMemberCard.tsx`. If the mock data module has merged (check for `src/lib/data.ts` or similar), import from there instead — do not duplicate.
4. **Render team members in a loop** using `teamMembers.map(member => <TeamMemberCard key={member.name} member={member} />)`.
5. **Responsive grid layout**: wrap team members in a `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">`.
6. **Framer Motion animations**: wrap the grid or each card with a `motion.div` using fade-in stagger pattern (`staggerChildren`). Use `"use client"` directive at the top of the file since Framer Motion requires client context.
7. **Image domain configuration**: `TeamMemberCard` uses `next/image`. Placeholder mock images must use a valid domain. Use `https://placehold.co/{W}x{H}` URLs and add `placehold.co` to `next.config.ts` `images.remotePatterns` (or use `images.domains`) if not already configured.
8. **No shared files modified** beyond `src/app/about/page.tsx` and potentially `next.config.ts` for image domains.

## File Ownership Map

| Workstream | Owned Files | Notes |
|---|---|---|
| main | `src/app/about/page.tsx` | Create or rewrite — sole deliverable |
| main | `next.config.ts` | Add image remote pattern for placeholder images if needed |

**No test files** exist in this project (no test runner configured). No test file ownership needed.

## Dependency Order

1. `TeamMemberCard` component (`f0f5a8c7`) → MERGED ✓ (already in `main`)
2. Mock data module (`e879c601`) → `[ai_pr_ready]` — may or may not be merged. Do NOT block on it; define inline mock data and optionally replace with import if module exists.
3. About page base (`5f74a7af`) → `[ai_in_progress]` — may or may not exist. This task owns the final state of `src/app/about/page.tsx`.

## Acceptance Criteria

- `src/app/about/page.tsx` renders team members using `TeamMemberCard` in a loop (no inline card JSX)
- Responsive grid layout is preserved (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` or equivalent)
- Framer Motion animations apply to the team section
- `npm run type-check` exits 0
- `timeout 600 npm run build` exits 0

## Assumptions

- Placeholder image URLs from `https://placehold.co` are acceptable for mock data since no real images are specified in the PRD.
- If the mock data module (`e879c601`) does NOT exist when the developer runs, they define `teamMembers` inline in `about/page.tsx`.
- If the mock data module DOES exist, they import from it to avoid duplication.
- Team member mock data: 3 sample members with name, title, bio, and imageUrl fields (matching the `TeamMember` interface from `TeamMemberCard.tsx`).

## Designer Required

`designer_required: false` — Layout pattern (responsive grid + Framer Motion stagger) is fully specified; no new visual design decisions required.

## Notes on Verification File

The existing `GLORI-BUILDER.md` had an incorrect `## Verification` section referencing `biome` (not installed) and `npm run test` (no test runner configured). This has been corrected to use the actual project scripts: `npm run lint`, `npm run type-check`, and `timeout 600 npm run build`.
