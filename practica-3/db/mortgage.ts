import mongoose from "npm:mongoose@7.6.3";
import { Mortgage } from "../types.ts";

const Schema = mongoose.Schema;

const mortgageSchema = new Schema(
  {
    amount: { type: Number, required: true },
    terms: { type: Number, required: false, default: 20 },
    terms_remaining: {type: Number, required: false, default: 20},
    client_id : {type: String, required: true},
    manager_id : {type: String, required: true}
  },
  { timestamps: true }
);

export type MortgageModelType = mongoose.Document & Omit<Mortgage, "id">;

export default mongoose.model<MortgageModelType>("Mortgage", mortgageSchema);
