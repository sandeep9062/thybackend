// controllers/thyrocareProfileController.js
import ThyrocareProfile from "../models/ThyrocareProfile.js";

// Create or update profile (singleton)
export const upsertProfile = async (req, res) => {
  try {
    const profile = await ThyrocareProfile.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get profile
export const getProfile = async (req, res) => {
  try {
    const profile = await ThyrocareProfile.findOne();
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
