"use client";
import { useEffect, useState } from "react";
export default function NotificationBell() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("/api/notifications").then(r=>r.json()).then(d => {
      const list = d?.data ?? [];
      const unread = list.filter((n: any) => !n.readAt).length;
      setCount(unread);
    }).catch(()=>{});
  }, []);
  return (
    <button aria-label="Notifications" className="relative px-3 py-1 border rounded-md text-sm">
      <span role="img" aria-label="bell">🔔</span>
      {count>0 && <span className="ml-1 text-xs bg-red-500 text-white rounded-full px-1">{count}</span>}
    </button>
  );
}
