import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from `.env.local`
dotenv.config({ path: ".env.local" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MONGODB Connected Successfully");
  } catch (error) {
    console.error("❌ MONGODB Failed to Connect:", error.message);
    process.exit(1);
  }
};

export default connectDB;
