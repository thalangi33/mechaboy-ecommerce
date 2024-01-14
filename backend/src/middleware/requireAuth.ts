import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
import jwt from "jsonwebtoken";

import { JWT_CONFIG } from "../constants/configs";
import User from "../models/user.model";

interface JwtPayload {
  _id: string;
}

interface IGetUserAuthInfoRequest extends Request {
  user: Document; // or any other type
}

export const requireAuth = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  // verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

    req.user = await User.entity.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

