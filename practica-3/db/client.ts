import mongoose from "npm:mongoose@7.6.3";
import { Client } from "../types.ts";

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: {type: Number, required: true},
    balance: {type: Number, required: true},
    mortgages: {type: Array<string>, required: false},
    id: {type: String, required: true},
    manager_id: {type: String, required: false}
  },
  { timestamps: true }
);

export type ClientModelType = mongoose.Document & Omit<Client, "id">;

export default mongoose.model<ClientModelType>("Client", clientSchema);
