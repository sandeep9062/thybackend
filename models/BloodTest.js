import mongoose from "mongoose";

const bloodTestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  originalPrice: { type: String },
  description: { type: String, required: true },
  sampleType: { type: String, required: true },
  fasting: { type: String, required: true },
  reportTime: { type: String, required: true },
  category: { type: String, required: true },
  popular: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("BloodTest", bloodTestSchema);
