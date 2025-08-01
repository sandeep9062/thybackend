// routes/offerRoutes.js
import express from "express";
import {
  getOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer,
} from "../controllers/offerController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getOffers);
router.get("/:id", getOfferById);

// Admin/API Management
router.post("/",protect,checkAdmin,  createOffer);
router.put("/:id",protect,checkAdmin,  updateOffer);
router.delete("/:id",protect,checkAdmin, deleteOffer);

export default router;
