import express from "express";
import authRouter from "./authRouter.js";
import orderRouter from "./orderRouter.js";
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import categoryRouter from "./categoryRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/user", userRouter);

export default router;
