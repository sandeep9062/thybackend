import express from "express";
import {
  getSingle,
  updateSingle,
  listAll,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/contentController.js";
import Banner from "../models/Banner.js";
import About from "../models/About.js";
import Testimonial from "../models/Testimonial.js";
import FAQ from "../models/FAQ.js";
import BlogPost from "../models/BlogPost.js";
import Consultation from "../models/Consultation.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Banner
router.get("/banner", getSingle(Banner));
router.put("/banner", protect, checkAdmin, updateSingle(Banner));

// About
router.get("/about", getSingle(About));
router.put("/about", protect, checkAdmin, updateSingle(About));

// Testimonials
router.get("/testimonials", listAll(Testimonial));
router.post("/testimonials", protect, checkAdmin, createOne(Testimonial));
router.put("/testimonials/:id", protect, checkAdmin, updateOne(Testimonial));
router.delete("/testimonials/:id", protect, checkAdmin, deleteOne(Testimonial));

// FAQs
router.get("/faqs", listAll(FAQ));
router.post("/faqs", protect, checkAdmin, createOne(FAQ));
router.put("/faqs/:id", protect, checkAdmin, updateOne(FAQ));
router.delete("/faqs/:id", protect, checkAdmin, deleteOne(FAQ));

// Blog Posts
router.get("/blogs", listAll(BlogPost));
router.post("/blogs", protect, checkAdmin, createOne(BlogPost));
router.put("/blogs/:id", protect, checkAdmin, updateOne(BlogPost));
router.delete("/blogs/:id", protect, checkAdmin, deleteOne(BlogPost));

// Consultations
router.get("/consultations", protect, checkAdmin, listAll(Consultation));
router.post("/consultations", protect, createOne(Consultation));
router.delete(
  "/consultations/:id",
  protect,
  checkAdmin,
  deleteOne(Consultation)
);

export default router;
