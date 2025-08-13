import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { inviteSchema } from "@/lib/schemas";
import { ok, fail } from "@/lib/response";
import { sendMail } from "@/lib/email";

export async function POST(req: NextRequest, { params }: { params: { orgId: string } }) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return NextResponse.json(fail("Unauthorized"), { status: 401 });
  const body = await req.json();
  const parsed = inviteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json(fail(parsed.error.message), { status: 400 });
  const inviter = await prisma.user.findUnique({ where: { email: session.user.email! } });
  const org = await prisma.organization.findUnique({ where: { id: params.orgId } });
  if (!org) return NextResponse.json(fail("Org not found"), { status: 404 });

  const token = crypto.randomUUID();
  await prisma.verificationToken.create({ data: { identifier: `invite:${params.orgId}:${parsed.data.role}`, token, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) } });
  await sendMail({ to: parsed.data.email, subject: `Invite to ${org.name}`, html: `Join: ${process.env.NEXTAUTH_URL}/join?token=${token}` });

  await prisma.auditLog.create({ data: { orgId: org.id, actorId: inviter!.id, action: "invite.create", entityType: "org", entityId: org.id, meta: { email: parsed.data.email, role: parsed.data.role } } });
  return NextResponse.json(ok({ invited: true }));
} 