import express from "express";
import multer from "multer";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import crypto from "crypto";

import ProductController from "../controllers/product.controller";
// import { AWS_S3_CONFIG } from "../constants/configs";

// const randomImageName = (bytes = 32) =>
//   crypto.randomBytes(bytes).toString("hex");

// const s3 = new S3Client({
//   credentials: {
//     accessKeyId: AWS_S3_CONFIG.ACCESS_KEY!,
//     secretAccessKey: AWS_S3_CONFIG.SECRET_ACCESS_KEY!,
//   },
//   region: AWS_S3_CONFIG.BUCKET_REGION!,
// });

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET best seller Product
router.get("/best-sellers", ProductController.getProductBestSeller);

// GET featured keyboards Product
router.get(
  "/featured-keyboards",
  ProductController.getProductFeaturedKeyboards,
);

// GET featured keycaps Product
router.get("/featured-keycaps", ProductController.getProductFeaturedKeycaps);

// GET featured switches Product
router.get("/featured-switches", ProductController.getProductFeaturedSwitches);

router.get("/keyboards", ProductController.getProductKeyboards);

// GET featured keycaps Product
router.get("/keycaps", ProductController.getProductKeycaps);

// GET featured switches Product
router.get("/switches", ProductController.getProductSwitches);

router.get("/brand", ProductController.getProductByBrand);

// GET all Products or a single Product by pathname
router.get("/", (req, res) => {
  const { pathname } = req.query;

  if (pathname) {
    ProductController.getProductByPathname(req, res);
  } else {
    ProductController.getProducts(req, res);
  }
});

// GET a single Product
router.get("/:id", ProductController.getProduct);

// POST a new Product
router.post("/", upload.array("images"), ProductController.createProduct);

// DELETE a Product
router.delete("/:id", ProductController.deleteProduct);

// UPDATE a Product
router.patch("/:id", upload.array("images"), ProductController.updateProduct);

export default router;
