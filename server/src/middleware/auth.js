import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { env } from "../config/env.js";
import { User } from "../modules/user/user.model.js";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) throw ApiError.unauthorized("Access token required");
  const payload = jwt.verify(token, env.JWT_ACCESS_SECRET);
  const user = await User.findById(payload.sub);
  if (!user || !user.isActive) throw ApiError.unauthorized("User not found or inactive");
  req.user = user;
  next();
});
