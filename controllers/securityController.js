
import User from "../models/User.js";
import About from "../models/About.js";
import BackgroundImage from "../models/BackgroundImage.js";
import Banner from "../models/Banner.js";
import BlogPost from "../models/BlogPost.js";
import BloodTest from "../models/BloodTest.js";
import BusinessContact from "../models/BusinessContact.js";
import Consultation from "../models/Consultation.js";
import Contact from "../models/Contact.js";
import DiagnosticCentre from "../models/DiagnosticCentre.js";
import FAQ from "../models/FAQ.js";
import GlobalSettings from "../models/GlobalSettings.js";
import MenuItem from "../models/MenuItem.js";
import Offer from "../models/Offer.js";
import Product from "../models/Product.js";
import Service from "../models/Service.js";
import SliderImage from "../models/SliderImage.js";
import Testimonial from "../models/Testimonial.js";
import ThyrocareProfile from "../models/ThyrocareProfile.js";
import ThyroidPackage from "../models/ThyroidPackage.js";
import SiteSettings from "../models/SiteSettings.js";



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
