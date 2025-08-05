import express from "express";
import {
  submitConsultation,
  getAllConsultations,
  deleteConsultationById,
} from "../controllers/consultationController.js";
import upload from "../middlewares/multer.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Submit consultation
router.post(
  "/consultation",
  protect,
  upload.array("files", 5),
  submitConsultation
);

// Get all consultations (admin protected)
router.get("/consultation", protect, checkAdmin, getAllConsultations);

// Delete a consultation by ID
router.delete("/consultation/:id", protect, checkAdmin, deleteConsultationById);

export default router;
