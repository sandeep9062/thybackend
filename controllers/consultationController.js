// controllers/consultationController.js
import Consultation from "../models/Consultation.js";

export const submitConsultation = async (req, res) => {
  try {
    const { name, email, address, phone, description } = req.body;

    if (!name || !email || !address || !phone || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const fileUrls = req.files?.map((file) => file.path) || [];

    const newConsultation = new Consultation({
      name,
      email,
      address,
      phone,
      description,
      files: fileUrls,
    });

    await newConsultation.save();

    res.status(201).json({ message: "Consultation submitted successfully" });
  } catch (error) {
    console.error("Error submitting consultation:", error);
    res.status(500).json({ error: "Server error" });
  }
};
