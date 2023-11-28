import mongoose from "mongoose";

// Validate name
const nameIsValid = (name: string) => name.length >= 3 && name.length <= 50;

// Validate year
const yearIsValid = (year: number) => year >= 1 && year <= 4;

// Validate email
const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validate that id is a valid MongoDB ObjectID
const idIsValid = (id: mongoose.Types.ObjectId) =>
  mongoose.isValidObjectId(id);

// Validate that all IDs are valid MongoDB ObjectIDs
const idsAreValid = (ids: mongoose.Types.ObjectId[]) =>
  !(ids.some((id) => !mongoose.isValidObjectId(id)));

export const globalValidators = {
  nameIsValid,
  yearIsValid,
  emailIsValid,
  idIsValid,
  idsAreValid,
};
