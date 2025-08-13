import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/response";

export async function GET() {
  const list = await prisma.notification.findMany({ orderBy: { id: "desc" }, take: 50 });
  return NextResponse.json(ok(list));
}
export async function PUT(req: NextRequest) {
  const body = await req.json() as { ids: string[] };
  if (!Array.isArray(body.ids) || body.ids.length === 0) return NextResponse.json(fail("Invalid ids"), { status: 400 });
  await prisma.notification.updateMany({ where: { id: { in: body.ids } }, data: { readAt: new Date() } });
  return NextResponse.json(ok({}));
} 