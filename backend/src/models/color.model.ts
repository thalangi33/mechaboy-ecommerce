import { Schema, model, Document } from "mongoose";

module Color {
  export interface IColor {
    name: string;
    value: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ColorModel extends IColor, Document {}

  const colorSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: String,
      required: true,
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

  export const entity = model<ColorModel>("Color", colorSchema);

  export const getColors = async function () {
    return await entity.find({}).sort({ name: -1 });
  };

  export const getColor = async function (id: string) {
    return await entity.findById(id);
  };

  export const createColor = async function (
    name: string,
    value: string,
  ) {
    const color = await entity.create({
      name: name,
      value: value,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return color;
  };

  export const deleteColor = async function (id: string) {
    return await entity.findOneAndDelete({ _id: id });
  };

  export const updateColor = async function (
    id: string,
    name: string,
    value: string,
  ) {
    const color = await entity.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        value: value,
        updatedAt: new Date(),
      },
      {
        new: true,
      },
    );

    return color;
  };
}

export default Color;
