import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    // await mongoose.connect(process.env.ATLAS_URL);
    console.log("MONGODB Connected Succesfully 👍");
  } catch (error) {
    console.error("MONGODB Failed to Connect");
    process.exit(1);
  }
};

export default connectDB;
