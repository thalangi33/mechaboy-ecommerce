import { Schema, model, Types, Document } from "mongoose";

module Image {
  export interface IImage {
    product: Types.ObjectId;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ImageModel extends IImage, Document {}

  const imageSchema = new Schema({
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    url: {
      type: String,
      required: true,
      unique: true,
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

  export const entity = model<ImageModel>("Image", imageSchema);

  export const getImages = async function () {
    return await entity.find({}).sort({ name: -1 });
  };

  export const getImage = async function (id: string) {
    return await entity.findById(id);
  };

  export const createImage = async function (
    product: Types.ObjectId,
    url: string,
  ) {
    const image = await entity.create({
      product: product,
      url: url,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return image;
  };

  export const deleteImage = async function (id: string) {
    return await entity.findOneAndDelete({ _id: id });
  };

  export const updateImage = async function (
    id: string,
    product: Types.ObjectId,
    url: string,
  ) {
    const image = await entity.findOneAndUpdate(
      { _id: id },
      {
        product: product,
        url: url,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    return image;
  };
}

export default Image;
