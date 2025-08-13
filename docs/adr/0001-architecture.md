# ADR 0001 — Next.js App Router with Custom Node Server + Socket.IO

## Context
We require:
- Hybrid SSR/SSG/ISR and app routes
- Real-time collaboration via Socket.IO with Redis pub/sub
- Strict security headers and service worker/PWA
- A single deployable unit (Docker) with background jobs

## Decision
Use **Next.js 14 App Router** for UI and API routes. Wrap with a **custom Express server** (`server.ts`) to attach Socket.IO, centralize Helmet/CSP, and serve uploaded files. Redis powers pub/sub and rate limiting. Prisma handles Postgres. Nodemailer via SMTP dev server. PWA via manual `sw.js` and `manifest.json`.

## Alternatives
- Next's built-in WebSocket (unstable) → rejected for maturity
- tRPC → REST chosen for OpenAPI compliance
- 3rd-party billing → mock provider abstraction to avoid external dependencies

## Consequences
- Slightly more complex server startup
- Full control over websockets and headers
- Portable Docker deployment
