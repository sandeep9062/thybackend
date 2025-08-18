import express from "express";
import { getSettings, updateSettings } from "../controllers/globalSettingsController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getSettings);
router.put("/",protect,checkAdmin,updateSettings);

export default router;
