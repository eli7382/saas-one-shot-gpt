import { Worker, Queue } from "bullmq";
import { env } from "@/lib/env";
import { createClient } from "redis";
import { sendMail } from "@/lib/email";

const connection = new (createClient as any)({ url: env.REDIS_URL });

new Worker("emailQueue", async (job) => {
  await sendMail(job.data);
}, { connection });

export const reminderQueue = new Queue("reminderQueue", { connection }); 