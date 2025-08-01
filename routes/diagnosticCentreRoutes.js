// routes/diagnosticCentreRoutes.js
import express from "express";
import {
  getAllCentres,
  getFeaturedCentres,
  getCentreById,
  createCentre,
  updateCentre,
  deleteCentre
} from "../controllers/diagnosticCentreController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllCentres);
router.get("/featured", getFeaturedCentres);
router.get("/:id", getCentreById);

// Admin routes (you can protect these with auth middleware later)
router.post("/",protect,checkAdmin,  createCentre);
router.put("/:id",protect,checkAdmin, updateCentre);
router.delete("/:id",protect,checkAdmin, deleteCentre);

export default router;
