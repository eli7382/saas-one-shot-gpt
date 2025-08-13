import { test, expect } from "@playwright/test";
test("marketing pages load", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Move work forward, together." })).toBeVisible();
  await page.goto("/pricing");
  await expect(page.getByText("Pro")).toBeVisible();
}); 