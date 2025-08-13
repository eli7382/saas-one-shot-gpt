import "../(app)/globals.css";
import { ReactNode } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import CommandPalette from "@/components/CommandPalette";
import CookieConsent from "@/components/CookieConsent";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-2 rounded">Skip to content</a>
        <div className="flex">
          <aside className="w-64 hidden md:block border-r min-h-screen p-4">
            <nav className="space-y-2">
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/projects/DEMO/board">Board</Link>
              <Link href="/projects/DEMO/calendar">Calendar</Link>
              <Link href="/admin">Admin</Link>
              <Link href="/settings">Settings</Link>
            </nav>
          </aside>
          <div className="flex-1">
            <header className="border-b p-3 flex items-center justify-between">
              <div className="font-semibold">TeamBoard Pro</div>
              <div className="flex items-center gap-3">
                <CommandPalette />
                <ThemeSwitcher />
              </div>
            </header>
            <main id="main" className="p-4">{children}</main>
          </div>
        </div>
        <CookieConsent />
      </body>
    </html>
  );
} 