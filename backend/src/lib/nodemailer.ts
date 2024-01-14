import nodemailer from "nodemailer";
import { NODEMAILER_CONFIG } from "../constants/configs";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: NODEMAILER_CONFIG.USER,
    pass: NODEMAILER_CONFIG.PASS,
  },
});
