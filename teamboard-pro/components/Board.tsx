"use client";
import { useEffect, useState } from "react";
import { DndContext, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { io, Socket } from "socket.io-client";

type Task = { id: string; title: string; order: number; columnId: string; projectId: string };
const DEFAULT_COLS = [
  { id: "backlog", name: "Backlog" },
  { id: "in_progress", name: "In Progress" },
  { id: "review", name: "Review" },
  { id: "done", name: "Done" }
];

export default function Board({ projectId }: { projectId: string }) {
  const [columns, setColumns] = useState<{ id: string; name: string }[]>([]);
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`/api/projects/${projectId}/columns`);
        const d = await r.json();
        if (d?.ok && Array.isArray(d.data) && d.data.length) setColumns(d.data);
        else setColumns(DEFAULT_COLS);
      } catch {
        setColumns(DEFAULT_COLS);
      }
      try {
        const r2 = await fetch(`/api/tasks?projectId=${projectId}`);
        const d2 = await r2.json();
        const byCol: Record<string, Task[]> = {};
        for (const t of (d2.data ?? []) as Task[]) {
          byCol[t.columnId] ??= [];
          byCol[t.columnId].push(t);
        }
        Object.values(byCol).forEach(list => list.sort((a,b)=>a.order-b.order));
        setTasks(byCol);
      } catch {
        setTasks({});
      }
    })();
    const s: Socket = io({ path: "/socket", transports: ["websocket"], forceNew: false, autoConnect: true, auth: {} , withCredentials: true });
    const ns = io(`/ws/${projectId}`, { path: "/socket" });
    ns.emit("join:project", projectId);
    ns.on("task.updated", () => {
      fetch(`/api/tasks?projectId=${projectId}`).then(r=>r.json()).then(d => {
        const byCol: Record<string, Task[]> = {};
        for (const t of (d.data ?? []) as Task[]) { byCol[t.columnId] ??= []; byCol[t.columnId].push(t); }
        Object.values(byCol).forEach(list => list.sort((a,b)=>a.order-b.order));
        setTasks(byCol);
      }).catch(()=>{});
    });
    return () => { ns.close(); s.close(); };
  }, [projectId]);

  async function onDragEnd(ev: DragEndEvent) {
    const { active, over } = ev;
    if (!over || active.id === over.id) return;
    const colId = Object.keys(tasks).find(cid => tasks[cid]?.some(t => t.id === active.id));
    if (!colId) return;
    const list = tasks[colId]!;
    const oldIndex = list.findIndex(t => t.id === active.id);
    const newIndex = list.findIndex(t => t.id === over.id);
    const newList = arrayMove(list, oldIndex, newIndex).map((t, i) => ({ ...t, order: i }));
    setTasks({ ...tasks, [colId]: newList });
    try {
      await fetch("/api/tasks/bulk", { method: "POST", body: JSON.stringify({ moves: newList.map((t) => ({ taskId: t.id, columnId: t.columnId, order: t.order })) }), headers: { "Content-Type": "application/json" } });
    } catch {}
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {columns.map(col => (
        <div key={col.id} className="border rounded-2xl p-3 bg-card">
          <h3 className="font-semibold mb-2">{col.name}</h3>
          <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd} autoScroll>
            <SortableContext items={(tasks[col.id] ?? []).map(t => t.id)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-2">
                {(tasks[col.id] ?? []).map(t => (
                  <li key={t.id} id={t.id} className="p-3 rounded-xl border bg-background focus:outline-none" tabIndex={0} aria-label={`Task ${t.title}`}>{t.title}</li>
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      ))}
    </div>
  );
} 