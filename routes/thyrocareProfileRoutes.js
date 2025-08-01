// routes/thyrocareProfileRoutes.js
import express from "express";
import { upsertProfile, getProfile } from "../controllers/thyrocareProfileController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProfile);
router.post("/",protect,checkAdmin,  upsertProfile); // Admin can use this to update/add profile

export default router;
