import { asyncHandler } from "../../utils/asyncHandler.js";
import { TaskService } from "./task.service.js";

export const TaskController = {
  createTask: asyncHandler(async (req, res) => {
    const task = await TaskService.createTask({
      projectId: req.validated.params.projectId,
      workspaceId: req.project.workspace,
      userId: req.user._id,
      dto: req.validated.body
    });
    res.status(201).json({ success: true, data: task });
  }),
  getTasks: asyncHandler(async (req, res) => {
    const result = await TaskService.getTasks({ projectId: req.params.projectId, query: req.validated.query });
    res.status(200).json({ success: true, data: result.items, meta: result.meta });
  }),
  getTask: asyncHandler(async (req, res) => {
    const task = await TaskService.getTaskById(req.params.taskId);
    res.status(200).json({ success: true, data: task });
  }),
  updateTask: asyncHandler(async (req, res) => {
    const task = await TaskService.updateTask(req.params.taskId, req.validated.body);
    res.status(200).json({ success: true, data: task });
  }),
  deleteTask: asyncHandler(async (req, res) => {
    await TaskService.deleteTask(req.params.taskId);
    res.status(200).json({ success: true, message: "Task deleted successfully" });
  })
};
