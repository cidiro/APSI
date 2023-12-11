import mongoose from "mongoose";
import { Course } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { coursePostDelete, coursePostSave, coursePostUpdate } from "./middleware.ts";

export type CourseModelType =
  & mongoose.Document
  & Omit<Course, "id" | "instructor" | "students">
  & {
    instructorID: mongoose.Types.ObjectId;
    studentIDs: Array<mongoose.Types.ObjectId>;
  };

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    credits: { type: Number, required: true },
    instructorID: { type: Schema.Types.ObjectId, required: false, ref: "Instructor" },
    studentIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Student" },
    ],
  },
  { timestamps: true },
);

courseSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

courseSchema.path("credits").validate(
  globalValidators.creditsIsValid,
  "Credits must be between 1 and 6",
);

courseSchema.path("instructorID").validate(
  globalValidators.idIsValid,
  "Invalid instructor ID",
);

courseSchema.path("instructorID").validate(
  validators.instructorExists,
  "Instructor doesn't exist in the database",
);

courseSchema.path("studentIDs").validate(
  globalValidators.idsAreValid,
  "Invalid student IDs",
);

courseSchema.path("studentIDs").validate(
  globalValidators.idsAreUnique,
  "Some student IDs are repeated",
);

courseSchema.path("studentIDs").validate(
  validators.studentsExist,
  "Some students don't exist in the database",
);

// on save: update related documents
courseSchema.post("save", coursePostSave);

// on update: update related documents
courseSchema.post("findOneAndUpdate", coursePostUpdate);

// on delete: update related documents
courseSchema.post("deleteOne", coursePostDelete);

export const CourseModel = mongoose.model<CourseModelType>(
  "Course",
  courseSchema,
);
