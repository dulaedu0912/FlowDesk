import { z } from "zod";

export const createProjectSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    key: z.string().min(2).max(10),
    description: z.string().max(2000).optional(),
    color: z.string().optional()
  }),
  params: z.object({ workspaceId: z.string().min(1) })
});
