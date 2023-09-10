import mongoose, { SchemaDefinitionProperty } from "mongoose";
import modelOptions from "./mongoose.options";
interface PricingSchema {
  price: string;
  title: string;
  features: string[];
  description: string;
  additionalFeature: string;
  disabled: boolean;
}
const pricingSchema = new mongoose.Schema<PricingSchema>(
  {
    price: {
      type: String,
      required: [true, "Please provide a price"],
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },
    features: [{ type: String }],
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    additionalFeature: {
      type: String,
      required: [true, "Please provide a addition feature"],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  modelOptions
);

const Pricing =
  mongoose.models.Pricing || mongoose.model("Pricing", pricingSchema);

export default Pricing;
