import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    itemId: String,
    name: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: { type: [OrderItemSchema], required: true },
    totalAmount: { type: Number, required: true },

    // Booking form fields from screenshots
    pincode: String,
    fullName: String,
    noOfPersons: Number,
    age: Number,
    gender: String,
    mobile: String,
    email: String,
    address: String,
    appointmentDate: String, // keep as string if you accept formatted text
    appointmentTime: String,
    wantsHardCopy: { type: Boolean, default: false },

    prescriptionFilePath: String, // optional uploaded file
    status: { type: String, enum: ["Pending", "Confirmed", "Completed"], default: "Pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
