import express from "express";
import { getUserDetail, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.put("/update/:id", verifyToken, updateUser);
router.get("/:id", verifyToken, getUserDetail);

export default router;
