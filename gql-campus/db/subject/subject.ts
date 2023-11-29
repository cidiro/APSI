import mongoose from "mongoose";
import { Subject } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { subjectPostDelete, subjectPostSave, subjectPostUpdate } from "./middleware.ts";

export type SubjectModelType =
  & mongoose.Document
  & Omit<Subject, "id" | "teacher" | "students">
  & {
    teacherID: mongoose.Types.ObjectId;
    studentsID: Array<mongoose.Types.ObjectId>;
  };

const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    name: { type: String, required: true },
    year: { type: Number, required: true },
    teacherID: { type: Schema.Types.ObjectId, required: false, ref: "Teacher" },
    studentsID: [
      { type: Schema.Types.ObjectId, required: false, ref: "Student" },
    ],
  },
  { timestamps: true },
);

subjectSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

subjectSchema.path("year").validate(
  globalValidators.yearIsValid,
  "Year must be between 1 and 4",
);

subjectSchema.path("teacherID").validate(
  globalValidators.idIsValid,
  "Invalid teacher ID",
);

subjectSchema.path("teacherID").validate(
  validators.teacherExists,
  "Teacher doesn't exist in the database",
);

subjectSchema.path("studentsID").validate(
  globalValidators.idsAreValid,
  "Invalid student IDs",
);

subjectSchema.path("studentsID").validate(
  validators.studentsExist,
  "Some students don't exist in the database",
);

// on save: update related documents
subjectSchema.post("save", subjectPostSave);

// on update: update related documents
subjectSchema.post("findOneAndUpdate", subjectPostUpdate);

// on delete: update related documents
subjectSchema.post("deleteOne", subjectPostDelete);

export const SubjectModel = mongoose.model<SubjectModelType>(
  "Subject",
  subjectSchema,
);
