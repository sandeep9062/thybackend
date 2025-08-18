import Referral from "../models/Referral.js";
import { sendReferralEmail } from "../utils/sendEmail.js"; // 👈 import new mailer

// ✅ Create a new referral
export const createReferral = async (req, res) => {
  try {
    const { referrerEmail, referrerPhone, friendEmail, friendPhone } = req.body;

    if (!referrerEmail || !referrerPhone || !friendEmail || !friendPhone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generate referral code
    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const referral = await Referral.create({
      referrerEmail,
      referrerPhone,
      friendEmail,
      friendPhone,
      referralCode,
    });

    // 📩 Send referral email to friend
    await sendReferralEmail({ referrerEmail, friendEmail, referralCode });

    res.status(201).json({ message: "Referral created and email sent", referral });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


// ✅ Get all referrals (admin)
export const getAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find().sort({ createdAt: -1 });
    res.status(200).json(referrals);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single referral by code
export const getReferralByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const referral = await Referral.findOne({ referralCode: code });

    if (!referral) return res.status(404).json({ message: "Referral not found" });

    res.status(200).json(referral);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Update referral status (joined / rewarded)
export const updateReferralStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const referral = await Referral.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!referral) return res.status(404).json({ message: "Referral not found" });

    res.status(200).json({ message: "Referral updated", referral });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
