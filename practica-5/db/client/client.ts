import mongoose from "mongoose";
import { Client } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { clientPostDelete, clientPostSave, clientPostUpdate } from "./middleware.ts";

export type ClientModelType =
  & mongoose.Document
  & Omit<Client, "id" | "travels">
  & {
    travelIDs: Array<mongoose.Types.ObjectId>;
    hasOngoingTravel: boolean;
  };

const Schema = mongoose.Schema;

const clientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cards: [ {
      type: {
        number: String,
        cvv: String,
        expirity: String,
        money: Number,
      }, required: false }, ],
    travelIDs: [ { type: Schema.Types.ObjectId, required: false, ref: "Travel" }, ],
    hasOngoingTravel: { type: Boolean, required: false, default: false },
  },
  { timestamps: true },
);

clientSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters long",
);

clientSchema.path("email").validate(
  globalValidators.emailIsValid,
  "Invalid email address",
);

// TODO: validate that the card number is valid
clientSchema.path("cards").validate(
  validators.cardsAreValid,
  "Invalid cards",
);

clientSchema.path("travelIDs").validate(
  globalValidators.idsAreValid,
  "Invalid Travel IDs",
);

clientSchema.path("travelIDs").validate(
  globalValidators.idsAreUnique,
  "Some Travel IDs are repeated",
);

clientSchema.path("travelIDs").validate(
  validators.travelsExist,
  "Some Travel IDs don't exist in the database",
);

clientSchema.path("travelIDs").validate(
  validators.onlyOneTravelIsOngoing,
  "Client already cannot have multiple ongoing travels",
);

// on save: update related documents
clientSchema.post("save", clientPostSave);

// on update: update related documents
clientSchema.post("findOneAndUpdate", clientPostUpdate);

// on delete: update related documents
clientSchema.post("deleteOne", clientPostDelete);

export const ClientModel = mongoose.model<ClientModelType>(
  "Client",
  clientSchema,
);
