import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true }, // could be product/test id or slug
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1, min: 1 },
  },
  { _id: false }
);

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    items: { type: [CartItemSchema], default: [] },
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CartSchema.methods.recalcTotal = function () {
  this.totalAmount = this.items.reduce(
    (sum, it) => sum + it.price * it.quantity,
    0
  );
};

export default mongoose.model("Cart", CartSchema);
