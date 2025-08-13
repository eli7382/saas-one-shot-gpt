import { prisma } from "./db";
export async function trackEvent(name: string, props: Record<string, unknown> = {}, opts?: { orgId?: string; userId?: string }) {
  await prisma.analyticsEvent.create({ data: { name, props, orgId: opts?.orgId, userId: opts?.userId } });
} 