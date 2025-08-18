import express from "express";
import {
  getBusinessContact,
  updateBusinessContact,
} from "../controllers/businessContactController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getBusinessContact);
router.put("/",protect,checkAdmin, updateBusinessContact);

export default router;
