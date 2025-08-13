import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ok, fail } from "@/lib/response";
import { orgCreateSchema } from "@/lib/schemas";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return NextResponse.json(fail("Unauthorized"), { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const orgs = await prisma.membership.findMany({ where: { userId: user!.id }, include: { org: true } });
  return NextResponse.json(ok(orgs.map((m) => m.org)));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return NextResponse.json(fail("Unauthorized"), { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const body = await req.json();
  const parsed = orgCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(fail(parsed.error.message), { status: 400 });
  const org = await prisma.organization.create({
    data: { name: parsed.data.name, ownerId: user!.id, plan: "PRO", users: { create: { userId: user!.id, role: "Owner" } } }
  });
  return NextResponse.json(ok(org));
} 