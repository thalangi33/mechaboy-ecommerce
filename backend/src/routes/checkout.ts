import express from "express";
import CheckoutController from "../controllers/checkout.controller";

const router = express.Router();

// POST a new Checkouts
router.post("/", CheckoutController.createCheckout);

router.post("/webhook", CheckoutController.forwardWebhook);

export default router;
