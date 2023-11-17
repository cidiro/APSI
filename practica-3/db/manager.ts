import mongoose from "npm:mongoose@7.6.3";
import { Manager } from "../types.ts";

const Schema = mongoose.Schema;

const managerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: {type: Number, required: true},
    clients: {type: Array<string>, required: false},
    id: {type: String, required: true}
  },
  { timestamps: true }
);

export type ManagerModelType = mongoose.Document & Omit<Manager, "id">;

export default mongoose.model<ManagerModelType>("Manager", managerSchema);
