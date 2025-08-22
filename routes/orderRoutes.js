import { Router } from "express";
import upload from "../middlewares/multer.js";
import {
  bookNow,
  getAllOrders,
  getOrderById,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

// Use your Cloudinary middleware here
router.post("/book", protect, upload.single("prescription"), bookNow);
router.get("/", protect,getAllOrders);
router.get("/my", protect, getMyOrders);
router.get("/:id", protect,getOrderById);


export default router;
