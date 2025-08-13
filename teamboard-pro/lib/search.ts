import { prisma } from "./db";
export async function searchAll(userId: string, q: string) {
  // This is a simplified search; Postgres full text configured via @@ queries in Prisma raw
  const tasks = await prisma.task.findMany({ where: { OR: [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }] }, take: 20 });
  const comments = await prisma.comment.findMany({ where: { body: { contains: q, mode: "insensitive" } }, take: 20 });
  return { tasks, comments };
} 