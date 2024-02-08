import express from "express";
import {
  createProduct,
  deleteProduct,
  favoriteProduct,
  getAllProducts,
  getProductDetail,
  getProductsByCategory,
  updateProduct,
} from "../controllers/productController.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.post("/create", verifyAdmin, createProduct);
router.post("/favorite/:id", verifyToken, favoriteProduct);
router.put("/update/:id", verifyAdmin, updateProduct);
router.delete("/delete/:id", verifyAdmin, deleteProduct);
router.get("/:id", getProductDetail);
router.get("/category/:category", getProductsByCategory);

export default router;
