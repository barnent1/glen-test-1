## 2026-06-13 — ShadCN UI not installed; use Tailwind card styling

**Decision**: ShadCN UI will not be used in the home page (or any component) despite the PRD mentioning it. `components.json` was never initialized and no `@radix-ui/*` packages are present.

**Reason**: Setting up ShadCN (`npx shadcn-ui init`) changes the project config (adds components.json, radix dependencies, updates tailwind config) and is outside any single feature issue's scope. The PRD says "ShadCN UI Card or **similar**".

**Impact**: All features requiring "Card" or similar components should implement them with Tailwind utility classes (`rounded-2xl border bg-white/90 shadow-sm p-6`). If a future issue explicitly initializes ShadCN, existing inline cards can be refactored then.

## 2026-06-14 — Verification chain corrected (no test runner)
**Decision**: GLORI-BUILDER.md verification chain is lint → type-check → build. The `npm run test` step was removed because no test runner (Jest, Vitest, etc.) is configured in this project.
**Reason**: `package.json` has no `test` script. Running `npm run test` exits non-zero and fails QA.
**Impact**: Any future issue that adds a test runner must also add `npm run test` back to the verification chain.
