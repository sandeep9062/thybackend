import mongoose from "mongoose";

const GlobalSettingsSchema = new mongoose.Schema({
  currency: {
    code: { type: String, required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true }
  },
  language: {
    code: { type: String, required: true },
    name: { type: String, required: true }
  }
}, {
  timestamps: true
});

export default mongoose.model("GlobalSettings", GlobalSettingsSchema);
