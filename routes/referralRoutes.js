import express from "express";
import {
  createReferral,
  getAllReferrals,
  getReferralByCode,
  updateReferralStatus,
} from "../controllers/referralController.js";
import {checkAdmin, protect} from "../middlewares/authMiddleware.js"
const router = express.Router();

// Create a new referral
router.post("/", createReferral);

// Get all referrals (admin)
router.get("/",protect,checkAdmin, getAllReferrals);

// Get referral by code
router.get("/:code", getReferralByCode);

// Update referral status
router.put("/:id/status", updateReferralStatus);

export default router;
