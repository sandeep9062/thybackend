// models/ThyrocareProfile.js
import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  category: String,
  description: String,
  tests: [String]
});

const LeaderSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String
});

const ContactSchema = new mongoose.Schema({
  address: String,
  phone: String,
  tollFree: String,
  email: String,
  supportEmail: String,
  workingHours: String
});

const ThyrocareProfileSchema = new mongoose.Schema(
  {
    about: {
      description: String,
      mission: String,
      vision: String
    },
    stats: {
      yearsOfExcellence: String,
      testsPerDay: String,
      citiesCovered: String,
      collectionCenters: String
    },
    certifications: [String],
    services: [ServiceSchema],
    leadership: [LeaderSchema],
    contact: ContactSchema
  },
  { timestamps: true }
);

export default mongoose.models.ThyrocareProfile ||
  mongoose.model("ThyrocareProfile", ThyrocareProfileSchema);
