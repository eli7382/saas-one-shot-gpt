# Performance

## Budgets
- LCP < 2.5s, CLS < 0.1, INP < 200ms on mid-tier device & 4G
- Lighthouse ≥95 across PWA/Perf/A11y/Best Practices/SEO

## Techniques
- SSR for initial payload; client components only where needed
- Code-splitting and lazy routes
- Cache-first SW (stale-while-revalidate)
- DB indexes for hot fields; limit list queries
- Socket events debounced; refetch batched

## Measurement
- Use Lighthouse CI locally
- Collect basic request metrics via pino logs and DB timings
