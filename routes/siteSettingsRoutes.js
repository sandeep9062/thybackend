// routes/siteSettingsRoutes.js
import express from "express";
import {
  getSiteSettings,
  updateSiteSettings
} from "../controllers/siteSettingsController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getSiteSettings);
router.put("/",protect,checkAdmin,updateSiteSettings);

export default router;
