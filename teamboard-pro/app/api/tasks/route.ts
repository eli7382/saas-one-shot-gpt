import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { taskCreateSchema } from "@/lib/schemas";
import { ok, fail } from "@/lib/response";
import { getIO } from "@/lib/realtime";

export async function GET(req: NextRequest) {
  const projectId = req.nextUrl.searchParams.get("projectId");
  const tasks = await prisma.task.findMany({ where: { projectId: projectId ?? undefined, deletedAt: null }, orderBy: { order: "asc" }, take: 200 });
  return NextResponse.json(ok(tasks));
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = taskCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(fail(parsed.error.message), { status: 400 });
  const order = await prisma.task.count({ where: { columnId: parsed.data.columnId } });
  const task = await prisma.task.create({ data: { ...parsed.data, order } as any });
  getIO().of(`/ws/${task.projectId}`).to(`project:${task.projectId}`).emit("task.updated", { id: task.id, type: "create", task });
  return NextResponse.json(ok(task));
}
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const { id, ...patch } = body as any;
  const task = await prisma.task.update({ where: { id }, data: patch });
  getIO().of(`/ws/${task.projectId}`).to(`project:${task.projectId}`).emit("task.updated", { id: task.id, type: "update", task });
  return NextResponse.json(ok(task));
}
export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json(fail("Missing id"), { status: 400 });
  const task = await prisma.task.update({ where: { id }, data: { deletedAt: new Date() } });
  getIO().of(`/ws/${task.projectId}`).to(`project:${task.projectId}`).emit("task.updated", { id: task.id, type: "delete" });
  return NextResponse.json(ok({ id }));
} 