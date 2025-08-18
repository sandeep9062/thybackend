import mongoose from "mongoose";

const BlogPostSchema = new mongoose.Schema({
  title: String,
  excerpt: String,
  content: String,
  author: String,
  publishDate: String,
  category: String,
  imageUrl: String,
  tags: [String],
});

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
