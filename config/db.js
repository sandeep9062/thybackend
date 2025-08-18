import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {});
    console.log("✅ MONGODB Connected Successfully");
  } catch (error) {
    console.error("❌ MONGODB Failed to Connect:", error.message);
    process.exit(1);
  }
};

export default connectDB;
