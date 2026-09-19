import express from "express";
import { WorkspaceController } from "./workspace.controller.js";
import { requireAuth } from "../../middleware/auth.js";
import { requireWorkspaceRole } from "../../middleware/permissions.js";
import { validate } from "../../middleware/validate.js";
import { createWorkspaceSchema, inviteMemberSchema } from "./workspace.validation.js";

const router = express.Router();
router.use(requireAuth);
router.post("/", validate(createWorkspaceSchema), WorkspaceController.create);
router.get("/", WorkspaceController.list);
router.post("/:workspaceId/members", requireWorkspaceRole("OWNER", "ADMIN"), validate(inviteMemberSchema), WorkspaceController.invite);
router.get("/:workspaceId/members", requireWorkspaceRole("OWNER", "ADMIN", "MEMBER", "VIEWER"), WorkspaceController.members);
router.get("/:workspaceId/stats", requireWorkspaceRole("OWNER", "ADMIN", "MEMBER", "VIEWER"), WorkspaceController.stats);
export default router;
