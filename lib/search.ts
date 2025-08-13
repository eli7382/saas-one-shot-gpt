import { prisma } from "./db";
export async function searchAll(userId: string, q: string) {
  const tasks = await prisma.task.findMany({});
  const comments = await prisma.comment.findMany({});
  return { tasks, comments };
}
