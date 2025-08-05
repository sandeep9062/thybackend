



import Consultation from "../models/Consultation.js";
import { sendConsultationEmail } from "../utils/sendEmail.js";

// Submit consultation (already exists)
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

    // Send email to the owner
    await sendConsultationEmail({ name, email, phone, address, description });

    res.status(201).json({ message: "Consultation submitted and email sent" });
  } catch (error) {
    console.error("Error submitting consultation:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all consultations
export const getAllConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ submittedAt: -1 });
    res.status(200).json(consultations);
  } catch (error) {
    console.error("Error fetching consultations:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete consultation by ID
export const deleteConsultationById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Consultation.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Consultation not found" });
    }

    res.status(200).json({ message: "Consultation deleted successfully" });
  } catch (error) {
    console.error("Error deleting consultation:", error);
    res.status(500).json({ error: "Server error" });
  }
};


