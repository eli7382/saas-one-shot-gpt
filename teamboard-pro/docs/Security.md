# Security

## Threat Model
- Multi-tenant SaaS with org/workspace scoping
- Primary risks: IDOR, XSS (rich text/comments), CSRF, SSRF (file uploads), auth/session misuse, rate-limit abuse

## Mitigations
- **AuthZ**: Membership & role checked at service boundaries (RBAC utility)
- **Input Validation**: Zod schemas for all API inputs; output encoding on render
- **Sessions**: NextAuth with secure, httpOnly cookies; idle timeouts; 2FA optional
- **CSP**: Nonce-based script policy; `frame-ancestors 'none'`; `object-src 'none'`
- **CSRF**: Write endpoints expect same-origin credentials; credentials mode restricted; token recommended for form POSTs
- **Rate Limits**: Redis window
- **Uploads**: Size/type validated; randomized filenames; path traversal prevented; served from static `/uploads`
- **Audit**: AuditLog entries for critical actions (invites, billing, role changes)
- **TLS**: HTTPS assumed in production; HSTS recommended at proxy
- **Dependencies**: Pinned versions; CI checks; minimal scopes for OAuth

## Secrets
- `.env` variables; never commit real secrets
- Rotate `NEXTAUTH_SECRET` regularly 