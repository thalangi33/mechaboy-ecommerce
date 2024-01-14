import { Request, Response } from "express";
import Brand from "../models/brand.model";
import mongoose from "mongoose";

export default class BrandController {
  // get all Brands
  public static getBrands = async (req: Request, res: Response) => {
    try {
      const brands = await Brand.getBrands();

      res.status(200).json({ brands });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Brand
  public static getBrand = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid brand Id" });
      }

      const brand = await Brand.getBrand(id);

      if (!brand) {
        return res.status(400).json({ error: "Cannot find brand" });
      }

      res.status(200).json({ brand });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Brand by pathname
  public static getBrandByPathname = async (req: Request, res: Response) => {
    const pathname = req.query["pathname"] as string;

    try {
      console.log("pathname", pathname);

      if (!pathname) {
        return res.status(404).json({ error: "Invalid pathname" });
      }

      const brand = await Brand.getBrandByPathname(pathname);

      if (!brand) {
        return res.status(400).json({ error: "Cannot find brand" });
      }

      res.status(200).json({ brand });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  // create new Brand
  public static createBrand = async (req: Request, res: Response) => {
    const { name, pathname, description } = req.body;

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

      const brand = await Brand.createBrand(name, pathname, description);
      res.status(200).json({ brand });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // delete a Brand
  public static deleteBrand = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid brand Id" });
      }

      const brand = await Brand.deleteBrand(id);

      if (!brand) {
        return res.status(400).json({ error: "Cannot find brand" });
      }

      res.status(200).json({ brand });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // update a Brand
  public static updateBrand = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, pathname, description, products } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid brand Id" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!pathname) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!products) {
      return res.status(400).json({ error: "Products is required" });
    }

    const brand = await Brand.updateBrand(
      id,
      name,
      pathname,
      description,
      products,
    );

    if (!brand) {
      return res.status(400).json({ error: "Cannot find brand" });
    }

    res.status(200).json(brand);
  };
}
