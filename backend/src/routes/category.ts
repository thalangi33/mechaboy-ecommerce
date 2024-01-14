import express from "express";
import CategoryController from "../controllers/category.controller";

const router = express.Router();

// GET all Categories
router.get("/", CategoryController.getCategories);

// GET a single Category
router.get("/:id", CategoryController.getCategory);

// POST a new Categorys
router.post("/", CategoryController.createCategory);

// DELETE a Category
router.delete("/:id", CategoryController.deleteCategory);

// UPDATE a Category
router.patch("/:id", CategoryController.updateCategory);

export default router;