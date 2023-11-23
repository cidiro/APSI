import mongoose from "mongoose";
import { Mortgage } from "../types.ts";
import { ManagerModel } from "./manager.ts";
import { ClientModel } from "./client.ts";

const Schema = mongoose.Schema;

const mortgageSchema = new Schema(
  {
    amount: { type: Number, required: true },
    terms: { type: Number, required: true, default: 20 },
    terms_remaining: { type: Number, required: true, default: 20 },
    clientID: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
    managerID: { type: Schema.Types.ObjectId, required: true, ref: "Manager" },
  },
  { timestamps: true }
);


// validate clientID
mortgageSchema
  .path("clientID")
  .validate(async function (clientID: mongoose.Types.ObjectId) {
    try {
      if (!mongoose.isValidObjectId(clientID)) return false;
      const client = await ClientModel.findById(clientID);
      if (!client) return false;
      return true;
    } catch (_e) {
      return false;
    }
  });

// validate managerID
mortgageSchema
  .path("managerID")
  .validate(async function (managerID: mongoose.Types.ObjectId) {
    try {
      if (!mongoose.isValidObjectId(managerID)) return false;
      const manager = await ManagerModel.findById(managerID);
      if (!manager) return false;
      return true;
    } catch (_e) {
      return false;
    }
  });


// validate amount
mortgageSchema
  .path("amount")
  .validate((amount: number) => amount >= 0);

// validate terms
mortgageSchema
  .path("terms")
  .validate((terms: number) => terms >= 0);

// validate terms_remaining
mortgageSchema
  .path("terms_remaining")
  .validate((terms_remaining: number) => terms_remaining >= 0);


export type MortgageModelType = mongoose.Document &
  Omit<Mortgage, "id" | "client" | "manager"> & {
    clientID: mongoose.Types.ObjectId;
    managerID: mongoose.Types.ObjectId;
  };

export const MortgageModel = mongoose.model<MortgageModelType>(
  "Mortgage",
  mortgageSchema
);
