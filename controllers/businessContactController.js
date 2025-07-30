import BusinessContact from "../models/BusinessContact.js";

// Get business contact info (first or latest)
export const getBusinessContact = async (req, res) => {
  try {
    const contact = await BusinessContact.findOne().sort({ createdAt: -1 });
    if (!contact) return res.status(404).json({ message: "No contact info found" });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update or create business contact info
export const updateBusinessContact = async (req, res) => {
  try {
    const { phone, email, address, businessHours } = req.body;
    let contact = await BusinessContact.findOne();

    if (contact) {
      contact.phone = phone ?? contact.phone;
      contact.email = email ?? contact.email;
      contact.address = address ?? contact.address;
      contact.businessHours = businessHours ?? contact.businessHours;
      await contact.save();
    } else {
      contact = await BusinessContact.create({ phone, email, address, businessHours });
    }

    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
