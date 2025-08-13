# TeamBoard Pro

Collaborative project & task management with real-time boards, comments, calendar/reminders, search, analytics, i18n, and PWA.

## Quick Start (Docker)

```
# prerequisites: Docker + Docker Compose
docker-compose up -d db redis maildev
docker-compose up web
# in another terminal (once containers are up):
docker exec -it $(docker ps -qf name=teamboard-pro-web-1) /bin/bash -lc "pnpm prisma migrate deploy && pnpm db:seed"
open http://localhost:3000
```

## Local Dev

```
corepack enable && corepack prepare pnpm@9.7.1 --activate
pnpm install
# set env
cp .env.example .env
pnpm prisma migrate dev
pnpm db:seed
pnpm dev
```

Sign in with `alice@example.com` / `password` (seeded).

## Scripts

* `dev` — run Next custom server with Socket.IO
* `build` / `start` — production build & start
* `db:migrate` / `db:deploy` — Prisma migrations
* `db:seed` — seed demo data
* `test` — Vitest unit tests
* `e2e` — Playwright
* `a11y` — basic axe run

## Architecture

* Next.js 14 App Router + custom Express (`server.ts`)
* REST API in `/app/api/*` with Zod validation
* Socket.IO (`/socket`, namespaces `/ws/{orgId}`)
* PostgreSQL 15 via Prisma; Redis for rate limits & pub/sub
* NextAuth (Credentials+OAuth), optional TOTP 2FA
* Nodemailer (MailDev in Docker), file storage on disk (pluggable)
* PWA service worker (`public/sw.js`), manifest
* i18n (English/Hebrew), RTL support
* Tailwind + small shadcn-style UI primitives

## Testing

```
pnpm test            # unit/integration
pnpm e2e             # E2E (spawns dev server)
pnpm a11y            # accessibility checks
```

## OpenAPI

See `openapi.yaml`. All endpoints return `{ ok, data?, error? }`. Validate with `swagger-cli validate openapi.yaml`.

## Security

Refer to `docs/Security.md`. CSP with nonce, strict headers, uploads constrained, audit logs for sensitive actions.

## Accessibility

Refer to `docs/Accessibility.md`. Keyboard-first, visible focus, color-contrast targets.

## Performance

Refer to `docs/Performance.md`. Budgets and tactics documented.

## Internationalization

`locales/en/common.json`, `locales/he/common.json`. RTL toggles via theme/i18n provider; dates formatted with Intl.

## Billing

Mock provider + webhook; org-level subscription endpoint returns demo data. Swap with real provider via `lib/subscription.ts`.

## Analytics

Privacy-friendly: local `AnalyticsEvent` table. Cookie consent banner included.

## Notes

* Service worker caches key routes; background sync can be added via `workbox` if desired.
* Real-time relies on Redis; ensure `REDIS_URL` is reachable in all environments.

