import { Request, Response } from "express";
import Color from "../models/color.model";
import mongoose from "mongoose";

export default class ColorController {
  // get all Colors
  public static getColors = async (req: Request, res: Response) => {
    try {
      const colors = await Color.getColors();

      res.status(200).json({ colors });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // get a single Colors
  public static getColor = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid color Id" });
      }

      const color = await Color.getColor(id);

      if (!color) {
        return res.status(400).json({ error: "Cannot find color" });
      }

      res.status(200).json({ color });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // create new Color
  public static createColor = async (req: Request, res: Response) => {
    const { name, value } = req.body;

    try {
      if (!name) {
        return res.status(401).json({ error: "Name is required" });
      }

      if (!value) {
        return res.status(401).json({ error: "Value is required" });
      }

      const color = await Color.createColor(name, value);
      res.status(200).json({ color });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // delete a Color
  public static deleteColor = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid color Id" });
      }

      const color = await Color.deleteColor(id);

      if (!color) {
        return res.status(400).json({ error: "Cannot find color" });
      }

      res.status(200).json({ color });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // update a Color
  public static updateColor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, value } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid color Id" });
    }

    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!value) {
      return res.status(400).json({ error: "Value is required" });
    }

    const color = await Color.updateColor(
      id,
      name,
      value,
    );

    if (!color) {
      return res.status(400).json({ error: "Cannot find color" });
    }

    res.status(200).json(color);
  };
}
