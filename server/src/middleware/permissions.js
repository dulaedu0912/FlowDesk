import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Membership } from "../modules/workspace/membership.model.js";

export const requireWorkspaceRole = (...allowedRoles) =>
  asyncHandler(async (req, res, next) => {
    const workspaceId = req.params.workspaceId || req.body.workspaceId || req.query.workspaceId;
    if (!workspaceId) throw ApiError.badRequest("workspaceId is required");
    const membership = await Membership.findOne({ workspace: workspaceId, user: req.user._id });
    if (!membership) throw ApiError.forbidden("You are not a member of this workspace");
    if (!allowedRoles.includes(membership.role)) {
      throw ApiError.forbidden("You do not have permission to perform this action");
    }
    req.membership = membership;
    next();
  });
