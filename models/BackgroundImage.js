// models/BackgroundImage.js
import mongoose from "mongoose";

const BackgroundImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
    order: { type: Number, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BackgroundImage ||
  mongoose.model("BackgroundImage", BackgroundImageSchema);
