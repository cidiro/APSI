import mongoose from "mongoose";
import { Instructor } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { instructorPostDelete, instructorPostSave, instructorPostUpdate } from "./middleware.ts";

export type InstructorModelType =
  & mongoose.Document
  & Omit<Instructor, "id" | "courses">
  & { courseIDs: Array<mongoose.Types.ObjectId> };

const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    name: { type: String, required: true },
    officeHours: { type: String, required: true },
    courseIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Course" },
    ],
  },
  { timestamps: true },
);

instructorSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

instructorSchema.path("officeHours").validate(
  globalValidators.officeHoursIsValid,
  "Office hours must be between 3 and 50 characters",
);

instructorSchema.path("courseIDs").validate(
  globalValidators.idsAreValid,
  "Invalid course IDs",
);

instructorSchema.path("courseIDs").validate(
  validators.coursesHaveNoInstructor,
  "Some courses already have a instructor",
);

instructorSchema.path("courseIDs").validate(
  validators.coursesExist,
  "Some courses don't exist in the database",
);

// on save: update related documents
instructorSchema.post("save", instructorPostSave);

// on update: update related documents
instructorSchema.post("findOneAndUpdate", instructorPostUpdate);

// on delete: update related documents
instructorSchema.post("deleteOne", instructorPostDelete);

export const InstructorModel = mongoose.model<InstructorModelType>(
  "Instructor",
  instructorSchema,
);
