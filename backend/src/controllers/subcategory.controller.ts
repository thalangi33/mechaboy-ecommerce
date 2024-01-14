import { Request, Response } from "express";
import Subcategory from "../models/subcategory.model";
import mongoose from "mongoose";

export default class SubcategoryController {
  // get all Subcategories
  public static getSubcategories = async (req: Request, res: Response) => {
    try {
      const subcategories = await Subcategory.getSubcategories();

      res.status(200).json({ subcategories });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Subcategories
  public static getSubcategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid subcategory Id" });
      }

      const subcategory = await Subcategory.getSubcategory(id);

      if (!subcategory) {
        return res.status(400).json({ error: "Cannot find subcategory" });
      }

      res.status(200).json({ subcategory });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // create new Subcategory
  public static createSubcategory = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    try {
      if (!name) {
        return res.status(401).json({ error: "Name is required" });
      }

      if (!description) {
        return res.status(401).json({ error: "Description is required" });
      }

      const subcategory = await Subcategory.createSubcategory(
        name,
        description,
      );
      res.status(200).json({ subcategory });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // delete a Subcategory
  public static deleteSubcategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid subcategory Id" });
      }

      const subcategory = await Subcategory.deleteSubcategory(id);

      if (!subcategory) {
        return res.status(400).json({ error: "Cannot find subcategory" });
      }

      res.status(200).json({ subcategory });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // update a Subcategory
  public static updateSubcategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, products } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid subcategory Id" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }

    if (!products) {
      return res.status(400).json({ error: "Products is required" });
    }

    const subcategory = await Subcategory.updateSubcategory(
      id,
      name,
      description,
      products,
    );

    if (!subcategory) {
      return res.status(400).json({ error: "Cannot find subcategory" });
    }

    res.status(200).json(subcategory);
  };
}
