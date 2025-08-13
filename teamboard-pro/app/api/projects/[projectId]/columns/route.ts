import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/response";
import { columnCreateSchema } from "@/lib/schemas";

export async function GET(_: NextRequest, { params }: { params: { projectId: string } }) {
  const cols = await prisma.boardColumn.findMany({ where: { projectId: params.projectId }, orderBy: { order: "asc" }});
  return NextResponse.json(ok(cols));
}
export async function POST(req: NextRequest, { params }: { params: { projectId: string } }) {
  const body = await req.json();
  const parsed = columnCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(fail(parsed.error.message), { status: 400 });
  const count = await prisma.boardColumn.count({ where: { projectId: params.projectId }});
  const col = await prisma.boardColumn.create({ data: { projectId: params.projectId, name: parsed.data.name, order: parsed.data.order ?? count } });
  return NextResponse.json(ok(col));
} 