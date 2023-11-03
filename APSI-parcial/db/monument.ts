import mongoose from "npm:mongoose@7.6.3";
import { Monument } from "../types.ts";

const Schema = mongoose.Schema;

const monumentSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    zipcode: { type: Number, required: true },
    city_name: { type: String, required: false },
    country_name: { type: String, required: false },
    country_code: { type: String, required: true },
    region_name: { type: String, required: false },
    timezone: { type: String, required: false },
  },
  { timestamps: true }
);

export type MonumentModelType = mongoose.Document & Omit<Monument, "id">;

export default mongoose.model<MonumentModelType>("Monument", monumentSchema);
