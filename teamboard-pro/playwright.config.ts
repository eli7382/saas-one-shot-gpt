import { defineConfig } from "@playwright/test";
export default defineConfig({
  webServer: { command: "pnpm dev", port: 3000, timeout: 120000, reuseExistingServer: true },
  testDir: "tests",
  reporter: [["list"], ["html", { outputFolder: "playwright-report" }]]
}); 