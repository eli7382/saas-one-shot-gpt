export async function getOrgSubscription(orgId: string) {
  return { orgId, plan: "PRO", status: "active", currentPeriodEnd: new Date(Date.now()+1000*3600*24*30) };
} 