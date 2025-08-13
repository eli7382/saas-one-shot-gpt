import type { Role } from "@prisma/client";

/** Simple workspace-level RBAC ladder */
const RANK: Record<Role, number> = { Viewer: 0, Member: 1, Manager: 2, Admin: 3, Owner: 4 } as any;
export function can(role: Role, action: "read"|"write"|"admin") {
  const need = action === "read" ? 0 : action === "write" ? 1 : 3;
  return (RANK as any)[role] >= need;
}
export function requireRole(role: Role, min: Role) {
  return (RANK as any)[role] >= (RANK as any)[min];
} 