// routes/consultationRoutes.js
import express from "express";
import { submitConsultation } from "../controllers/consultationController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// `files` is the field name from the frontend
router.post("/consultation", upload.array("files", 5), submitConsultation);

export default router;
