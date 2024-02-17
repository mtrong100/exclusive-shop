import express from "express";
import {
  getAllUsers,
  getUserDetail,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { verifyAdmin } from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.get("/all", verifyAdmin, getAllUsers);
router.put("/update/:id", verifyToken, updateUser);
router.get("/:id", verifyToken, getUserDetail);

export default router;
