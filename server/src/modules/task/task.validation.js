import { z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(120),
    description: z.string().max(3000).optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    dueDate: z.coerce.date().optional(),
    assigneeId: z.string().optional(),
    labels: z.array(z.string()).optional()
  }),
  params: z.object({ projectId: z.string().min(1) })
});

export const updateTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(120).optional(),
    description: z.string().max(3000).optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    dueDate: z.coerce.date().optional(),
    assigneeId: z.string().nullable().optional(),
    labels: z.array(z.string()).optional()
  }),
  params: z.object({ taskId: z.string().min(1) })
});

export const taskQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().optional(),
    limit: z.coerce.number().optional(),
    status: z.enum(["todo", "in_progress", "done"]).optional(),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional(),
    search: z.string().optional(),
    assignee: z.string().optional()
  })
});
