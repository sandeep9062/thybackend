// controllers/thyroidController.js
import ThyroidPackage from "../models/ThyroidPackage.js";

// Create new package
export const createThyroidPackage = async (req, res) => {
  try {
    const newPackage = new ThyroidPackage(req.body);
    await newPackage.save();
    res.status(201).json(newPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all packages
export const getAllThyroidPackages = async (req, res) => {
  try {
    const packages = await ThyroidPackage.find().sort({ createdAt: -1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single package
export const getThyroidPackageById = async (req, res) => {
  try {
    const pkg = await ThyroidPackage.findById(req.params.id);
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    res.status(200).json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update package
export const updateThyroidPackage = async (req, res) => {
  try {
    const updated = await ThyroidPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete package
export const deleteThyroidPackage = async (req, res) => {
  try {
    await ThyroidPackage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
