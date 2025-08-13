"use client";
import { useEffect, useState } from "react";
export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem("consent")) setShow(true); }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-3 inset-x-0 flex justify-center">
      <div className="bg-foreground text-background rounded-xl px-4 py-3 text-sm shadow">
        We use strictly necessary cookies and local analytics. <button className="underline ml-2" onClick={()=>{localStorage.setItem("consent","1"); setShow(false);}}>OK</button>
      </div>
    </div>
  );
} 