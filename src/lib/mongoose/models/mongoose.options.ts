import { ResolveSchemaOptions } from "mongoose";

interface ModelOptions {
  toJSON: {};
  toObject: {};
  versionKey: boolean;
  timestamps: boolean;
  setDefaultsOnInsert: true;
}
const modelOptions: ModelOptions = {
  toJSON: {
    virtuals: true,
    transform: (_: any, obj: { _id: any }) => {
      delete obj._id;
      return obj;
    },
  },

  toObject: {
    virtuals: true,
    transform: (_: any, obj: { _id: any }) => {
      delete obj._id;
      return obj;
    },
  },
  versionKey: false,
  timestamps: true,
  setDefaultsOnInsert: true,
};

export default modelOptions;
