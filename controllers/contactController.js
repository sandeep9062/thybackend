// controllers/contactController.js
import Contact from "../models/Contact.js";

export const submitContactForm = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ error: "Required fields missing" });
    }

    const newEntry = new Contact({
      fullName,
      phoneNumber,
      email,
      subject,
      message,
    });

    await newEntry.save();

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    res.status(500).json({ error: "Server error" });
  }
};
