import Cart from "../models/Cart.js";

function requireUserId(req) {
  const uid = req.headers["x-user-id"];
  if (!uid) throw new Error("x-user-id header required");
  return uid;
}

// POST /api/cart/add
export async function addToCart(req, res) {
  try {
    const userId = requireUserId(req);
    const { itemId, name, price, quantity = 1 } = req.body;

    if (!itemId || !name || typeof price !== "number")
      return res.status(400).json({ message: "itemId, name, price required" });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, items: [] });

    const existing = cart.items.find((i) => i.itemId === itemId);
    if (existing) existing.quantity += quantity;
    else cart.items.push({ itemId, name, price, quantity });

    cart.recalcTotal();
    await cart.save();
    res.json(cart);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

// GET /api/cart
export async function getCart(req, res) {
  try {
    const userId = requireUserId(req);
    const cart = await Cart.findOne({ userId });
    res.json(cart || { userId, items: [], totalAmount: 0 });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

// DELETE /api/cart/item/:itemId
export async function removeItem(req, res) {
  try {
    const userId = requireUserId(req);
    const { itemId } = req.params;
    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.itemId !== itemId);
    cart.recalcTotal();
    await cart.save();
    res.json(cart);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}

// DELETE /api/cart/clear
export async function clearCart(req, res) {
  try {
    const userId = requireUserId(req);
    await Cart.deleteOne({ userId });
    res.json({ message: "Cart cleared" });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
}
