import MenuItem from "../models/MenuItem.js";

// Get all menu items
export const getMenuItems = async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ order: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
};

// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const { title, path, order } = req.body;
    const item = new MenuItem({ title, path, order });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create menu item' });
  }
};

// Update an existing menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update menu item' });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await MenuItem.findByIdAndDelete(id);
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete menu item' });
  }
};

// Reorder menu items (bulk update)
export const reorderMenuItems = async (req, res) => {
  try {
    const updatedItems = req.body; // [{ _id, order }, ...]
    const updatePromises = updatedItems.map(item =>
      MenuItem.findByIdAndUpdate(item._id, { order: item.order })
    );
    await Promise.all(updatePromises);
    res.json({ message: 'Menu items reordered' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to reorder menu items' });
  }
};
