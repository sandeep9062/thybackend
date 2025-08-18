import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, trim: true },
    description: { type: String, trim: true },
    primaryButtonText: { type: String, trim: true },
    primaryButtonLink: { type: String, trim: true },
    secondaryButtonText: { type: String, trim: true },
    secondaryButtonLink: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
