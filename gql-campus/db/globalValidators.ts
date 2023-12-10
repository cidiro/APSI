import mongoose from "mongoose";

// Validate name
const nameIsValid = (name: string) => name.length >= 3 && name.length <= 50;

// Validate year
const yearIsValid = (year: number) => year >= 1 && year <= 5;

// Validate credits
const creditsIsValid = (credits: number) => credits >= 1 && credits <= 6;

// Validate email
const emailIsValid = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validate major
const majorIsValid = (major: string) => major.length >= 3 && major.length <= 50;

// Validate office hours
const officeHoursIsValid = (officeHours: string) =>
  officeHours.length >= 3 && officeHours.length <= 50;

// Validate that id is a valid MongoDB ObjectID
const idIsValid = (id: mongoose.Types.ObjectId) => mongoose.isValidObjectId(id);

// Validate that all IDs are valid MongoDB ObjectIDs
const idsAreValid = (ids: mongoose.Types.ObjectId[]) =>
  !(ids.some((id) => !mongoose.isValidObjectId(id)));

// Validate that all IDs are unique (not repeated)
const idsAreUnique = (ids: mongoose.Types.ObjectId[]) =>
  ids.length === new Set(ids).size;

export const globalValidators = {
  nameIsValid,
  yearIsValid,
  creditsIsValid,
  emailIsValid,
  majorIsValid,
  officeHoursIsValid,
  idIsValid,
  idsAreValid,
  idsAreUnique,
};
