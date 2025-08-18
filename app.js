import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import connectDB from "./config/db.js";

// importing routes

import contactRoutes from "./routes/contactRoutes.js";
import backgroundImageRoutes from "./routes/backgroundImageRoutes.js";
import businessContactRoutes from "./routes/businessContactRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import consultationRoutes from "./routes/consultationRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
import globalSettingsRoutes from "./routes/globalSettingsRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import siteSettingsRoutes from "./routes/siteSettingsRoutes.js";
import bloodTestRoutes from "./routes/bloodTestRoutes.js";
import diagnosticRoutes from "./routes/diagnosticCentreRoutes.js";
import sliderImageRoutes from "./routes/sliderImageRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import thyroidRoutes from "./routes/thyroidRoutes.js";
import thyrocareProfileRoutes from "./routes/thyrocareProfileRoutes.js";
import securityRoutes from "./routes/securityRoutes.js";

import referralRoutes from "./routes/referralRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config({ path: "./env.local" });

connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use(cors());

// Morgan middleware for logging
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send(`Server is running on PORT: ${PORT}`);
});

// API routes
app.use("/api/user", userRoutes);



app.use("/api/contact", contactRoutes);
app.use("/api/consult", consultationRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/background-images", backgroundImageRoutes);
app.use("/api/business-contact", businessContactRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/settings", globalSettingsRoutes);
app.use("/api/menu", menuRoutes);

app.use("/api/site-settings", siteSettingsRoutes);
app.use("/api/blood-tests", bloodTestRoutes);
app.use("/api/centres", diagnosticRoutes);
app.use("/api/sliders", sliderImageRoutes);
app.use("/api/offers", offerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/thyroid-packages", thyroidRoutes);
app.use("/api/thyrocare-profile", thyrocareProfileRoutes);
app.use("/api/security", securityRoutes);
app.use("/api/referrals", referralRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server Running at http://localhost:${PORT}`);
});
