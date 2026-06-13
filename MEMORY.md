# Reviewer Memory: repo (Next.js 16 / TypeScript / App Router)

## Recurring Issues (watch for these)
- Types co-located with mock fixture data — caught in b235dad2; RESOLVED (types in `src/lib/types.ts`)
- Component types imported from mock-data files — RESOLVED; `ContactInfo.tsx` now imports from `@/lib/types`
- Unvalidated `href` from `url: string` — RESOLVED; `^https?:\/\/` guard in ContactInfo; `mailto:` / `tel:` validated with regex
- Unstable `key` props using display labels — RESOLVED; `key={link.url}` for social links
- Missing per-page `metadata` exports — RESOLVED; About page exports `metadata`
- Import statement after a top-level `export const` declaration — caught b235dad2 round 2; RESOLVED in round 3; imports now precede all declarations in `about/page.tsx`
- Redundant `export type { … }` re-exports from mockData.ts — RESOLVED in round 3; mockData.ts no longer re-exports types

## Anti-patterns in this codebase
- Placing domain interfaces inside mock-data modules — domain types belong in `src/lib/types.ts`
- ADR scope creep: b235dad2 ADR restricts changes to one file but PR shipped three new files; acceptable with consolidated-approach note — reviewers should verify ADR updated each time
- Import ordering: imports must precede all top-level declarations; ESLint/Next.js won't error but it is a spec violation
- `export type { … }` re-exporting types from mockData.ts creates unnecessary indirection — consumers import from `@/lib/types` directly
- Loose email/phone regex in ContactInfo (allows HTML chars `< > "` in local-part of email) — low risk while data is static + React JSX escapes attributes; becomes High if wired to user input or `dangerouslySetInnerHTML` is ever introduced

## Areas of risk
- `src/components/ContactInfo.tsx` — email regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` allows HTML-special chars (`<`, `>`, `"`) in the local part; safe now (React attribute escaping + no dangerouslySetInnerHTML), becomes High severity if moved to user-input context
- `src/app/about/page.tsx` — metadata brand name ("Quetrex Foundation") must remain consistent with `mockCompany.name` when real data is wired
- `src/lib/mockData.ts` — stable; all three fixtures use "Quetrex Foundation" brand consistently
