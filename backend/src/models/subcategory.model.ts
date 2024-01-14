import { Schema, model, Types, Document } from "mongoose";

module Subcategory {
  export interface ISubcategory {
    name: string;
    description: string;
    products: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface SubcategoryModel extends ISubcategory, Document {}

  const subcategorySchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    createdAt: {
      type: Date,
      required: true,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
  });

  export const entity = model<SubcategoryModel>(
    "Subcategory",
    subcategorySchema,
  );

  export const getSubcategories = async function () {
    return await entity.find({}).sort({ name: -1 });
  };

  export const getSubcategory = async function (id: string) {
    return await entity.findById(id);
  };

  export const createSubcategory = async function (
    name: string,
    description: string,
  ) {
    const subcategory = await entity.create({
      name: name,
      description: description,
      products: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return subcategory;
  };

  export const deleteSubcategory = async function (id: string) {
    return await entity.findOneAndDelete({ _id: id });
  };

  export const updateSubcategory = async function (
    id: string,
    name: string,
    description: string,
    products: Types.ObjectId[],
  ) {
    const subcategory = await entity.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        description: description,
        products: products,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    return subcategory;
  };
}

export default Subcategory;
