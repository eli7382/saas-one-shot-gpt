"use client";
import { useEffect, useState } from "react";
export default function LanguageSwitcher() {
  const [lang, setLang] = useState<string>(typeof window !== "undefined" ? localStorage.getItem("lang") || "en" : "en");
  useEffect(() => { if (typeof window !== "undefined") { localStorage.setItem("lang", lang); document.dir = lang === "he" ? "rtl" : "ltr"; } }, [lang]);
  return (
    <select aria-label="Language" className="border rounded-md px-2 py-1 text-sm" value={lang} onChange={(e)=>setLang(e.target.value)}>
      <option value="en">English</option>
      <option value="he">עברית</option>
    </select>
  );
}
