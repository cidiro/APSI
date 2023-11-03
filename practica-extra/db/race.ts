import mongoose from "npm:mongoose@7.6.3";
import { Race } from "../types.ts";

const Schema = mongoose.Schema;

const raceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export type RaceModelType = mongoose.Document & Omit<Race, "id">;

export default mongoose.model<RaceModelType>("Race", raceSchema);
