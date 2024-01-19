import mongoose from "mongoose";
import { Contact } from "../types.ts";
import { validators } from "./validators.ts";

export type ContactModelType =
  & mongoose.Document
  & Omit<Contact, "id" | "country" | "time">

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      validate: [
        {
          validator: validators.nameIsValid,
          message: "Full name must be between 3 and 50 characters long."
        }
      ]
    },

    number: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: validators.phoneNumberIsValid,
          message: "Phone number is invalid."
        }
      ]
    }
  },
  { timestamps: true }
);

export const ContactModel = mongoose.model<ContactModelType>(
  "contact",
  contactSchema
);
