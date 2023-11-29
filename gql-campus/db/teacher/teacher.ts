import mongoose from "mongoose";
import { Teacher } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { teacherPostDelete, teacherPostSave, teacherPostUpdate } from "./middleware.ts";

export type TeacherModelType =
  & mongoose.Document
  & Omit<Teacher, "id" | "subjects">
  & { subjectsID: Array<mongoose.Types.ObjectId> };

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    subjectsID: [
      { type: Schema.Types.ObjectId, required: false, ref: "Subject" },
    ],
  },
  { timestamps: true },
);

teacherSchema.path("name").validate(
  globalValidators.nameIsValid,
  "Name must be between 3 and 50 characters",
);

teacherSchema.path("email").validate(
  globalValidators.emailIsValid,
  "Invalid email",
);

teacherSchema.path("subjectsID").validate(
  globalValidators.idsAreValid,
  "Invalid subject IDs",
);

teacherSchema.path("subjectsID").validate(
  validators.subjectsHaveNoTeacher,
  "Some subjects already have a teacher",
);

teacherSchema.path("subjectsID").validate(
  validators.subjectsExist,
  "Some subjects don't exist in the database",
);

// on save: update related documents
teacherSchema.post("save", teacherPostSave);

// on update: update related documents
teacherSchema.post("findOneAndUpdate", teacherPostUpdate);

// on delete: update related documents
teacherSchema.post("deleteOne", teacherPostDelete);

export const TeacherModel = mongoose.model<TeacherModelType>(
  "Teacher",
  teacherSchema,
);
