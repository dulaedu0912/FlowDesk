import mongoose from "mongoose";

export const ROLES = ["OWNER", "ADMIN", "MEMBER", "VIEWER"];

const membershipSchema = new mongoose.Schema(
  {
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, enum: ROLES, default: "MEMBER" },
    invitedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    joinedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

membershipSchema.index({ workspace: 1, user: 1 }, { unique: true });

export const Membership = mongoose.model("Membership", membershipSchema);
