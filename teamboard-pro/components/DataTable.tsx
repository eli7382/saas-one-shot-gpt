import { ReactNode } from "react";

type Column<T> = { key: keyof T; header: ReactNode; render?: (row: T) => ReactNode };
export default function DataTable<T extends Record<string, any>>({ columns, rows }: { columns: Column<T>[]; rows: T[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="text-left">
          <tr>{columns.map((c,i) => <th key={i} className="px-3 py-2 border-b">{c.header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row,ri) => (
            <tr key={ri} className="odd:bg-muted/20">
              {columns.map((c,ci) => <td key={ci} className="px-3 py-2 border-b">{c.render ? c.render(row) : String(row[c.key] ?? "")}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
