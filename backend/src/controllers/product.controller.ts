import { Request, Response } from "express";
import mongoose from "mongoose";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import crypto from "crypto";

import Product from "../models/product.model";
import { AWS_S3_CONFIG } from "../constants/configs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: AWS_S3_CONFIG.ACCESS_KEY!,
    secretAccessKey: AWS_S3_CONFIG.SECRET_ACCESS_KEY!,
  },
  region: AWS_S3_CONFIG.BUCKET_REGION!,
});

export default class ProductController {
  // get all Products
  public static getProducts = async (req: Request, res: Response) => {
    try {
      const products = await Product.getProducts();

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Products
  public static getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid product Id" });
      }

      const product = await Product.getProduct(id);

      if (!product) {
        return res.status(400).json({ error: "Cannot find product" });
      }

      for (let i = 0; i < product.images.length; i++) {
        const getObjectParams = {
          Bucket: AWS_S3_CONFIG.BUCKET_NAME,
          Key: product.images[i].key,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        product.images[i].key = url;
      }

      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get Best Seller Products
  public static getProductBestSeller = async (req: Request, res: Response) => {
    try {
      const products = await Product.getProductBestSeller();

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get Best Featured Keyboards Products
  public static getProductFeaturedKeyboards = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const products = await Product.getProductFeaturedKeyboards();

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get Best Featured Keycaps Products
  public static getProductFeaturedKeycaps = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const products = await Product.getProductFeaturedKeycaps();

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get Best Featured Keycaps Products
  public static getProductFeaturedSwitches = async (
    req: Request,
    res: Response,
  ) => {
    try {
      const products = await Product.getProductFeaturedSwitches();

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get Best Featured Keyboards Products
  public static getProductKeyboards = async (req: Request, res: Response) => {
    try {
      const products = await Product.getProductKeyboards();

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get Best Featured Keycaps Products
  public static getProductKeycaps = async (req: Request, res: Response) => {
    try {
      const products = await Product.getProductKeycaps();

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get Best Featured Keycaps Products
  public static getProductSwitches = async (req: Request, res: Response) => {
    try {
      const products = await Product.getProductSwitches();

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Products
  public static getProductByPathname = async (req: Request, res: Response) => {
    const pathname = req.query["pathname"] as string;

    try {
      console.log("pathname", pathname);

      if (!pathname) {
        return res.status(404).json({ error: "Invalid pathname" });
      }

      const product = await Product.getProductByPathname(pathname);

      if (!product) {
        return res.status(400).json({ error: "Cannot find product" });
      }

      for (let i = 0; i < product.images.length; i++) {
        const getObjectParams = {
          Bucket: AWS_S3_CONFIG.BUCKET_NAME,
          Key: product.images[i].key,
        };
        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        product.images[i].key = url;
      }

      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Products
  public static getProductByBrand = async (req: Request, res: Response) => {
    const pathname = req.query["pathname"] as string;

    try {
      console.log("pathname", pathname);

      if (!pathname) {
        return res.status(404).json({ error: "Invalid pathname" });
      }

      const products = await Product.getProductByBrand(pathname);

      for (const product of products) {
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

      res.status(200).json({ products });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // public static createProduct = async (req: Request) => {
  //   console.log(req.body);
  //   console.log(req.file);
  // };

  // create new Product
  public static createProduct = async (req: Request, res: Response) => {
    const {
      name,
      pathname,
      description,
      category,
      subcategory,
      brand,
      colorQuantity,
      price,
      sold,
      isFeatured,
      isArchived,
    } = JSON.parse(req.body["info"]);

    try {
      if (!name) {
        return res.status(401).json({ error: "Name is required" });
      }

      if (!pathname) {
        return res.status(401).json({ error: "Pathname is required" });
      }

      if (!description) {
        return res.status(401).json({ error: "Description is required" });
      }

      if (!category) {
        return res.status(401).json({ error: "Category is required" });
      }

      if (!subcategory) {
        return res.status(401).json({ error: "Subcategory is required" });
      }

      if (!brand) {
        return res.status(401).json({ error: "Brand is required" });
      }

      if (!colorQuantity) {
        return res
          .status(401)
          .json({ error: "Color and quantity are required" });
      }

      if (!price) {
        return res.status(401).json({ error: "Price is required" });
      }

      if (!sold && sold < 0) {
        return res.status(401).json({ error: "Sold is required" });
      }

      const images: Product.IImage[] = [];

      if (req.files) {
        const files = req?.files as Express.Multer.File[];

        for (const file of files) {
          const key = randomImageName();
          images.push({ name: file.originalname, key: key });

          const params = {
            Bucket: AWS_S3_CONFIG.BUCKET_NAME,
            Key: key,
            Body: file["buffer"],
            ContentType: file["mimetype"],
          };

          const command = new PutObjectCommand(params);
          await s3.send(command);
        }
      }

      const product = await Product.createProduct(
        name,
        pathname,
        description,
        category,
        subcategory,
        brand,
        colorQuantity,
        price,
        sold,
        images,
        isFeatured,
        isArchived,
      );
      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // delete a Product
  public static deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid product Id" });
      }

      let product = await Product.getProduct(id);

      if (!product) {
        return res.status(400).json({ error: "Cannot find product" });
      }

      const images = product.images;

      for (const image of images) {
        const params = {
          Bucket: AWS_S3_CONFIG.BUCKET_NAME,
          Key: image.key,
        };

        const command = new DeleteObjectCommand(params);
        await s3.send(command);
      }

      product = await Product.deleteProduct(id);

      res.status(200).json({ product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // update a Product
  public static updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
      name,
      pathname,
      description,
      category,
      subcategory,
      brand,
      colorQuantity,
      price,
      sold,
      isFeatured,
      isArchived,
    } = JSON.parse(req.body["info"]);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid product Id" });
    }

    if (!name) {
      return res.status(401).json({ error: "Name is required" });
    }

    if (!pathname) {
      return res.status(401).json({ error: "Pathname is required" });
    }

    if (!description) {
      return res.status(401).json({ error: "Description is required" });
    }

    if (!category) {
      return res.status(401).json({ error: "Category is required" });
    }

    if (!subcategory) {
      return res.status(401).json({ error: "Subcategory is required" });
    }

    if (!brand) {
      return res.status(401).json({ error: "Brand is required" });
    }

    if (!colorQuantity) {
      return res.status(401).json({ error: "Color and quantity are required" });
    }

    if (!price) {
      return res.status(401).json({ error: "Price is required" });
    }

    if (!sold && sold < 0) {
      return res.status(401).json({ error: "Sold is required" });
    }

    // delete previous images from s3
    let product = await Product.getProduct(id);

    if (!product) {
      return res.status(400).json({ error: "Cannot find product" });
    }

    const imagesToDelete = product.images;

    for (const image of imagesToDelete) {
      const params = {
        Bucket: AWS_S3_CONFIG.BUCKET_NAME,
        Key: image.key,
      };

      const command = new DeleteObjectCommand(params);
      await s3.send(command);
    }

    // update images for the product
    const images: Product.IImage[] = [];

    if (req.files) {
      const files = req?.files as Express.Multer.File[];

      for (const file of files) {
        const key = randomImageName();
        console.log(file.originalname);
        images.push({ name: file.originalname, key: key });

        const params = {
          Bucket: AWS_S3_CONFIG.BUCKET_NAME,
          Key: key,
          Body: file["buffer"],
          ContentType: file["mimetype"],
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);
      }
    }

    product = await Product.updateProduct(
      id,
      name,
      pathname,
      description,
      category,
      subcategory,
      brand,
      colorQuantity,
      price,
      sold,
      images,
      isFeatured,
      isArchived,
    );

    if (!product) {
      return res.status(400).json({ error: "Cannot find product" });
    }

    res.status(200).json(product);
  };
}
