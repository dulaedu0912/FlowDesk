import express from "express";
import { TaskController } from "./task.controller.js";
import { requireAuth } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { createTaskSchema, updateTaskSchema, taskQuerySchema } from "./task.validation.js";

const router = express.Router({ mergeParams: true });
router.use(requireAuth);
router.post("/", validate(createTaskSchema), TaskController.createTask);
router.get("/", validate(taskQuerySchema), TaskController.getTasks);
router.get("/:taskId", TaskController.getTask);
router.patch("/:taskId", validate(updateTaskSchema), TaskController.updateTask);
router.delete("/:taskId", TaskController.deleteTask);
export default router;
