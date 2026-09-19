import { asyncHandler } from "../../utils/asyncHandler.js";
import { ProjectService } from "./project.service.js";
import { Project } from "./project.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const ProjectController = {
  create: asyncHandler(async (req, res) => {
    const p = await ProjectService.create({ workspaceId: req.params.workspaceId, userId: req.user._id, dto: req.validated.body });
    res.status(201).json({ success: true, data: p });
  }),
  list: asyncHandler(async (req, res) => {
    const items = await ProjectService.list(req.params.workspaceId);
    res.status(200).json({ success: true, data: items });
  }),
  get: asyncHandler(async (req, res) => {
    const p = await Project.findById(req.params.projectId);
    if (!p) throw ApiError.notFound("Project not found");
    res.status(200).json({ success: true, data: p });
  }),
  board: asyncHandler(async (req, res) => {
    const board = await ProjectService.board(req.params.projectId);
    res.status(200).json({ success: true, data: board });
  })
};
