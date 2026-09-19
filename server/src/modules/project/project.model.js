import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: "Workspace", required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    key: { type: String, required: true, trim: true, uppercase: true, maxlength: 10 },
    description: { type: String, default: "", maxlength: 2000 },
    color: { type: String, default: "#4F46E5" },
    icon: { type: String, default: "folder" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isArchived: { type: Boolean, default: false }
  },
  { timestamps: true }
);

projectSchema.index({ workspace: 1, key: 1 }, { unique: true });

export const Project = mongoose.model("Project", projectSchema);
