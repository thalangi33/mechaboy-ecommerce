import { Schema, model, Types, Document } from "mongoose";

module Brand {
  export interface IBrand {
    name: string;
    pathname: string;
    description: string;
    products: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface BrandModel extends IBrand, Document {}

  const brandSchema = new Schema({
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

  export const entity = model<BrandModel>("Brand", brandSchema);

  export const getBrands = async function () {
    return await entity.find({}).sort({ name: -1 });
  };

  export const getBrand = async function (id: string) {
    return await entity.findById(id);
  };

  export const getBrandByPathname = async function (pathname: string) {
    return await entity.findOne({ pathname: pathname });
  };

  export const createBrand = async function (
    name: string,
    pathname: string,
    description: string,
  ) {
    const brand = await entity.create({
      name: name,
      pathname: pathname,
      description: description,
      products: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return brand;
  };

  export const deleteBrand = async function (id: string) {
    return await entity.findOneAndDelete({ _id: id });
  };

  export const updateBrand = async function (
    id: string,
    name: string,
    pathname: string,
    description: string,
    products: Types.ObjectId[],
  ) {
    const brand = await entity.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        pathname: pathname,
        description: description,
        products: products,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    return brand;
  };
}

export default Brand;
