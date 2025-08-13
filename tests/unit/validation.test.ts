import { describe, it, expect } from "vitest";
import { projectCreateSchema } from "@/lib/schemas";
describe("validation", () => {
  it("projectCreate", () => {
    const ok = projectCreateSchema.safeParse({ orgId: crypto.randomUUID(), name: "X", key: "TB" });
    expect(ok.success).toBe(true);
  });
});
