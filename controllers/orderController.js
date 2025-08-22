import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import { sendOrderEmail } from "../utils/sendOrderEmail.js";

function requireUserId(req) {
  const uid = req.headers["x-user-id"];
  if (!uid) throw new Error("x-user-id header required");
  return uid;
}

// POST /api/orders/book  (multipart/form-data; field: prescription)
export async function bookNow(req, res) {
  try {
    const userId = requireUserId(req);

    // fetch cart
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const {
      pincode,
      fullName,
      noOfPersons,
      age,
      gender,
      mobile,
      email,
      address,
      appointmentDate,
      appointmentTime,
      wantsHardCopy,
    } = req.body;

    // multer-storage-cloudinary provides either `path` or `secure_url`
    const prescriptionFileUrl = req.file?.path || req.file?.secure_url || null;

    // create order
    const order = await Order.create({
      userId,
      items: cart.items,
      totalAmount: cart.totalAmount,
      pincode,
      fullName,
      noOfPersons: noOfPersons ? Number(noOfPersons) : undefined,
      age: age ? Number(age) : undefined,
      gender,
      mobile,
      email,
      address,
      appointmentDate,
      appointmentTime,
      wantsHardCopy:
        wantsHardCopy === "true" || wantsHardCopy === true ? true : false,
      prescriptionFileUrl, // store Cloudinary URL instead of file path
    });

    // try sending email (don't fail order if email fails)
    try {
      await sendOrderEmail({ order, ownerEmail: process.env.OWNER_EMAIL });
    } catch (mailErr) {
      console.error("Email failed:", mailErr.message);
    }

    // clear cart after booking
    await Cart.deleteOne({ userId });

    res.status(201).json({ message: "Booking successful", order });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
