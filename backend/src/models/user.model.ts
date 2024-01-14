import { Schema, model, Types, Document } from "mongoose";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import {
  JWT_CONFIG,
  NODEMAILER_CONFIG,
  FRONTEND_STORE_CONFIG,
} from "../constants/configs";
import { mailTransporter } from "../lib/nodemailer";
import { generateDisplayName } from "../lib/unqiue-username-generator";

module User {
  export interface IUser {
    email: string;
    password: string;
    displayName: string;
    isVerified: boolean;
    favorites: Types.ObjectId[];
    isAdmin: boolean;
  }

  export interface UserModel extends IUser, Document {}

  const userSchema = new Schema({
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
    },
    favorites: {
      type: [{ type: Schema.Types.ObjectId, ref: "Product" }],
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  });

  export const entity = model<UserModel>("User", userSchema);

  export const getUserInfo = async (token: string) => {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;
      const user = await entity.findById(jwtUser._id);

      return {
        email: user?.email,
        displayName: user?.displayName,
        isVerified: user?.isVerified,
      };
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const signup = async function (email: string, password: string) {
    // validation
    console.log(email, password);
    if (!email || !password) {
      console.log("All fields must be filled");
      throw Error("All fields must be filled");
    }

    if (!validator.isEmail(email)) {
      console.log("Email is not valid");
      throw Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      console.log("Password not strong enough");
      throw Error("Password not strong enough");
    }

    // check email is not in used
    const exists = await entity.findOne({ email });

    if (exists) {
      console.log("Email is already in used");
      throw Error("Email is already in used");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await entity.create({
      email: email,
      password: hash,
      displayName: generateDisplayName(),
      isVerified: false,
      favorites: [],
      isAdmin: false,
    });

    return user;
  };

  export const login = async function (email: string, password: string) {
    // validation
    if (!email || !password) {
      throw Error("All fields must be filled");
    }

    // check user exists
    const user = await entity.findOne({ email });

    if (!user) {
      throw Error("Incorrect email or password");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("Incorrect password or password");
    }

    return user;
  };

  export const sendEmailVerification = async function (token: string) {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      const user = await entity.findById(jwtUser._id);

      const url = `http://${FRONTEND_STORE_CONFIG.URL}/user/confirmation/${token}`;

      const details = {
        from: NODEMAILER_CONFIG.USER,
        to: user?.email,
        subject: "Verify your email",
        html: `Please click this link to verify your email ${url}`,
      };

      mailTransporter.sendMail(details);
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const confirmEmailVerification = async (token: string) => {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      await entity.findByIdAndUpdate(
        { _id: jwtUser._id },
        { isVerified: true },
      );
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const changeDisplayName = async (
    token: string,
    displayName: string,
  ) => {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      await entity.findByIdAndUpdate(
        { _id: jwtUser._id },
        { displayName: displayName },
      );
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const changeEmail = async (token: string, email: string) => {
    try {
      console.log("Changing email");

      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      console.log(jwtUser._id);
      console.log(email);

      await entity.findByIdAndUpdate(
        { _id: jwtUser._id },
        { email: email, isVerified: false },
      );
    } catch (error) {
      if (error.codeName === "DuplicateKey") {
        throw Error("Email already taken");
      }
      throw Error("Incorrect token");
    }
  };

  export const changePassword = async (
    token: string,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string,
  ) => {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      console.log(jwtUser._id);

      if (!validator.isStrongPassword(newPassword)) {
        throw Error("New password is not strong enough");
      }

      if (newPassword !== confirmPassword) {
        throw Error("New password and confirm password are not matched");
      }

      const user = await entity.findById(jwtUser._id);

      const match = await bcrypt.compare(currentPassword, user?.password || "");

      if (!match) {
        throw Error("Current password is incorrect");
      }

      const same = await bcrypt.compare(newPassword, user?.password || "");

      if (same) {
        throw Error("New and current password cannot be the same");
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      await entity.findByIdAndUpdate({ _id: jwtUser._id }, { password: hash });
    } catch (error) {
      if (error.message === "invalid signature") {
        throw Error("Incorrect token");
      }
      throw Error(error.message);
    }
  };

  export const getFavorites = async (token: string) => {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      const user = await entity.findById(jwtUser._id).populate("favorites");

      return user?.favorites;
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const getFavoritesId = async (token: string) => {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      const user = await entity.findById(jwtUser._id);

      return user?.favorites;
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const addFavorite = async (token: string, productId: string) => {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      await entity.findByIdAndUpdate(
        { _id: jwtUser._id },
        { $push: { favorites: productId } },
      );
    } catch (error) {
      throw Error("Incorrect token");
    }
  };

  export const removeFavorite = async (token: string, productId: string) => {
    try {
      const jwtUser = jwt.verify(token, JWT_CONFIG.SECRET!) as JwtPayload;

      await entity.findByIdAndUpdate(
        { _id: jwtUser._id },
        { $pull: { favorites: productId } },
      );
    } catch (error) {
      throw Error("Incorrect token");
    }
  };
}

export default User;
