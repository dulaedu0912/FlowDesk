import express from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { UserService } from "./user.service.js";
import { requireAuth } from "../../middleware/auth.js";

const router = express.Router();
router.get("/me", requireAuth, asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: { user: UserService.toPublic(req.user) } });
}));
export default router;
