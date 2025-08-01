// routes/productRoutes.js
import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { checkAdmin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/",protect,checkAdmin,  createProduct);
router.put("/:id",protect,checkAdmin,  updateProduct);
router.delete("/:id",protect,checkAdmin,  deleteProduct);

export default router;
