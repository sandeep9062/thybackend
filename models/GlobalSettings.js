import mongoose from "mongoose";

const GlobalSettingsSchema = new mongoose.Schema(
  {
    currency: {
      code: { type: String, required: true },
      symbol: { type: String, required: true },
      name: { type: String, required: true },
    },
    language: {
      code: { type: String, required: true },
      name: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Prevent OverwriteModelError
export default mongoose.models.GlobalSettings ||
  mongoose.model("GlobalSettings", GlobalSettingsSchema);
