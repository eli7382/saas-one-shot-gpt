"use client";
import { useEffect, useState } from "react";
import { addDays, format, startOfWeek } from "date-fns";

type Task = { id: string; title: string; dueAt?: string };
export default function Calendar({ projectId }: { projectId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(() => { fetch(`/api/tasks?projectId=${projectId}`).then(r=>r.json()).then(d=> setTasks(d.data)); }, [projectId]);
  const start = startOfWeek(new Date(), { weekStartsOn: 0 });
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(d => (
        <div key={d.toISOString()} className="border rounded-lg p-2 min-h-32">
          <div className="text-sm font-medium">{format(d, "EEE dd")}</div>
          <ul className="mt-2 space-y-1">
            {tasks.filter(t => t.dueAt && format(new Date(t.dueAt), "yyyy-MM-dd") === format(d, "yyyy-MM-dd"))
              .map(t => <li key={t.id} className="text-xs bg-primary/10 rounded px-2 py-1">{t.title}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
} 