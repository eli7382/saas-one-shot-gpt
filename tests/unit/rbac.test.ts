import { describe, it, expect } from "vitest";
import { can, requireRole } from "@/lib/rbac";
describe("RBAC", () => {
  it("read/write/admin", () => {
    expect(can("Viewer" as any, "read")).toBe(true);
    expect(can("Viewer" as any, "write")).toBe(false);
    expect(requireRole("Admin" as any, "Manager" as any)).toBe(true);
  });
});
