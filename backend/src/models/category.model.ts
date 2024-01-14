import { Schema, model, Types, Document } from "mongoose";

module Category {
  export interface ICategory {
    name: string;
    pathname: string;
    description: string;
    subcategories: Types.ObjectId[];
    products: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface CategoryModel extends ICategory, Document {}

  const categorySchema = new Schema({
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
    subcategories: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
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

  export const entity = model<CategoryModel>("Category", categorySchema);

  export const getCategories = async function () {
    return await entity.find({}).populate("subcategories").sort({ name: -1 });
  };

  export const getCategory = async function (id: string) {
    return await entity.findById(id).populate("subcategories");
  };

  export const createCategory = async function (
    name: string,
    pathname: string,
    description: string,
    subcategories: Types.ObjectId[],
  ) {
    const category = await entity.create({
      name: name,
      pathname: pathname,
      description: description,
      subcategories: subcategories,
      products: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return category;
  };

  export const deleteCategory = async function (id: string) {
    return await entity.findOneAndDelete({ _id: id });
  };

  export const updateCategory = async function (
    id: string,
    name: string,
    pathname: string,
    description: string,
    subcategories: Types.ObjectId[],
    products: Types.ObjectId[],
  ) {
    const category = await entity.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        pathname: pathname,
        description: description,
        subcategories: subcategories,
        products: products,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    return category;
  };
}

export default Category;
