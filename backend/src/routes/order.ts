import express from "express";
import OrderController from "../controllers/order.controller";

const router = express.Router();

// GET all Orders
router.get("/", OrderController.getOrders);

// GET a single Order
router.get("/:id", OrderController.getOrder);

// POST token with user token
router.post("/getOrders", OrderController.getOrdersByUserId);

// POST a new Orders
router.post("/", OrderController.createOrder);

// DELETE a Order
router.delete("/:id", OrderController.deleteOrder);

// UPDATE a Order
router.patch("/:id", OrderController.updateOrder);

export default router;
