import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ok, fail } from "@/lib/response";
import { projectCreateSchema } from "@/lib/schemas";

export async function GET() {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return NextResponse.json(fail("Unauthorized"), { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const orgIds = (await prisma.membership.findMany({ where: { userId: user!.id } })).map((m) => m.orgId);
  const projects = await prisma.project.findMany({ where: { orgId: { in: orgIds } }, take: 50, orderBy: { createdAt: "desc" } });
  return NextResponse.json(ok(projects));
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return NextResponse.json(fail("Unauthorized"), { status: 401 });
  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const body = await req.json();
  const parsed = projectCreateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(fail(parsed.error.message), { status: 400 });

  const project = await prisma.project.create({
    data: { orgId: parsed.data.orgId, name: parsed.data.name, key: parsed.data.key, createdBy: user!.id,
      columns: { createMany: { data: [
        { name: "Backlog", order: 0 },
        { name: "In Progress", order: 1 },
        { name: "Review", order: 2 },
        { name: "Done", order: 3 }
      ]}}
    }
  });
  return NextResponse.json(ok(project));
} 