## 2026-06-13 — ShadCN UI not installed; use Tailwind card styling

**Decision**: ShadCN UI will not be used in the home page (or any component) despite the PRD mentioning it. `components.json` was never initialized and no `@radix-ui/*` packages are present.

**Reason**: Setting up ShadCN (`npx shadcn-ui init`) changes the project config (adds components.json, radix dependencies, updates tailwind config) and is outside any single feature issue's scope. The PRD says "ShadCN UI Card or **similar**".

**Impact**: All features requiring "Card" or similar components should implement them with Tailwind utility classes (`rounded-2xl border bg-white/90 shadow-sm p-6`). If a future issue explicitly initializes ShadCN, existing inline cards can be refactored then.
