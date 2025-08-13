import { Server } from "socket.io";
import { createClient } from "redis";
import { env } from "./env";

let io: Server | undefined;

export function getIO() {
  if (!io) throw new Error("Socket.IO not initialized");
  return io;
}

export function initIO(httpServer: any) {
  if (io) return io;
  const pub = createClient({ url: env.REDIS_URL });
  const sub = pub.duplicate();
  pub.connect().catch(()=>{});
  sub.connect().catch(()=>{});
  io = new Server(httpServer, { path: "/socket", cors: { origin: "*" } });
  // Simple org-scoped namespace
  io.of(/^\/ws\/[0-9a-fA-F-]+$/).on("connection", (socket) => {
    socket.on("join:project", (projectId: string) => socket.join(`project:${projectId}`));
  });
  return io;
} 