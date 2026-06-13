# Reviewer Memory: repo (Next.js About Page / TeamMemberCard)

## Recurring Issues (watch for these)
- `text-muted-foreground` class used without CSS variable definition — present in TeamMemberCard.tsx (pre-existing) and propagated into about/page.tsx; will silently render as nothing in Tailwind v4 without a `--color-muted-foreground` token. First noted on feature/7ed270bd.

## Anti-patterns in this codebase
- Using Tailwind v4 utility classes (e.g., `text-muted-foreground`) that depend on CSS custom properties never registered in globals.css — this produces classes that compile to valid CSS that references undefined variables (transparent/invisble text).
- Using `member.name` as React `key` — non-unique if duplicate names ever appear; watch for this pattern.
- Navigation component exists but is NOT wired into RootLayout — each page is an island; watch for pages that need nav.

## Areas of risk
- `src/app/globals.css` — lacks `--color-muted-foreground` and any shadcn/ui CSS variable tokens; any component using these classes will silently produce invisible text.
- `next.config.ts` `remotePatterns` — only `placehold.co` is allowed; any real image domain must be added here.
- Mock team-member data is inline in about/page.tsx — if a real data module lands later, this must be refactored or the duplicate will diverge.
