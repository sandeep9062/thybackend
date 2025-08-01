// controllers/diagnosticCentreController.js
import DiagnosticCentre from "../models/DiagnosticCentre.js";

// @desc Get all diagnostic centres
export const getAllCentres = async (req, res) => {
  try {
    const centres = await DiagnosticCentre.find();
    res.json(centres);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Get featured centres
export const getFeaturedCentres = async (req, res) => {
  try {
    const centres = await DiagnosticCentre.find({ featured: true });
    res.json(centres);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Create a new centre
export const createCentre = async (req, res) => {
  try {
    const newCentre = new DiagnosticCentre(req.body);
    const saved = await newCentre.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

// @desc Get single centre by ID
export const getCentreById = async (req, res) => {
  try {
    const centre = await DiagnosticCentre.findById(req.params.id);
    if (!centre) return res.status(404).json({ message: "Centre not found" });
    res.json(centre);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Update a centre
export const updateCentre = async (req, res) => {
  try {
    const updatedCentre = await DiagnosticCentre.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedCentre);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error });
  }
};

// @desc Delete a centre
export const deleteCentre = async (req, res) => {
  try {
    const deleted = await DiagnosticCentre.findByIdAndDelete(req.params.id);
    res.json({ message: "Centre deleted", deleted });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};
