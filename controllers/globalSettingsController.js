import GlobalSettings from "../models/GlobalSettings.js";

// Get current global settings
export const getSettings = async (req, res) => {
  try {
    let settings = await GlobalSettings.findOne();
    if (!settings) {
      // Default fallback if not set
      settings = await GlobalSettings.create({
        currency: { code: "USD", symbol: "$", name: "US Dollar" },
        language: { code: "en", name: "English" }
      });
    }
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update or create global settings
export const updateSettings = async (req, res) => {
  try {
    let settings = await GlobalSettings.findOne();
    if (settings) {
      Object.assign(settings, req.body);
      await settings.save();
    } else {
      settings = await GlobalSettings.create(req.body);
    }
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
