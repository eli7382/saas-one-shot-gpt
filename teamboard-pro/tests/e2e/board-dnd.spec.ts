import { test, expect } from "@playwright/test";
test("board renders columns", async ({ page }) => {
  await page.goto("/projects/DEMO/board");
  await expect(page.getByRole("heading", { name: "Board" })).toBeVisible();
}); 