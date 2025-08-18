
// controllers/contentController.js
import Banner from "../models/Banner.js";
import About from "../models/About.js";
import Testimonial from "../models/Testimonial.js";
import FAQ from "../models/FAQ.js";
import BlogPost from "../models/BlogPost.js";
import Consultation from "../models/Consultation.js";

export const getSingle = (Model) => async (req, res) => {
  try {
    const item = await Model.findOne();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateSingle = (Model) => async (req, res) => {
  try {
    let item = await Model.findOne();
    if (item) {
      Object.assign(item, req.body);
      await item.save();
    } else {
      item = await Model.create(req.body);
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const listAll = (Model) => async (req, res) => {
  try {
    const list = await Model.find();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createOne = (Model) => async (req, res) => {
  try {
    const item = await Model.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateOne = (Model) => async (req, res) => {
  try {
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteOne = (Model) => async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

