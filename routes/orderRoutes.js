import { Router } from "express";
import upload from "../middlewares/multer.js";
import { bookNow } from "../controllers/orderController.js";

const router = Router();

// Use your Cloudinary middleware here
router.post("/book", upload.single("prescription"), bookNow);

export default router;
