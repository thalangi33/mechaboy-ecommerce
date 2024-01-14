import { Schema, model, Types, Document } from "mongoose";
import Brand from "./brand.model";

module Product {
  export interface IImage {
    name: string;
    key: string;
  }

  export interface IProduct {
    name: string;
    pathname: string;
    description: string;
    category: Types.ObjectId;
    subcategory: Types.ObjectId;
    brand: Types.ObjectId;
    colorQuantity: object[];
    price: number;
    sold: number;
    images: IImage[];
    isFeatured: boolean;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ProductModel extends IProduct, Document {}

  const productSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    pathname: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
    },
    brand: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
    colorQuantity: [
      {
        color: {
          type: Schema.Types.ObjectId,
          ref: "Color",
        },
        quantity: Number,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
    },
    images: [
      {
        name: { type: String },
        key: { type: String },
      },
    ],
    isFeatured: {
      type: Boolean,
      require: true,
      default: false,
    },
    isArchived: {
      type: Boolean,
      require: true,
      default: false,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  });

  export const entity = model<ProductModel>("Product", productSchema);

  export const getProducts = async function () {
    return await entity
      .find({})
      .populate("category subcategory brand colorQuantity.color")
      .sort({ name: -1 });
  };

  export const getProduct = async function (id: string) {
    return await entity.findById(id);
  };

  export const getManyProductsById = async function (ids: string[]) {
    return await entity.find({ _id: { $in: ids } });
  };

  export const getProductBestSeller = async function () {
    return await entity
      .find({})
      .populate("category subcategory brand colorQuantity.color")
      .sort({ sold: "desc" })
      .limit(8);
  };

  export const getProductFeaturedKeyboards = async function () {
    return await entity
      .find({ category: "65254f78e2b55b42b1828e4b" })
      .populate("category subcategory brand colorQuantity.color")
      .sort({ sold: "desc" })
      .limit(8);
  };

  export const getProductFeaturedKeycaps = async function () {
    return await entity
      .find({ category: "65254f90e2b55b42b1828e50" })
      .populate("category subcategory brand colorQuantity.color")
      .sort({ sold: "desc" })
      .limit(8);
  };

  export const getProductFeaturedSwitches = async function () {
    return await entity
      .find({ category: "65254fb1e2b55b42b1828e55" })
      .populate("category subcategory brand colorQuantity.color")
      .sort({ sold: "desc" })
      .limit(8);
  };

  export const getProductKeyboards = async function () {
    return await entity
      .find({ category: "65254f78e2b55b42b1828e4b" })
      .populate("category subcategory brand colorQuantity.color")
      .sort({ sold: "desc" })
      .limit(8);
  };

  export const getProductKeycaps = async function () {
    return await entity
      .find({ category: "65254f90e2b55b42b1828e50" })
      .populate("category subcategory brand colorQuantity.color")
      .sort({ sold: "desc" })
      .limit(8);
  };

  export const getProductSwitches = async function () {
    return await entity
      .find({ category: "65254fb1e2b55b42b1828e55" })
      .populate("category subcategory brand colorQuantity.color")
      .sort({ sold: "desc" })
      .limit(8);
  };

  export const getProductByPathname = async function (pathname: string) {
    return await entity
      .findOne({ pathname: pathname })
      .populate("category subcategory brand colorQuantity.color");
  };

  export const getProductByBrand = async function (pathname: string) {
    const brand = await Brand.entity.findOne({ pathname: pathname });
    return await entity
      .find({ brand: brand!._id })
      .populate("category subcategory brand colorQuantity.color");
  };

  export const createProduct = async function (
    name: string,
    pathname: string,
    description: string,
    category: Types.ObjectId,
    subcategory: Types.ObjectId,
    brand: Types.ObjectId,
    colorQuantity: object[],
    price: number,
    sold: number,
    images: IImage[],
    isFeatured: boolean,
    isArchived: boolean,
  ) {
    const product = await entity.create({
      name: name,
      pathname: pathname,
      description: description,
      category: category,
      subcategory: subcategory,
      brand: brand,
      colorQuantity: colorQuantity,
      price: price,
      sold: sold,
      images: images,
      isFeatured: isFeatured,
      isArchived: isArchived,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return product;
  };

  export const deleteProduct = async function (id: string) {
    return await entity.findOneAndDelete({ _id: id });
  };

  export const updateProduct = async function (
    id: string,
    name: string,
    pathname: string,
    description: string,
    category: Types.ObjectId,
    subcategory: Types.ObjectId,
    brand: Types.ObjectId,
    colorQuantity: object[],
    price: number,
    sold: number,
    images: IImage[],
    isFeatured: boolean,
    isArchived: boolean,
  ) {
    const product = await entity.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        pathname: pathname,
        description: description,
        category: category,
        subcategory: subcategory,
        brand: brand,
        colorQuantity: colorQuantity,
        price: price,
        sold: sold,
        images: images,
        isFeatured: isFeatured,
        isArchived: isArchived,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    return product;
  };
}

export default Product;
