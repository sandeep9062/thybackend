import express from "express";
import {
  createBloodTest,
  getAllBloodTests,
  getBloodTestById,
  updateBloodTest,
  deleteBloodTest
} from "../controllers/bloodTestController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",protect, createBloodTest);
router.get("/", getAllBloodTests);
router.get("/:id", getBloodTestById);
router.put("/:id",protect, updateBloodTest);
router.delete("/:id",protect,checkAdmin,deleteBloodTest);

export default router;
