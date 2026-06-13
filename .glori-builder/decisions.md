# Architectural Decisions Log

## 2026-06-13 — Verification chain corrected for Next.js stack
**Decision**: Replaced incorrect `## Verification` section in GLORI-BUILDER.md (which referenced `biome` and `npm run test`, neither installed) with correct stack commands: `npm run lint`, `npm run type-check`, `timeout 600 npm run build`.  
**Reason**: The project has no biome config, no test runner. The old section would cause cloud QA to fail immediately on non-existent commands.  
**Impact**: All future QA runs will use the correct three-command chain.

## 2026-06-13 — TeamMemberCard refactor: About page ownership
**Decision**: The About page (`src/app/about/page.tsx`) is the sole owned file for issue 7ed270bd. It renders `TeamMemberCard` in a loop from a `teamMembers` array, using a responsive grid and Framer Motion stagger animations. Inline mock data used if the mock data module hasn't merged.  
**Reason**: Sibling issues (5f74a7af about page base, e879c601 mock data) may or may not have merged. This issue owns the final about page state.  
**Impact**: Developer must check for mock data module and import if available; otherwise define inline.
