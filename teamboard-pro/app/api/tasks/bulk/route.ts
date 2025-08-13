import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { bulkMoveSchema } from "@/lib/schemas";
import { ok, fail } from "@/lib/response";
import { getIO } from "@/lib/realtime";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = bulkMoveSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(fail(parsed.error.message), { status: 400 });
  await prisma.$transaction(parsed.data.moves.map(m => prisma.task.update({ where: { id: m.taskId }, data: { columnId: m.columnId, order: m.order } })));
  const projectId = (await prisma.task.findUnique({ where: { id: parsed.data.moves[0].taskId } }))!.projectId;
  getIO().of(`/ws/${projectId}`).to(`project:${projectId}`).emit("project.updated", { type: "reorder" });
  return NextResponse.json(ok({ moved: parsed.data.moves.length }));
} 