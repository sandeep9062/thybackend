import express from "express";
import {
  getBusinessContact,
  updateBusinessContact,
} from "../controllers/businessContactController.js";

const router = express.Router();

router.get("/", getBusinessContact);
router.put("/", updateBusinessContact);

export default router;
