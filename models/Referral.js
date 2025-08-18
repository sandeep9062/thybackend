import mongoose from "mongoose";

const referralSchema = new mongoose.Schema(
  {
    // Referrer
    referrerEmail: { type: String, required: true, lowercase: true, trim: true },
    referrerPhone: { type: String, required: true, trim: true },

    // Friend
    friendEmail: { type: String, required: true, lowercase: true, trim: true },
    friendPhone: { type: String, required: true, trim: true },

    // Tracking
    referralCode: { type: String, unique: true, index: true },
    status: {
      type: String,
      enum: ["pending", "joined", "rewarded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Referral", referralSchema);
