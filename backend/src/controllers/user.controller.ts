import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import User from "../models/user.model";
import { JWT_CONFIG, AWS_S3_CONFIG, FRONTEND_STORE_CONFIG } from "../constants/configs";

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_S3_CONFIG.ACCESS_KEY!,
    secretAccessKey: AWS_S3_CONFIG.SECRET_ACCESS_KEY!,
  },
  region: AWS_S3_CONFIG.BUCKET_REGION!,
});

const createToken = (_id: string) => {
  return jwt.sign({ _id: _id }, JWT_CONFIG.SECRET!, { expiresIn: "3d" });
};

export default class UserController {
  // get userInfo
  public static getUserInfo = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
      const userInfo = await User.getUserInfo(token);

      res.status(200).json({ userInfo });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // login user
  public static loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);

      // create a token
      const token = createToken(user._id);

      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // signup user
  public static signupUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.signup(email, password);

      // create a token
      const token = createToken(user._id);

      res.status(200).json({ email, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
      await User.sendEmailVerification(token);
      res.status(200).json({ success: "Verification is sent to your email" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static confirmEmail = async (req: Request, res: Response) => {
    const { token } = req.params;

    try {
      await User.confirmEmailVerification(token);
      res
        .status(200)
        .redirect(
          `http://${FRONTEND_STORE_CONFIG.URL}/account/personal-info?confirmEmail=true`,
        );
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static changeDisplayName = async (req: Request, res: Response) => {
    const { token, displayName } = req.body;
    try {
      await User.changeDisplayName(token, displayName);
      res.status(200).json({ success: "Display Name is changed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static changeEmail = async (req: Request, res: Response) => {
    const { token, email } = req.body;
    try {
      await User.changeEmail(token, email);
      res.status(200).json({ success: "Email is changed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static changePassword = async (req: Request, res: Response) => {
    const { token, currentPassword, newPassword, confirmPassword } = req.body;
    try {
      await User.changePassword(
        token,
        currentPassword,
        newPassword,
        confirmPassword,
      );
      res.status(200).json({ success: "Password is changed successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static getFavorites = async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const favorites: any = await User.getFavorites(token);

      for (const product of favorites) {
        for (let i = 0; i < product.images.length; i++) {
          const getObjectParams = {
            Bucket: AWS_S3_CONFIG.BUCKET_NAME,
            Key: product.images[i].key,
          };
          const command = new GetObjectCommand(getObjectParams);
          const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
          product.images[i].key = url;
        }
      }
      res.status(200).json({ favorites });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static getFavoritesId = async (req: Request, res: Response) => {
    const { token } = req.body;
    try {
      const favorites = await User.getFavoritesId(token);
      res.status(200).json({ favorites });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static addFavorite = async (req: Request, res: Response) => {
    const { token, productId } = req.body;
    try {
      await User.addFavorite(token, productId);
      res.status(200).json({ success: "Added to your favorites" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public static removeFavorite = async (req: Request, res: Response) => {
    const { token, productId } = req.body;
    try {
      await User.removeFavorite(token, productId);
      res.status(200).json({ success: "Removed from your favorites" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
