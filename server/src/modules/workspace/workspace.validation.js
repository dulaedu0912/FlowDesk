import { z } from "zod";

export const createWorkspaceSchema = z.object({ body: z.object({ name: z.string().min(2).max(80) }) });
export const inviteMemberSchema = z.object({
  body: z.object({ email: z.string().email(), role: z.enum(["ADMIN", "MEMBER", "VIEWER"]).default("MEMBER") }),
  params: z.object({ workspaceId: z.string().min(1) })
});
