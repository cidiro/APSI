import mongoose from "npm:mongoose@7.6.3";
import { Character } from "../types.ts";

const Schema = mongoose.Schema;

const characterSchema = new Schema(
  {
    name: { type: String, required: true },
    race: { type: String, required: true },
    description: { type: String, required: true },
    abilities: { type: [], required: true },
  },
  { timestamps: true }
);

export type CharacterModelType = mongoose.Document & Omit<Character, "id">;

export default mongoose.model<CharacterModelType>("Character", characterSchema);
