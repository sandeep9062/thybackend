import Service from "../models/Service.js";

// ✅ Create new service
export const createService = async (req, res) => {
  try {
    const {
      title,
      description,
      detailedDescription,
      price,
      duration,
      rating,
      patients,
      isPopular,
      category,
      image,
      imageAlt,
      additionalImages,
      features,
      requirements,
    } = req.body;

    // ✅ Cloudinary file URL (multer-storage-cloudinary gives us `req.file.path`)
    const fileUrl = req.file ? req.file.path : null;
    console.log(fileUrl)
    const newService = await Service.create({
      title,
      description,
      detailedDescription,
      price,
      duration,
      rating,
      patients,
      isPopular,
      category,
      image,
      packageFileUrl: fileUrl,
      imageAlt,
      additionalImages: Array.isArray(additionalImages) ? additionalImages : additionalImages ? [additionalImages] : [],
      features: Array.isArray(features) ? features : features ? [features] : [],
      requirements: Array.isArray(requirements) ? requirements : requirements ? [requirements] : [],
    });
    await newService.save();

    res.status(201).json({ success: true, service: newService });
  } catch (error) {
    console.error("Create Service Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    res.status(200).json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update a service
export const updateService = async (req, res) => {
  try {
    const {
      title,
      description,
      detailedDescription,
      price,
      duration,
      rating,
      patients,
      isPopular,
      category,
      image,
      imageAlt,
      additionalImages,
      features,
      requirements,
    } = req.body;

    const updates = {
      title,
      description,
      detailedDescription,
      price,
      duration,
      rating,
      patients,
      isPopular,
      category,
      image,
      imageAlt,
      additionalImages: Array.isArray(additionalImages) ? additionalImages : additionalImages ? [additionalImages] : [],
      features: Array.isArray(features) ? features : features ? [features] : [],
      requirements: Array.isArray(requirements) ? requirements : requirements ? [requirements] : [],
    };

    // ✅ Update Cloudinary file if new one uploaded
    if (req.file) {
      updates.packageFileUrl = req.file.path;
    }

    const updatedService = await Service.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updatedService) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.status(200).json({ success: true, service: updatedService });
  } catch (err) {
    console.error("Update Service Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
