import { Task } from "./task.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { getPagination, buildMeta } from "../../utils/pagination.js";

export const TaskService = {
  async createTask({ projectId, workspaceId, userId, dto }) {
    return Task.create({
      title: dto.title,
      description: dto.description || "",
      status: dto.status || "todo",
      priority: dto.priority || "medium",
      dueDate: dto.dueDate,
      labels: dto.labels || [],
      assignee: dto.assigneeId || null,
      project: projectId,
      workspace: workspaceId,
      createdBy: userId
    });
  },
  async getTasks({ projectId, query }) {
    const { page, limit, skip } = getPagination(query);
    const filter = { project: projectId };
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    if (query.assignee) filter.assignee = query.assignee;
    if (query.search) filter.title = { $regex: query.search, $options: "i" };
    const [items, total] = await Promise.all([
      Task.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate("assignee", "name email avatarUrl")
        .populate("createdBy", "name email avatarUrl"),
      Task.countDocuments(filter)
    ]);
    return { items, meta: buildMeta(total, page, limit) };
  },
  async getTaskById(taskId) {
    const task = await Task.findById(taskId)
      .populate("assignee", "name email avatarUrl")
      .populate("createdBy", "name email avatarUrl")
      .populate("project", "name key");
    if (!task) throw ApiError.notFound("Task not found");
    return task;
  },
  async updateTask(taskId, dto) {
    const task = await Task.findById(taskId);
    if (!task) throw ApiError.notFound("Task not found");
    if (dto.title !== undefined) task.title = dto.title;
    if (dto.description !== undefined) task.description = dto.description;
    if (dto.status !== undefined) task.status = dto.status;
    if (dto.priority !== undefined) task.priority = dto.priority;
    if (dto.dueDate !== undefined) task.dueDate = dto.dueDate;
    if (dto.labels !== undefined) task.labels = dto.labels;
    if (dto.assigneeId !== undefined) task.assignee = dto.assigneeId || null;
    task.completedAt = dto.status === "done" ? new Date() : task.status === "done" && dto.status === undefined ? task.completedAt : dto.status ? null : task.completedAt;
    await task.save();
    return task;
  },
  async deleteTask(taskId) {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) throw ApiError.notFound("Task not found");
    return task;
  }
};
