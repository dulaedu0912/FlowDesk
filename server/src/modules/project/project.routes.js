import express from "express";
import { ProjectController } from "./project.controller.js";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createProjectSchema } from "./project.validation.js";

const router = express.Router();
router.use(requireAuth);
router.post("/workspaces/:workspaceId/projects", validate(createProjectSchema), ProjectController.create);
router.get("/workspaces/:workspaceId/projects", ProjectController.list);
router.get("/projects/:projectId", ProjectController.get);
router.get("/projects/:projectId/board", ProjectController.board);
export default router;
