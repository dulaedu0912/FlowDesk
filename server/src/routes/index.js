import express from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import userRoutes from "../modules/user/user.routes.js";
import workspaceRoutes from "../modules/workspace/workspace.routes.js";
import projectRoutes from "../modules/project/project.routes.js";
import taskRoutes from "../modules/task/task.routes.js";
import commentRoutes from "../modules/comment/comment.routes.js";
import activityRoutes from "../modules/activity/activity.routes.js";
import notificationRoutes from "../modules/notification/notification.routes.js";
import { Project } from "../modules/project/project.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/", projectRoutes);
router.use("/notifications", notificationRoutes);
router.use("/", activityRoutes);
router.use("/", commentRoutes);

// project-scoped tasks: /projects/:projectId/tasks
router.use(
  "/projects/:projectId/tasks",
  asyncHandler(async (req, res, next) => {
    const project = await Project.findById(req.params.projectId);
    if (!project) throw ApiError.notFound("Project not found");
    req.project = project;
    next();
  }),
  taskRoutes
);

// single-task routes: /tasks/:taskId
router.use("/tasks", taskRoutes);

export default router;
