import express from "express";
import {
  createBloodTest,
  getAllBloodTests,
  getBloodTestById,
  updateBloodTest,
  deleteBloodTest
} from "../controllers/bloodTestController.js";

const router = express.Router();

router.post("/", createBloodTest);
router.get("/", getAllBloodTests);
router.get("/:id", getBloodTestById);
router.put("/:id", updateBloodTest);
router.delete("/:id", deleteBloodTest);

export default router;
