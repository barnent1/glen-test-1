# Project Configuration

This is a Next.js / TypeScript project scaffolded with Next.js App Router, Tailwind CSS v4, and TypeScript strict mode.

## Verification

Stack: Node.js / TypeScript.

Run in this order — all must pass (exit 0) before any PR:

1. `npx biome check .`
2. `npm run type-check`
3. `timeout 600 npm run test`
4. `timeout 600 npm run build`
