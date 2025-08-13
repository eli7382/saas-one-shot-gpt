import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/response";
import { getIO } from "@/lib/realtime";

export async function POST(req: NextRequest) {
  const body = await req.json() as { taskId: string; authorId: string; body: string; parentCommentId?: string };
  if (!body.taskId || !body.authorId || !body.body) return NextResponse.json(fail("Invalid"), { status: 400 });
  const comment = await prisma.comment.create({ data: body });
  const mentions = (body.body.match(/@\[([^\]]+)\]\(([^)]+)\)/g) || []).map(x => x);
  await prisma.notification.createMany({ data: mentions.map((m) => ({ userId: m.split("(")[1].replace(")",""), type: "mention", payload: { taskId: body.taskId, commentId: comment.id } })) });
  const task = await prisma.task.findUnique({ where: { id: body.taskId } });
  if (task) getIO().of(`/ws/${task.projectId}`).to(`project:${task.projectId}`).emit("comment.created", { taskId: task.id, comment });
  return NextResponse.json(ok(comment));
} 