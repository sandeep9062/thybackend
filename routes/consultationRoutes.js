// routes/consultationRoutes.js
import express from "express";
import { submitConsultation } from "../controllers/consultationController.js";
import upload from "../middlewares/multer.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// `files` is the field name from the frontend
// admin email should get message about this
router.post("/consultation",protect, upload.array("files", 5), submitConsultation);

export default router;
