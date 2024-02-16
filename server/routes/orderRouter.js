import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";
import {
  createOrder,
  getAllOrders,
  getOrderDetail,
  getUserOrders,
} from "../controllers/orderController.js";
const router = express.Router();

router.get("/all", verifyAdmin, getAllOrders);
router.post("/create", verifyToken, createOrder);
router.get("/my-orders/:id", verifyToken, getUserOrders);
router.get("/:id", verifyToken, getOrderDetail);

export default router;
