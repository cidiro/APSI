import mongoose from "mongoose";
import { Driver } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { driverPostDelete, driverPostSave, driverPostUpdate } from "./middleware.ts";

export type DriverModelType =
  & mongoose.Document
  & Omit<Driver, "id" | "travels">
  & {
    travelIDs: Array<mongoose.Types.ObjectId>;
    hasOngoingTravel: boolean;
  };

const Schema = mongoose.Schema;

const driverSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    travelIDs: [ { type: Schema.Types.ObjectId, required: false, ref: "Travel" }, ],
    hasOngoingTravel: { type: Boolean, required: false, default: false },
  },
  { timestamps: true },
);

driverSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters long",
);

driverSchema.path("email").validate(
  globalValidators.emailIsValid,
  "Invalid email address",
);

driverSchema.path("username").validate(
  globalValidators.nameIsValid,
  "Username must be between 3 and 50 characters long",
);

driverSchema.path("travelIDs").validate(
  globalValidators.idsAreValid,
  "Invalid Travel IDs",
);

driverSchema.path("travelIDs").validate(
  globalValidators.idsAreUnique,
  "Some Travel IDs are repeated",
);

driverSchema.path("travelIDs").validate(
  validators.travelsExist,
  "Some Travel IDs don't exist in the database",
);

driverSchema.path("travelIDs").validate(
  validators.onlyOneTravelIsOngoing,
  "Driver already cannot have multiple ongoing travels",
);

// on save: update related documents
driverSchema.post("save", driverPostSave);

// on update: update related documents
driverSchema.post("findOneAndUpdate", driverPostUpdate);

// on delete: update related documents
driverSchema.post("deleteOne", driverPostDelete);

export const DriverModel = mongoose.model<DriverModelType>(
  "Driver",
  driverSchema,
);
