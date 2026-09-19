import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Comment } from "./comment.model.js";
import { requireAuth } from "../../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);
router.get("/tasks/:taskId/comments", asyncHandler(async (req, res) => {
  const items = await Comment.find({ task: req.params.taskId }).populate("author", "name avatarUrl").sort({ createdAt: -1 });
  res.status(200).json({ success: true, data: items });
}));
router.post("/tasks/:taskId/comments", asyncHandler(async (req, res) => {
  const c = await Comment.create({ task: req.params.taskId, author: req.user._id, content: req.body.content });
  const populated = await c.populate("author", "name avatarUrl");
  res.status(201).json({ success: true, data: populated });
}));
router.delete("/comments/:commentId", asyncHandler(async (req, res) => {
  await Comment.deleteOne({ _id: req.params.commentId, author: req.user._id });
  res.status(200).json({ success: true, message: "Deleted" });
}));
export default router;
