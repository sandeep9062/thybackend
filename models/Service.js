import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    detailedDescription: { type: String },
    price: { type: String, required: true }, // Keep as string if using symbols like "$99"
    duration: { type: String },
    rating: { type: Number, default: 0 },
    patients: { type: Number, default: 0 },
    isPopular: { type: Boolean, default: false },
    category: { type: String, required: true },
    image: { type: String },
    packageFileUrl: { type: String }, // ✅ Cloudinary uploaded file (pdf/image)
    imageAlt: { type: String },
    additionalImages: [{ type: String }],
    features: [{ type: String }],
    requirements: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);
