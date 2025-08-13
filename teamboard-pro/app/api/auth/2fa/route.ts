import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok, fail } from "@/lib/response";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { authenticator } from "otplib";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions as any);
  if (!session?.user?.email) return NextResponse.json(fail("Unauthorized"), { status: 401 });
  const body = await req.json();
  if (body.action === "enable") {
    const secret = authenticator.generateSecret();
    await prisma.user.update({ where: { email: session.user.email! }, data: { twoFactorSecret: secret } });
    const otpAuthUrl = authenticator.keyuri(session.user.email!, "TeamBoard Pro", secret);
    return NextResponse.json(ok({ secret, otpAuthUrl }));
  } else if (body.action === "verify" && body.token) {
    const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
    if (!user?.twoFactorSecret) return NextResponse.json(fail("2FA not enabled"), { status: 400 });
    const valid = authenticator.check(body.token, user.twoFactorSecret);
    return NextResponse.json(valid ? ok({ verified: true }) : fail("Invalid token"));
  }
  return NextResponse.json(fail("Invalid request"), { status: 400 });
} 