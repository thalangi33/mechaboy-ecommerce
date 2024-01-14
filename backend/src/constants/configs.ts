import dotenv from "dotenv";
dotenv.config();

const SERVER_CONFIG = {
  NODE_ENV: process.env.NODE_ENV,
};

const DB_CONFIG = {
  MONGO_URI: process.env.MONGO_URI,
};

const JWT_CONFIG = {
  SECRET: process.env.SECRET,
};

const AWS_S3_CONFIG = {
  BUCKET_NAME: process.env.BUCKET_NAME,
  BUCKET_REGION: process.env.BUCKET_REGION,
  ACCESS_KEY: process.env.ACCESS_KEY,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
};

const STRIPE_CONFIG = {
  API_KEY: process.env.STRIPE_API_KEY,
  WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
};

const FRONTEND_STORE_CONFIG = {
  URL:
    process.env.NODE_ENV == "production"
      ? process.env.FRONTEND_STORE_URL_PRODUCTION
      : process.env.FRONTEND_STORE_URL_DEVELOPMENT,
};

const NODEMAILER_CONFIG = {
  USER: process.env.GMAIL_USERNAME,
  PASS: process.env.GMAIL_PASSWORD,
};

export {
  SERVER_CONFIG,
  DB_CONFIG,
  JWT_CONFIG,
  AWS_S3_CONFIG,
  STRIPE_CONFIG,
  FRONTEND_STORE_CONFIG,
  NODEMAILER_CONFIG,
};
