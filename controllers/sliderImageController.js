// controllers/sliderImageController.js
import SliderImage from "../models/SliderImage.js";

// @desc Fetch all slider images
export const getSliderImages = async (req, res) => {
  try {
    const images = await SliderImage.find({ active: true }).sort("order");
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error fetching images", error: err });
  }
};

// @desc Create a new slider image
export const createSliderImage = async (req, res) => {
  try {
    const newImage = new SliderImage(req.body);
    const saved = await newImage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err });
  }
};

// @desc Update a slider image
export const updateSliderImage = async (req, res) => {
  try {
    const updated = await SliderImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err });
  }
};

// @desc Delete a slider image
export const deleteSliderImage = async (req, res) => {
  try {
    await SliderImage.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err });
  }
};
