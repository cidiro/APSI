import mongoose from "mongoose";
import { Student } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { studentPostDelete, studentPostSave, studentPostUpdate } from "./middleware.ts";

export type StudentModelType =
  & mongoose.Document
  & Omit<Student, "id" | "courses">
  & { courseIDs: Array<mongoose.Types.ObjectId> };

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    major: { type: String, required: true },
    year: { type: Number, required: true },
    courseIDs: [
      { type: Schema.Types.ObjectId, required: false, ref: "Course" },
    ],
  },
  { timestamps: true },
);

studentSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

studentSchema.path("email").validate(
  globalValidators.emailIsValid,
  "Invalid email",
);

studentSchema.path("major").validate(
  globalValidators.majorIsValid,
  "Major must be between 3 and 50 characters",
);

studentSchema.path("year").validate(
  globalValidators.yearIsValid,
  "Enrollment year must be between 1 and 5",
);

studentSchema.path("courseIDs").validate(
  globalValidators.idsAreValid,
  "Invalid course IDs",
);

studentSchema.path("courseIDs").validate(
  validators.coursesExist,
  "Some courses don't exist in the database",
);

// on save: update related documents
studentSchema.post("save", studentPostSave);

// on update: update related documents
studentSchema.post("findOneAndUpdate", studentPostUpdate);

// on delete: update related documents
studentSchema.post("deleteOne", studentPostDelete);

export const StudentModel = mongoose.model<StudentModelType>(
  "Student",
  studentSchema,
);
