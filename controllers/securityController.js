import User from "../models/User.js";
import About from "../models/About.js";
import BackgroundImage from "../models/BackgroundImage.js";
import banner from "../models/banner.js";
import blogpost from "../models/blogpost.js";
import bloodtest from "../models/bloodtest.js";
import businesscontact from "../models/businesscontact.js";
import consultation from "../models/consultation.js";
import contact from "../models/contact.js";
import diagnosticcenter from "../models/DiagnosticCentre.js"
import faq from "../models/faq.js";
import globalsettings from "../models/globalsettings.js";
import menuitems from "../models/MenuItem.js";
import offer from "../models/offer.js";
import product from "../models/product.js";
import service from "../models/Service.js";
import sliderimage from "../models/sliderimage.js";
import testimonal from "../models/testimonial.js";
import thyrocareprofile from "../models/thyrocareprofile.js";
import thyroidpackage from "../models/thyroidpackage.js";
import { SiteSettings } from "../models/SiteSettings.js";







export const getSliderImages = async (req, res) => {
  try {
    const images = await sliderimage.find({ active: true }).sort("order");
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Error fetching images", error: err });
  }
};

// @desc Create a new slider image
export const createSliderImage = async (req, res) => {
  try {
    const newImage = new sliderimage(req.body);
    const saved = await newImage.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err });
  }
};

// @desc Update a slider image
export const updateSliderImage = async (req, res) => {
  try {
    const updated = await sliderimage.findByIdAndUpdate(req.params.id, req.body, {
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
    await sliderimage.findByIdAndDelete(req.params.id);
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err });
  }
};


export  const create = async (req, res) => {
  try {
    await Promise.all([
      User.deleteMany({}),
      About.deleteMany({}),
      BackgroundImage.deleteMany({}),
      banner.deleteMany({}),
      blogpost.deleteMany({}),
      bloodtest.deleteMany({}),
      businesscontact.deleteMany({}),
      consultation.deleteMany({}),
      contact.deleteMany({}),
      diagnosticcenter.deleteMany({}),
      faq.deleteMany({}),
      globalsettings.deleteMany({}),
      menuitems.deleteMany({}),
      offer.deleteMany({}),
      product.deleteMany({}),
      service.deleteMany({}),
      SiteSettings.deleteMany({}),
      sliderimage.deleteMany({}),
      testimonal.deleteMany({}),
      thyrocareprofile.deleteMany({}),
      thyroidpackage.deleteMany({})
    ]);

    res.status(200).json({ message: "All collections cleared." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

