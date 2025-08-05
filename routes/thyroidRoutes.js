// routes/thyroidRoutes.js
import express from "express";
import {
  createThyroidPackage,
  getAllThyroidPackages,
  getThyroidPackageById,
  updateThyroidPackage,
  deleteThyroidPackage
} from "../controllers/thyroidController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",protect,checkAdmin,createThyroidPackage);
router.get("/", getAllThyroidPackages);
router.get("/:id", getThyroidPackageById);
router.put("/:id",protect,checkAdmin,  updateThyroidPackage);
router.delete("/:id",protect,checkAdmin,  deleteThyroidPackage);

export default router;
