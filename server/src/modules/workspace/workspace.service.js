import { Workspace } from "./workspace.model.js";
import { Membership } from "./membership.model.js";
import { User } from "../user/user.model.js";
import { Project } from "../project/project.model.js";
import { Task } from "../task/task.model.js";
import { ApiError } from "../../utils/ApiError.js";

const slugify = (name) => `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 40)}-${Date.now().toString(36)}`;

export const WorkspaceService = {
  async create(userId, { name }) {
    const workspace = await Workspace.create({ name, slug: slugify(name), owner: userId });
    await Membership.create({ workspace: workspace._id, user: userId, role: "OWNER", joinedAt: new Date() });
    return workspace;
  },
  async list(userId) {
    const memberships = await Membership.find({ user: userId }).populate("workspace");
    return memberships.map((m) => ({ workspace: m.workspace, role: m.role }));
  },
  async invite(workspaceId, { email, role }, invitedBy) {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) throw ApiError.notFound("User not found");
    const exists = await Membership.findOne({ workspace: workspaceId, user: user._id });
    if (exists) throw ApiError.conflict("User already a member");
    return Membership.create({ workspace: workspaceId, user: user._id, role, invitedBy });
  },
  async remove(workspaceId, userId) {
    await Membership.deleteOne({ workspace: workspaceId, user: userId });
  },
  async stats(workspaceId) {
    const projects = await Project.countDocuments({ workspace: workspaceId });
    const tasks = await Task.countDocuments({ workspace: workspaceId });
    const done = await Task.countDocuments({ workspace: workspaceId, status: "done" });
    return { projects, tasks, done };
  }
};
