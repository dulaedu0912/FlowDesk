import { asyncHandler } from "../../utils/asyncHandler.js";
import { AuthService } from "./auth.service.js";
import { UserService } from "../user/user.service.js";
import { accessCookieOptions, refreshCookieOptions, verifyRefreshToken, signAccessToken, signRefreshToken } from "../../utils/tokens.js";

const toPublic = (u) => UserService.toPublic(u);

export const AuthController = {
  register: asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await AuthService.register(req.validated.body);
    res.cookie("accessToken", accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    res.status(201).json({ success: true, data: { user: toPublic(user), accessToken } });
  }),
  login: asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken } = await AuthService.login(req.validated.body);
    res.cookie("accessToken", accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    res.status(200).json({ success: true, data: { user: toPublic(user), accessToken } });
  }),
  logout: asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ success: true, message: "Logged out" });
  }),
  refresh: asyncHandler(async (req, res) => {
    const token = req.cookies?.refreshToken;
    if (!token) return res.status(401).json({ success: false, error: { message: "Refresh token required" } });
    const payload = verifyRefreshToken(token);
    const user = await UserService.findById(payload.sub);
    if (!user || !user.isActive) return res.status(401).json({ success: false, error: { message: "Invalid session" } });
    const accessToken = signAccessToken(user._id);
    const refreshToken = signRefreshToken(user._id);
    res.cookie("accessToken", accessToken, accessCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshCookieOptions);
    res.status(200).json({ success: true, data: { accessToken } });
  }),
  me: asyncHandler(async (req, res) => {
    res.status(200).json({ success: true, data: { user: toPublic(req.user) } });
  })
};
