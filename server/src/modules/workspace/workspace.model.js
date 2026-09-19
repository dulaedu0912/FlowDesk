import mongoose from "mongoose";

const workspaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    logoUrl: { type: String, default: "" },
    settings: { theme: { type: String, default: "system" }, taskDefaults: { type: Object, default: {} } }
  },
  { timestamps: true }
);

export const Workspace = mongoose.model("Workspace", workspaceSchema);
