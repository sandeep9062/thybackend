import mongoose from "mongoose";

const BusinessContactSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    businessHours: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.BusinessContact ||
  mongoose.model("BusinessContact", BusinessContactSchema);
