import { Request, Response } from "express";
import Order from "../models/order.model";
import mongoose from "mongoose";

export default class OrderController {
  // get all Orders
  public static getOrders = async (req: Request, res: Response) => {
    try {
      const orders = await Order.getOrders();

      res.status(200).json({ orders });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Orders
  public static getOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid color Id" });
      }

      const order = await Order.getOrder(id);

      if (!order) {
        return res.status(400).json({ error: "Cannot find orders" });
      }

      res.status(200).json({ order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get Orders by userId
  public static getOrdersByUserId = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
      const orders = await Order.getOrdersByUserId(token);

      res.status(200).json({ orders });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // create new Order
  public static createOrder = async (req: Request, res: Response) => {
    const { token, orderItems, isPaid, phone, address } = req.body;

    try {
      if (!token) {
        return res.status(401).json({ error: "Token is required" });
      }

      if (!orderItems) {
        return res.status(401).json({ error: "Order items are required" });
      }

      //   if (!isPaid) {
      //     return res.status(401).json({ error: "IsPaid is required" });
      //   }

      if (!phone) {
        return res.status(401).json({ error: "Phone is required" });
      }

      if (!address) {
        return res.status(401).json({ error: "Address is required" });
      }

      const order = await Order.createOrder(
        token,
        orderItems,
        isPaid,
        phone,
        address,
      );
      res.status(200).json({ order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // delete a Order
  public static deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid order Id" });
      }

      const order = await Order.deleteOrder(id);

      if (!order) {
        return res.status(400).json({ error: "Cannot find order" });
      }

      res.status(200).json({ order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // update a Order
  public static updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { token, orderItems, isPaid, phone, address } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid order Id" });
    }

    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    if (!orderItems) {
      return res.status(401).json({ error: "Order items are required" });
    }

    // if (!isPaid) {
    //   return res.status(401).json({ error: "IsPaid is required" });
    // }

    if (!phone) {
      return res.status(401).json({ error: "Phone is required" });
    }

    if (!address) {
      return res.status(401).json({ error: "Address is required" });
    }

    const order = await Order.updateOrder(
      token,
      id,
      orderItems,
      isPaid,
      phone,
      address,
    );

    if (!order) {
      return res.status(400).json({ error: "Cannot find order" });
    }

    res.status(200).json(order);
  };
}
