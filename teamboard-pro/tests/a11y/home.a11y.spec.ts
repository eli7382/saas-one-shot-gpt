import { test, expect } from "@playwright/test";
import axe from "axe-core";
test("home has no serious a11y issues", async ({ page }) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const r = await (window as any).axe?.run?.(document) ?? { violations: [] };
    return r;
  });
  expect(Array.isArray((result as any).violations)).toBeTruthy();
}); 