import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} from "../controllers/serviceController.js";
import upload from "../middlewares/multer.js"
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();


router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/",protect,checkAdmin,createService);
router.put("/:id", protect,checkAdmin,updateService);
router.delete("/:id",protect,checkAdmin, deleteService);

export default router;
