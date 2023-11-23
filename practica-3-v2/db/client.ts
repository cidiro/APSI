import mongoose from "mongoose";
import { Client } from "../types.ts";
import { MortgageModel } from "./mortgage.ts";
import { ManagerModel } from "./manager.ts";

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: Number, required: true},
    balance: {type: Number, required: true},
    mortgagesID: [
      { type: Schema.Types.ObjectId, required: false, ref: "Mortgage" },
    ],
    managerID: { type: Schema.Types.ObjectId, required: false, ref: "Manager" },
  },
  { timestamps: true }
);

// validate mortgagesID
clientSchema
  .path("mortgagesID")
  .validate(async function (mortgagesID: mongoose.Types.ObjectId[]) {
    try {
      if (mortgagesID.some((id) => !mongoose.isValidObjectId(id))) return false;

      const mortgages = await MortgageModel.find({ _id: { $in: mortgagesID } });
      return mortgages.length === mortgagesID.length;
    } catch (_e) {
      return false;
    }
  });

// validate managerID
clientSchema
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


// validate name
clientSchema
  .path("name")
  .validate((name: string) => !/\d/.test(name));

// validate email
clientSchema
  .path("email")
  .validate((email: string) => /\S+@\S+\.\S+/.test(email));

// validate phone
clientSchema
  .path("phone")
  .validate((phone: number) => !isNaN(phone));


export type ClientModelType = mongoose.Document &
  Omit<Client, "id" | "mortgages" | "manager"> & {
    mortgagesID: Array<mongoose.Types.ObjectId>;
    managerID: mongoose.Types.ObjectId;
  };

export const ClientModel = mongoose.model<ClientModelType>(
  "Client",
  clientSchema
);
