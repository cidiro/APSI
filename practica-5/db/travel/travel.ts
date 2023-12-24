import mongoose from "mongoose";
import { Travel, Status } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { travelPostDelete, travelPostSave, travelPostUpdate } from "./middleware.ts";

export type TravelModelType =
  & mongoose.Document
  & Omit<Travel, "id" | "client" | "driver">
  & { clientID: mongoose.Types.ObjectId, driverID: mongoose.Types.ObjectId };

const Schema = mongoose.Schema;

const travelSchema = new Schema(
  {
    money: { type: Number, required: true, min: 5},
    distance: { type: Number, required: true, min: 0.01 },
    date: { type: String, required: true },
    status: { type: String, required: false, enum: Status, default: Status.ONGOING },
    clientID: { type: Schema.Types.ObjectId, required: false, ref: "Client" },
    driverID: { type: Schema.Types.ObjectId, required: false, ref: "Driver" },
  },
  { timestamps: true },
);

travelSchema.path("date").validate(
  globalValidators.dateIsValid,
  "Date must be in the format YYYY-MM-DD",
);

travelSchema.path("status").validate(
  globalValidators.statusIsValid,
  "Status must be one of the following: ONGOING, COMPLETED",
);

travelSchema.path("clientID").validate(
  globalValidators.idIsValid,
  "Invalid Client ID",
);

travelSchema.path("clientID").validate(
  validators.clientExists,
  "Client does not exist",
);

travelSchema.path("clientID").validate(
  validators.clientHasNoOngoingTravel,
  "Client already has an ONGOING travel",
);

travelSchema.path("clientID").validate(
  validators.clientHasEnoughMoney,
  "Client does not have enough money",
);

travelSchema.path("driverID").validate(
  globalValidators.idIsValid,
  "Invalid Driver ID",
);

travelSchema.path("driverID").validate(
  validators.driverExists,
  "Driver does not exist",
);

travelSchema.path("driverID").validate(
  validators.driverHasNoOngoingTravel,
  "Driver already has an ONGOING travel",
);

// on save: update related documents
travelSchema.post("save", travelPostSave);

// on update: update related documents
travelSchema.post("findOneAndUpdate", travelPostUpdate);

// on delete: update related documents
travelSchema.post("deleteOne", travelPostDelete);

export const TravelModel = mongoose.model<TravelModelType>(
  "Travel",
  travelSchema,
);
