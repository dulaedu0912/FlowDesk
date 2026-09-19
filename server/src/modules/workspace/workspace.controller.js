import { asyncHandler } from "../../utils/asyncHandler.js";
import { WorkspaceService } from "./workspace.service.js";
import { Membership } from "./membership.model.js";

export const WorkspaceController = {
  create: asyncHandler(async (req, res) => {
    const ws = await WorkspaceService.create(req.user._id, req.validated.body);
    res.status(201).json({ success: true, data: ws });
  }),
  list: asyncHandler(async (req, res) => {
    const items = await WorkspaceService.list(req.user._id);
    res.status(200).json({ success: true, data: items });
  }),
  invite: asyncHandler(async (req, res) => {
    const m = await WorkspaceService.invite(req.params.workspaceId, req.validated.body, req.user._id);
    res.status(201).json({ success: true, data: m });
  }),
  members: asyncHandler(async (req, res) => {
    const members = await Membership.find({ workspace: req.params.workspaceId }).populate("user", "name email avatarUrl");
    res.status(200).json({ success: true, data: members });
  }),
  stats: asyncHandler(async (req, res) => {
    const stats = await WorkspaceService.stats(req.params.workspaceId);
    res.status(200).json({ success: true, data: stats });
  })
};
