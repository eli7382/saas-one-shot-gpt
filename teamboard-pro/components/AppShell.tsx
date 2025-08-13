import { ReactNode } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import CommandPalette from "@/components/CommandPalette";
import CookieConsent from "@/components/CookieConsent";

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b p-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">TeamBoard Pro</Link>
        <div className="flex items-center gap-3">
          <CommandPalette />
          <ThemeSwitcher />
        </div>
      </header>
      <main className="p-4">{children}</main>
      <CookieConsent />
    </div>
  );
}
