// routes/contactRoutes.js
import express from "express";
import { submitContactForm } from "../controllers/contactController.js";


const router = express.Router();
// contact form at main page
router.post("/contact",submitContactForm);

export default router;
