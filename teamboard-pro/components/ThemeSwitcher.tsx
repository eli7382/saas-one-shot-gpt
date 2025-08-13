"use client";
import { useEffect, useState } from "react";
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<string>("system");
  useEffect(() => { document.documentElement.classList.toggle("dark", theme === "dark" || (theme==="system" && window.matchMedia("(prefers-color-scheme: dark)").matches)); }, [theme]);
  return (
    <select aria-label="Theme" className="border rounded-md px-2 py-1 text-sm" value={theme} onChange={(e)=>setTheme(e.target.value)}>
      <option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option>
    </select>
  );
} 