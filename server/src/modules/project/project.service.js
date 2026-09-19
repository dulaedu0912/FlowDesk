import { Project } from "./project.model.js";
import { Task } from "../task/task.model.js";

export const ProjectService = {
  async create({ workspaceId, userId, dto }) {
    return Project.create({ ...dto, key: dto.key.toUpperCase(), workspace: workspaceId, createdBy: userId });
  },
  async list(workspaceId) {
    return Project.find({ workspace: workspaceId, isArchived: false }).sort({ createdAt: -1 });
  },
  async board(projectId) {
    const tasks = await Task.find({ project: projectId }).populate("assignee", "name avatarUrl").sort({ createdAt: -1 });
    return {
      todo: tasks.filter((t) => t.status === "todo"),
      in_progress: tasks.filter((t) => t.status === "in_progress"),
      done: tasks.filter((t) => t.status === "done")
    };
  }
};
