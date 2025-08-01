// routes/sliderImageRoutes.js
import express from "express";
import {
  getSliderImages,
  createSliderImage,
  updateSliderImage,
  deleteSliderImage,
} from "../controllers/sliderImageController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getSliderImages); // Public
router.post("/",protect,checkAdmin, createSliderImage); // Admin
router.put("/:id",protect,checkAdmin,  updateSliderImage); // Admin
router.delete("/:id",protect,checkAdmin,  deleteSliderImage); // Admin

export default router;
