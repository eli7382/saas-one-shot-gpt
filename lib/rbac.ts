export type Role = "Viewer"|"Member"|"Manager"|"Admin"|"Owner";
/** Simple workspace-level RBAC ladder */
const RANK: Record<Role, number> = { Viewer: 0, Member: 1, Manager: 2, Admin: 3, Owner: 4 };
export function can(role: Role, action: "read"|"write"|"admin") {
  const need = action === "read" ? 0 : action === "write" ? 1 : 3;
  return RANK[role] >= need;
}
export function requireRole(role: Role, min: Role) {
  return RANK[role] >= RANK[min];
}
