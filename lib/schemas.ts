import { z } from "zod";

export const orgCreateSchema = z.object({ name: z.string().min(2).max(80) });
export const inviteSchema = z.object({ email: z.string().email(), role: z.enum(["Owner","Admin","Manager","Member","Viewer"]) });
export const projectCreateSchema = z.object({ orgId: z.string().uuid(), name: z.string().min(1), key: z.string().min(2).max(10) });
export const columnCreateSchema = z.object({ name: z.string().min(1), order: z.number().int().optional() });
export const taskCreateSchema = z.object({
  projectId: z.string().uuid(),
  columnId: z.string().uuid(),
  title: z.string().min(1),
  description: z.string().optional(),
  assigneeIds: z.array(z.string().uuid()).optional(),
  dueAt: z.string().datetime().optional(),
  priority: z.enum(["Low","Medium","High","Urgent"]).default("Medium"),
  labels: z.array(z.string()).optional()
});
export const bulkMoveSchema = z.object({ moves: z.array(z.object({ taskId: z.string().uuid(), columnId: z.string().uuid(), order: z.number().int() })).min(1) });
