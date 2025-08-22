import { Router } from "express";
import { addToCart, getCart, removeItem, clearCart } from "../controllers/cartController.js"

const router = Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.delete("/item/:itemId", removeItem);
router.delete("/clear", clearCart);

export default router;
