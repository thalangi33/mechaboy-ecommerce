import express from "express";
import BrandController from "../controllers/brand.controller";

const router = express.Router();

// GET all Products or a single Product by pathname
router.get("/", (req, res) => {
  const { pathname } = req.query;

  if (pathname) {
    BrandController.getBrandByPathname(req, res);
  } else {
    BrandController.getBrands(req, res);
  }
});

// GET a single Brand
router.get("/:id", BrandController.getBrand);

// POST a new Brands
router.post("/", BrandController.createBrand);

// DELETE a Brand
router.delete("/:id", BrandController.deleteBrand);

// UPDATE a Brand
router.patch("/:id", BrandController.updateBrand);

export default router;
