import express from "express";
import userRouter from "./user";
import categoryRouter from "./category";
import subcategoryRouter from "./subcategory";
import brandRouter from "./brand";
import colorRouter from "./color";
import productRouter from "./product";
import orderRouter from "./order";
import checkoutRouter from "./checkout";

const router = express.Router();

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/subcategory", subcategoryRouter);
router.use("/brand", brandRouter);
router.use("/color", colorRouter);
router.use("/product", productRouter);
router.use("/order", orderRouter);
router.use("/checkout", checkoutRouter);

export default router;
