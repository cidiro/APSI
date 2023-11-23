import mongoose from "mongoose";
import { Manager } from "../types.ts";
import { ClientModel } from "./client.ts";

const Schema = mongoose.Schema;

const managerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: {type: Number, required: true},
    clientsID: [
      { type: Schema.Types.ObjectId, required: true, ref: "Client" },
    ],
  },
  { timestamps: true }
);

// validate clientsID
managerSchema
  .path("clientsID")
  .validate(async function (clientsID: mongoose.Types.ObjectId[]) {
    try {
      if (clientsID.some((id) => !mongoose.isValidObjectId(id))) return false;

      const clients = await ClientModel.find({ _id: { $in: clientsID } });
      return clients.length === clientsID.length;
    } catch (_e) {
      return false;
    }
  });


// validate name
managerSchema
  .path("name")
  .validate((name: string) => !/\d/.test(name));

// validate email
managerSchema
  .path("email")
  .validate((email: string) => /\S+@\S+\.\S+/.test(email));

// validate phone
managerSchema
  .path("phone")
  .validate((phone: number) => !isNaN(phone));


export type ManagerModelType = mongoose.Document &
  Omit<Manager, "id" | "clients"> & {
    clientsID: Array<mongoose.Types.ObjectId>;
  };

export const ManagerModel = mongoose.model<ManagerModelType>(
  "Manager",
  managerSchema
);
