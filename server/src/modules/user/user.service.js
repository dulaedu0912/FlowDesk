import { User } from "./user.model.js";

export const UserService = {
  async findById(id) {
    return User.findById(id);
  },
  async findByEmail(email, withPassword = false) {
    const q = User.findOne({ email: email.toLowerCase() });
    if (withPassword) q.select("+passwordHash");
    return q;
  },
  toPublic(user) {
    return { id: user._id, name: user.name, email: user.email, avatarUrl: user.avatarUrl };
  }
};
