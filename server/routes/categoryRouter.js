import express from "express";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/all", getCategories);
router.post("/create", verifyAdmin, createCategory);
router.put("/update/:id", verifyAdmin, updateCategory);
router.delete("/delete/:id", verifyAdmin, deleteCategory);

export default router;
