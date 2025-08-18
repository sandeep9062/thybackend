import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";
import upload from "../middlewares/multer.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);

// ✅ Cloudinary file uploaded as "file"
router.post("/",  upload.single("file"), createService);
router.put("/:id", protect, checkAdmin, upload.single("file"), updateService);
router.delete("/:id", protect, checkAdmin, deleteService);

export default router;
