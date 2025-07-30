import BloodTest from "../models/BloodTest.js";

export const createBloodTest = async (req, res) => {
  try {
    const bloodTest = new BloodTest(req.body);
    await bloodTest.save();
    res.status(201).json(bloodTest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllBloodTests = async (req, res) => {
  try {
    const tests = await BloodTest.find();
    res.status(200).json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBloodTestById = async (req, res) => {
  try {
    const test = await BloodTest.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBloodTest = async (req, res) => {
  try {
    const test = await BloodTest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteBloodTest = async (req, res) => {
  try {
    const test = await BloodTest.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
