import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Notification } from "./notification.model.js";
import { requireAuth } from "../../middleware/auth.js";

const router = express.Router();
router.use(requireAuth);
router.get("/", asyncHandler(async (req, res) => {
  const items = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.status(200).json({ success: true, data: items });
}));
router.patch("/:id/read", asyncHandler(async (req, res) => {
  await Notification.updateOne({ _id: req.params.id, user: req.user._id }, { isRead: true });
  res.status(200).json({ success: true, message: "Marked read" });
}));
router.patch("/read-all", asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id }, { isRead: true });
  res.status(200).json({ success: true, message: "All marked read" });
}));
export default router;
