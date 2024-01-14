import { Request, Response } from "express";
import Category from "../models/category.model";
import mongoose from "mongoose";

export default class CategoryController {
  // get all Categorys
  public static getCategories = async (req: Request, res: Response) => {
    try {
      const categories = await Category.getCategories();

      res.status(200).json({ categories });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Categorys
  public static getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid category Id" });
      }

      const category = await Category.getCategory(id);

      if (!category) {
        return res.status(400).json({ error: "Cannot find category" });
      }

      res.status(200).json({ category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // create new Category
  public static createCategory = async (req: Request, res: Response) => {
    const { name, pathname, description, subcategoriesIds } = req.body;

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

      if (!subcategoriesIds) {
        return res.status(400).json({ error: "Subcategories are required" });
      }

      const category = await Category.createCategory(
        name,
        pathname,
        description,
        subcategoriesIds,
      );
      res.status(200).json({ category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // delete a Category
  public static deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid category Id" });
      }

      const category = await Category.deleteCategory(id);

      if (!category) {
        return res.status(400).json({ error: "Cannot find category" });
      }

      res.status(200).json({ category });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // update a Category
  public static updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, pathname, description, subcategoriesIds, products } =
      req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid category Id" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!pathname) {
      return res.status(400).json({ error: "Pathname is required" });
    }

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!subcategoriesIds) {
      return res.status(400).json({ error: "Subcategories are required" });
    }

    if (!products) {
      return res.status(400).json({ error: "Products are required" });
    }

    const category = await Category.updateCategory(
      id,
      name,
      pathname,
      description,
      subcategoriesIds,
      products,
    );

    if (!category) {
      return res.status(400).json({ error: "Cannot find category" });
    }

    res.status(200).json(category);
  };
}
