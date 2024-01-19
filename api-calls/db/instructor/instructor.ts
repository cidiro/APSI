import mongoose from "mongoose";
import { Instructor } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { instructorPostDelete, instructorPostSave, instructorPostUpdate } from "./middleware.ts";

export type InstructorModelType =
  & mongoose.Document
  & Omit<Instructor, "id" | "courses">
  & { courseIDs: mongoose.Types.ObjectId[] };


const instructorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: globalValidators.nameIsValid,
          message: "Name must be between 3 and 50 characters"
        }
      ]
    },

    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: globalValidators.emailIsValid,
          message: "Invalid email address"
        }
      ]
    },

    officeHours: {
      type: String,
      required: true,
      validate: [
        {
          validator: globalValidators.officeHoursIsValid,
          message: "Office hours must be between 3 and 50 characters"
        }
      ]
    },

    courseIDs: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Course",
      validate: [
        {
          validator: globalValidators.idsAreValid,
          message: "Invalid course IDs"
        },
        {
          validator: globalValidators.idsAreUnique,
          message: "Some course IDs are repeated"
        },
        {
          validator: validators.coursesHaveNoInstructor,
          message: "Some courses already have a instructor"
        },
        {
          validator: validators.coursesExist,
          message: "Some courses don't exist in the database"
        }
      ]
    }]
  },

  { timestamps: true }
);

instructorSchema
  .post("save", instructorPostSave)
  .post("findOneAndUpdate", instructorPostUpdate)
  .post("findOneAndDelete", instructorPostDelete);

export const InstructorModel = mongoose.model<InstructorModelType>(
  "Instructor",
  instructorSchema
);
