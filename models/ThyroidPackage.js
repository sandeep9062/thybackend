// models/ThyroidPackage.js
import mongoose from "mongoose";

const ThyroidPackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String },
    tests: [{ type: String }],
    reportTime: { type: String },
    sampleType: { type: String },
    fasting: { type: String },
    popular: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.ThyroidPackage || mongoose.model("ThyroidPackage", ThyroidPackageSchema);
