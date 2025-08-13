import { createClient } from "redis";
import { env } from "./env";

const client = createClient({ url: env.REDIS_URL });
client.connect().catch(()=>{});

export async function rateLimit(key: string, limit = 60, windowSec = 60) {
  const now = Math.floor(Date.now()/1000);
  const windowKey = `rl:${key}:${Math.floor(now / windowSec)}`;
  const n = await client.incr(windowKey);
  if (n === 1) await client.expire(windowKey, windowSec);
 