import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    originalPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    discount: { type: String, required: true }, // e.g. "30% OFF"
    description: { type: String, required: true },
    features: [{ type: String }], // Array of included test names
    validTill: { type: Date, required: true },
    popularity: { type: String, default: "Recommended" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);
export default Offer;
