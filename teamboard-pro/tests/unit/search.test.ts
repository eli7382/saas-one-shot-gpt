import { describe, it, expect } from "vitest";
import { searchAll } from "@/lib/search";
describe("search", () => {
  it("returns shape", async () => {
    const res = await searchAll("u", "");
    expect(res).toHaveProperty("tasks");
    expect(res).toHaveProperty("comments");
  });
}); 