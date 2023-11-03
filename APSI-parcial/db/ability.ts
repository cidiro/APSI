import mongoose from "npm:mongoose@7.6.3";
import { Ability } from "../types.ts";

const Schema = mongoose.Schema;

const abilitySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

export type AbilityModelType = mongoose.Document & Omit<Ability, "id">;

export default mongoose.model<AbilityModelType>("Ability", abilitySchema);
