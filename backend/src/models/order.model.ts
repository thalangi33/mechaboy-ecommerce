import { Schema, model, Document, Types } from "mongoose";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { JWT_CONFIG } from "../constants/configs";

module Order {
  export interface IOrder {
    userId: Types.ObjectId;
    orderItems: [];
    isPaid: boolean;
    phone: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface OrderModel extends IOrder, Document {}

  const orderSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    orderItems: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        color: {
          type: Schema.Types.ObjectId,
          ref: "Color",
        },
        quantity: Number,
      },
    ],
    isPaid: {
      type: Boolean,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  });

  export const entity = model<OrderModel>("Order", orderSchema);

  export const getOrders = async function () {
    return await entity
      .find({})
      .populate("orderItems.product orderItems.color")
      .sort({ name: -1 });
  };

  export const getOrder = async function (id: string) {
    return await entity
      .findById(id)
      .populate("orderItems.product orderItems.color");
  };

  export const getOrdersByUserId = async function (token: string) {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      return await entity
        .find({ userId: jwtUser._id, isPaid: true })
        .select("orderItems phone address createdAt")
        .populate("orderItems.product orderItems.color");
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const createOrder = async function (
    token: string,
    orderItems: object,
    isPaid: boolean,
    phone: string,
    address: string,
  ) {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      const order = await entity.create({
        userId: jwtUser._id,
        orderItems: orderItems,
        isPaid: isPaid,
        phone: phone,
        address: address,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return order.populate("orderItems.product orderItems.color");
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const deleteOrder = async function (id: string) {
    return await entity.findOneAndDelete({ _id: id });
  };

  export const updateOrder = async function (
    token: string,
    id: string,
    orderItems?: object,
    isPaid?: boolean,
    phone?: string,
    address?: string,
  ) {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;
      const order = await entity.findOneAndUpdate(
        { _id: id },
        {
          userId: jwtUser._id,
          orderItems: orderItems,
          isPaid: isPaid,
          phone: phone,
          address: address,
          updatedAt: new Date(),
        },
        {
          new: true,
        },
      );

      return order;
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const updateOrderInfo = async function (
    id: string,
    isPaid: boolean,
    phone: string,
    address: string,
  ) {
    const order = await entity.findOneAndUpdate(
      { _id: id },
      {
        isPaid: isPaid,
        phone: phone,
        address: address,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    return order;
  };
}

export default Order;
