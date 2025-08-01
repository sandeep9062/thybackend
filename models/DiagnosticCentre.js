// models/DiagnosticCentre.js
import mongoose from "mongoose";

const diagnosticCentreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews: { type: Number, required: true },
  timings: { type: String, required: true },
  services: [{ type: String, required: true }],
  featured: { type: Boolean, default: false },
  distance: { type: String, required: true }
}, {
  timestamps: true
});

const DiagnosticCentre = mongoose.model("DiagnosticCentre", diagnosticCentreSchema);

export default DiagnosticCentre;
