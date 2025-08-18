import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Memory storage for Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware that supports both single and multiple uploads
const handleFlexibleCloudinaryUploads = async (req, res, next) => {
  const files = req.files && req.files.length
    ? req.files
    : req.file
    ? [req.file]
    : [];

  if (files.length === 0) {
    return next(); // Proceed if no image
  }

  try {
    const cloudinaryResponses = [];

    for (const file of files) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: "your-folder-name", // optional
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });

      if (!uploadResult?.secure_url || !uploadResult?.public_id) {
        throw new Error("Missing Cloudinary URL or public_id in upload response.");
      }

      cloudinaryResponses.push({
        originalName: file.originalname,
        cloudinaryUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      });
    }

    req.cloudinaryUploads = cloudinaryResponses;
    next();
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      message: "Cloudinary upload failed",
      error: error.message,
    });
  }
};

export { upload, handleFlexibleCloudinaryUploads };
