import nodemailer from "nodemailer";
import { env } from "./env";
const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined
});
export async function sendMail(opts: { to: string; subject: string; html: string; text?: string }) {
  return transporter.sendMail({ from: "no-reply@teamboard.local", ...opts });
} 