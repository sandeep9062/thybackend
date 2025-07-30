import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  primaryButtonText: String,
  primaryButtonLink: String,
  secondaryButtonText: String,
  secondaryButtonLink: String,
});

export default mongoose.models.Banner || mongoose.model("Banner", BannerSchema);
