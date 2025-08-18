import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    websiteName: { type: String, required: true },
    logoUrl: { type: String, default: "" },
    bannerUrl: { type: String, default: "" },
    favicon: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", siteSettingsSchema);
