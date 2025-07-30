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

const router = express.Router();

// Banner
router.get("/banner", getSingle(Banner));
router.put("/banner", updateSingle(Banner));

// About
router.get("/about", getSingle(About));
router.put("/about", updateSingle(About));

// Testimonials
router.get("/testimonials", listAll(Testimonial));
router.post("/testimonials", createOne(Testimonial));
router.put("/testimonials/:id", updateOne(Testimonial));
router.delete("/testimonials/:id", deleteOne(Testimonial));

// FAQs
router.get("/faqs", listAll(FAQ));
router.post("/faqs", createOne(FAQ));
router.put("/faqs/:id", updateOne(FAQ));
router.delete("/faqs/:id", deleteOne(FAQ));

// Blog Posts
router.get("/blogs", listAll(BlogPost));
router.post("/blogs", createOne(BlogPost));
router.put("/blogs/:id", updateOne(BlogPost));
router.delete("/blogs/:id", deleteOne(BlogPost));

// Consultations
router.get("/consultations", listAll(Consultation));
router.post("/consultations", createOne(Consultation));
router.delete("/consultations/:id", deleteOne(Consultation));

export default router;
