export class HttpError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message); this.status = status;
  }
}
export const assert = (cond: any, status = 400, msg = "Invalid request"): void => { if (!cond) throw new HttpError(status, msg); }; 