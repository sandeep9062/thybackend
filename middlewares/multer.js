import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const allowedFormats = ["jpg", "jpeg", "png", "pdf"];
    const fileExtension = file.originalname.split(".").pop().toLowerCase();

    if (!allowedFormats.includes(fileExtension)) {
      throw new Error("Unsupported file type.");
    }

    return {
      folder: "consultation_files",
      resource_type: fileExtension === "pdf" ? "raw" : "image",
      format: fileExtension,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`,
    };
  },
});

// Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only images and PDFs are allowed."));
    }
  },
});

export default upload;
