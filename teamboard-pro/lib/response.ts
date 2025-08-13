export type Envelope<T = unknown> = { ok: true; data: T } | { ok: false; error: string };
export const ok = <T>(data: T): Envelope<T> => ({ ok: true, data });
export const fail = (error: string): Envelope => ({ ok: false, error }); 