import mongoose from "mongoose";

const ConsultationSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  phone: String,
  description: String,
  files: [String],
  submittedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Consultation || mongoose.model("Consultation", ConsultationSchema);
