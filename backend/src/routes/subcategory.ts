import express from "express";
import SubcategoryController from "../controllers/subcategory.controller";

const router = express.Router();

// GET all Subcategories
router.get("/", SubcategoryController.getSubcategories);

// GET a single Subcategory
router.get("/:id", SubcategoryController.getSubcategory);

// POST a new Subcategorys
router.post("/", SubcategoryController.createSubcategory);

// DELETE a Subcategory
router.delete("/:id", SubcategoryController.deleteSubcategory);

// UPDATE a Subcategory
router.patch("/:id", SubcategoryController.updateSubcategory);

export default router;
