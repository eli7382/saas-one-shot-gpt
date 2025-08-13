import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ok } from "@/lib/response";

export async function GET(req: NextRequest) {
  const range = req.nextUrl.searchParams.get("range") ?? "7d";
  const days = range === "30d" ? 30 : range === "90d" ? 90 : 7;
  const since = new Date(Date.now() - days * 24 * 3600 * 1000);
  const [users, created, completed] = await Promise.all([
    prisma.user.count({ where: { createdAt: { gte: since } } }),
    prisma.task.count({ where: { createdAt: { gte: since } } }),
    prisma.task.count({ where: { status: "done", updatedAt: { gte: since } } as any })
  ]);
  const cycleTimeDays = 3.4; // demo metric
  const wip = await prisma.task.count({ where: { status: { in: ["open","in_progress","review"] } as any } });
  const retention = 0.62;
  return NextResponse.json(ok({ activeUsers: users, tasksCreated: created, tasksCompleted: completed, cycleTimeDays, wip, retention }));
} 