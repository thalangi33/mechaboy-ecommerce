import express from "express";
import ColorController from "../controllers/color.controller";

const router = express.Router();

// GET all Colors
router.get("/", ColorController.getColors);

// GET a single Color
router.get("/:id", ColorController.getColor);

// POST a new Colors
router.post("/", ColorController.createColor);

// DELETE a Color
router.delete("/:id", ColorController.deleteColor);

// UPDATE a Color
router.patch("/:id", ColorController.updateColor);

export default router;