import { createWriteStream, mkdirSync, existsSync } from "fs";
import { randomUUID } from "crypto";
import { env } from "./env";
import { join } from "path";

export async function saveFile(file: { buffer: Buffer; mime: string; filename?: string }) {
  if (!existsSync(env.STORAGE_DIR)) mkdirSync(env.STORAGE_DIR, { recursive: true });
  const id = randomUUID();
  const safeName = `${id}-${(file.filename ?? "upload").replace(/[^\w.-]+/g, "_")}`;
  const path = join(env.STORAGE_DIR, safeName);
  await new Promise<void>((res, rej) => {
    const w = createWriteStream(path);
    w.on("error", rej); w.on("finish", () => res());
    w.end(file.buffer);
  });
  return { id, url: `/uploads/${safeName}`, size: file.buffer.length, mime: file.mime };
} 