export function buildCSP(nonce: string, reportOnly = false) {
  const base = [
    `default-src 'self'`,
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https:`,
    `font-src 'self' data:`,
    `connect-src 'self' ws: wss:`,
    `frame-ancestors 'none'`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`
  ].join("; ");
  return { header: reportOnly ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy", value: base };
} 