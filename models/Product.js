// models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    description: { type: String },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    fastDelivery: { type: Boolean, default: false },
    popular: { type: Boolean, default: false },
    image: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
