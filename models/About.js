
import mongoose from "mongoose";

const AboutSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  features: [String],
});

export default mongoose.models.About || mongoose.model("About", AboutSchema);
