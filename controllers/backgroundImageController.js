// controllers/backgroundImageController.js
import BackgroundImage from '../models/BackgroundImage.js';



// Create new image using URL from body (no file upload)
export const addBackgroundImage = async (req, res) => {
  try {
    const { url, alt, order } = req.body;

    if (!url || !alt || order === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newImage = await BackgroundImage.create({ url, alt, order });
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all images
export const getBackgroundImages = async (req, res) => {
  try {
    const images = await BackgroundImage.find().sort({ order: 1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update image
export const updateBackgroundImage = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (req.file) {
      updates.url = req.file.path;
    }

    const updatedImage = await BackgroundImage.findByIdAndUpdate(id, updates, {
      new: true,
    });

    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete image
export const deleteBackgroundImage = async (req, res) => {
  try {
    const { id } = req.params;
    await BackgroundImage.findByIdAndDelete(id);
    res.json({ message: 'Image deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Reorder images (bulk update)
export const reorderBackgroundImages = async (req, res) => {
  try {
    const images = req.body; // array of { id, order }

    const updatePromises = images.map((img) =>
      BackgroundImage.findByIdAndUpdate(img.id, { order: img.order })
    );

    await Promise.all(updatePromises);

    const updatedImages = await BackgroundImage.find().sort({ order: 1 });
    res.json(updatedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
