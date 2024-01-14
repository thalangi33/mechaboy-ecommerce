import Stripe from "stripe";
import { STRIPE_CONFIG } from "../constants/configs";

export const stripe = new Stripe(STRIPE_CONFIG.API_KEY!, {
  apiVersion: "2023-10-16",
  typescript: true,
});

