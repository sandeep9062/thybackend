import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  company: String,
  content: String,
  rating: Number,
  imageUrl: String,
});

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
