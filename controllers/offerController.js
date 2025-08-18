// controllers/offerController.js
import Offer from "../models/Offer.js";

// GET all offers
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch offers", error: err });
  }
};

// GET one offer
export const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });
    res.json(offer);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving offer", error: err });
  }
};

// POST create new offer
export const createOffer = async (req, res) => {
  try {
    const newOffer = new Offer(req.body);
    const saved = await newOffer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid offer data", error: err });
  }
};

// PUT update offer
export const updateOffer = async (req, res) => {
  try {
    const updated = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Offer not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating offer", error: err });
  }
};

// DELETE offer
export const deleteOffer = async (req, res) => {
  try {
    const deleted = await Offer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Offer not found" });
    res.json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting offer", error: err });
  }
};
