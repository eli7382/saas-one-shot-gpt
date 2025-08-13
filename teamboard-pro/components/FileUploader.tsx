"use client";
import { useState } from "react";

export default function FileUploader({ taskId, onUploaded }: { taskId: string; onUploaded?: (attachment: any) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setBusy(true); setError(null);
    try {
      const fd = new FormData();
      fd.append("file", f);
      fd.append("taskId", taskId);
      const res = await fetch("/api/files", { method: "POST", body: fd });
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || "Upload failed");
      onUploaded?.(json.data);
    } catch (err: any) {
      setError(err?.message ?? "Upload failed");
    } finally { setBusy(false); }
  }
  return (
    <div className="flex items-center gap-2 text-sm">
      <input type="file" onChange={onChange} aria-label="Upload file" />
      {busy && <span>Uploading…</span>}
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
}
