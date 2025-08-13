import "@/styles/globals.css";
import { ReactNode } from "react";
import Link from "next/link";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <header className="border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold">TeamBoard Pro</Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/pricing">Pricing</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t py-8 text-sm text-center text-muted-foreground">© {new Date().getFullYear()} TeamBoard Pro</footer>
      </body>
    </html>
  );
} 