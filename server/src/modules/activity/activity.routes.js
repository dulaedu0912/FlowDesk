import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Activity } from "./activity.model.js";
import { requireAuth } from "../../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);
router.get("/workspaces/:workspaceId/activity", asyncHandler(async (req, res) => {
  const items = await Activity.find({ workspace: req.params.workspaceId }).populate("actor", "name avatarUrl").sort({ createdAt: -1 }).limit(50);
  res.status(200).json({ success: true, data: items });
}));
router.post("/activity", asyncHandler(async (req, res) => {
  const a = await Activity.create({ ...req.body, actor: req.user._id });
  res.status(201).json({ success: true, data: a });
}));
export default router;
