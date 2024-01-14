/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import Stripe from "stripe";

import Order from "../models/order.model";
import { stripe } from "../lib/stripe";
import { STRIPE_CONFIG, FRONTEND_STORE_CONFIG } from "../constants/configs";
import Product from "../models/product.model";

export default class CheckoutController {
  // create new Checkout
  public static createCheckout = async (req: Request, res: Response) => {
    const { token, orderItems } = req.body;

    try {
      if (!token) {
        return res.status(401).json({ error: "Token is required" });
      }

      if (!orderItems || orderItems.length === 0) {
        return res.status(401).json({ error: "ProductIds are required" });
      }

      // console.log(orderItems);

      const order = await Order.createOrder(
        token,
        orderItems,
        false,
        "empty",
        "empty",
      );
      const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

      order.orderItems.forEach((item: any) => {
        // console.log(item);
        line_items.push({
          quantity: item.quantity,
          price_data: {
            currency: "HKD",
            product_data: {
              name: item.product.name + " - " + item.color.name,
            },
            unit_amount: item.product.price * 100,
          },
        });
      });

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        billing_address_collection: "required",
        phone_number_collection: {
          enabled: true,
        },
        success_url: `${FRONTEND_STORE_CONFIG.URL}/cart?success=1`,
        cancel_url: `${FRONTEND_STORE_CONFIG.URL}/cart?cancelled=1`,
        metadata: {
          orderId: order._id.toString(),
        },
      });

      console.log("Order Id", order._id.toString());

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  };

  // forware webhook
  public static forwardWebhook = async (req: Request, res: Response) => {
    // const body = JSON.stringify(req.body);
    const signature = req.headers["stripe-signature"] as string;

    let event!: Stripe.Event;

    console.log("Running webhook");
    console.log(req.body);
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        STRIPE_CONFIG.WEBHOOK_SECRET!,
      );
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Webhook error: " + error.message });
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const address = session?.customer_details?.address;

    const addressComponents = [
      address?.line1,
      address?.line2,
      address?.city,
      address?.state,
      address?.postal_code,
      address?.country,
    ];

    const addressString = addressComponents.filter((c) => c != null).join(", ");

    if (event.type === "checkout.session.completed") {
      console.log("Running checkout completed");
      console.log("OrderId", session?.metadata?.orderId);
      const order: any = await Order.entity
        .findByIdAndUpdate(
          { _id: session?.metadata?.orderId || "" },
          {
            isPaid: true,
            phone: session?.customer_details?.phone || "empty",
            address: addressString,
            updatedAt: new Date(),
          },
          {
            new: true,
          },
        )
        .populate("orderItems.product orderItems.color");

      console.log("Order updated");
      console.log("Color Id", order!.orderItems[0].color._id);
      console.log("Color Id", order!.orderItems[0].product.colorQuantity);
      console.log(
        "Color index",
        order.orderItems[0].product.colorQuantity.findIndex(
          (colorQuantity: any) =>
            colorQuantity.color.toString() ===
            order!.orderItems[0].color._id.toString(),
        ),
      );

      const productIds = order!.orderItems.map((item: any) => item.product._id);

      for (let i = 0; i < productIds.length; i++) {
        const colorIndex = order.orderItems[i].product.colorQuantity.findIndex(
          (colorQuantity: any) =>
            colorQuantity.color.toString() ===
            order!.orderItems[i].color._id.toString(),
        );

        const key = `colorQuantity.${colorIndex}.quantity`;

        await Product.entity.findOneAndUpdate(
          { _id: productIds[i] },
          {
            $inc: {
              sold: order.orderItems[i].quantity,
              [key]: -order.orderItems[i].quantity,
            },
          },
          {
            new: true,
          },
        );
        console.log("Product completed");
      }
    }

    res.status(200).end();
  };
}
