import "dotenv/config";
function requireEnv(name: string, fallback?: string) {
  const v = process.env[name] ?? fallback;
  if (v === undefined) throw new Error(`Missing env var: ${name}`);
  return v;
}
export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  DATABASE_URL: requireEnv("DATABASE_URL"),
  NEXTAUTH_SECRET: requireEnv("NEXTAUTH_SECRET"),
  NEXTAUTH_URL: requireEnv("NEXTAUTH_URL", "http://localhost:3000"),
  SMTP_HOST: requireEnv("SMTP_HOST", "maildev"),
  SMTP_PORT: Number(requireEnv("SMTP_PORT", "1025")),
  SMTP_USER: process.env.SMTP_USER ?? "",
  SMTP_PASS: process.env.SMTP_PASS ?? "",
  REDIS_URL: requireEnv("REDIS_URL", "redis://redis:6379"),
  STORAGE_DIR: requireEnv("STORAGE_DIR", "./.uploads"),
  CSP_REPORT_ONLY: process.env.CSP_REPORT_ONLY === "1",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID ?? "",
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET ?? ""
}; 