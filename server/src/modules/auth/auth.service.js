import bcrypt from "bcryptjs";
import { User } from "../user/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { signAccessToken, signRefreshToken } from "../../utils/tokens.js";

export const AuthService = {
  async register({ name, email, password }) {
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) throw ApiError.conflict("Email already registered");
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email: email.toLowerCase(), passwordHash });
    return { user, accessToken: signAccessToken(user._id), refreshToken: signRefreshToken(user._id) };
  },
  async login({ email, password }) {
    const user = await User.findOne({ email: email.toLowerCase() }).select("+passwordHash");
    if (!user) throw ApiError.unauthorized("Invalid credentials");
    if (!user.isActive) throw ApiError.unauthorized("Account inactive");
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw ApiError.unauthorized("Invalid credentials");
    user.lastLoginAt = new Date();
    await user.save();
    return { user, accessToken: signAccessToken(user._id), refreshToken: signRefreshToken(user._id) };
  }
};
