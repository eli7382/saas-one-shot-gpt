import next from "next";
import http from "http";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { initIO } from "./lib/realtime";
import { buildCSP } from "./lib/csp";
import path from "path";
import { env } from "./lib/env";
import pino from "pino";
import crypto from "crypto";

const dev = env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const logger = pino({ transport: dev ? { target: "pino-pretty" } : undefined });

app.prepare().then(async () => {
  const server = express();

  server.use(helmet({ contentSecurityPolicy: false })); // CSP via custom header below
  server.use(cors({ origin: true, credentials: true }));
  // Serve uploaded files
  server.use("/uploads", express.static(path.resolve(env.STORAGE_DIR)));

  server.use((req, res, nextFn) => {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const csp = buildCSP(nonce, env.CSP_REPORT_ONLY);
    res.setHeader(csp.header, csp.value);
    (res as any).locals = { nonce };
    nextFn();
  });

  server.all("*", (req, res) => handle(req, res));

  const httpServer = http.createServer(server);
  initIO(httpServer);
  const port = 3000;
  httpServer.listen(port, () => logger.info(`Server ready on http://localhost:${port}`));
}).catch((e) => {
  console.error(e);
  process.exit(1);
}); 