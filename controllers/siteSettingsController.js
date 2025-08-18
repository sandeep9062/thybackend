// controllers/siteSettingsController.js
import { SiteSettings } from "../models/SiteSettings.js";

// GET site settings
export const getSiteSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create({
        websiteName: "Thyrocare",
        logoUrl: "",
        bannerUrl: "",
        favicon: "",
      });
    }
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE site settings
export const updateSiteSettings = async (req, res) => {
  try {
    const updates = req.body;
    let settings = await SiteSettings.findOne();

    if (!settings) {
      settings = new SiteSettings(updates);
    } else {
      Object.assign(settings, updates);
    }

    await settings.save();
    res.status(200).json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
