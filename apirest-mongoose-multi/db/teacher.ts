import mongoose from "mongoose";
import { Teacher } from "../types.ts";
import { SubjectModel } from "./subject.ts";

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

// validate name
teacherSchema
  .path("name")
  .validate((name: string) => name.length >= 3 && name.length <= 50);

// validate email
teacherSchema
  .path("email")
  .validate((email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

// validate subjectsID
teacherSchema
  .path("subjectsID")
  .validate(async function (subjectsID: mongoose.Types.ObjectId[]) {
    try {
      if (subjectsID.some((id) => !mongoose.isValidObjectId(id))) return false;

      const subjects = await SubjectModel.find({ _id: { $in: subjectsID } });
      return subjects.length === subjectsID.length;
    } catch (_e) {
      return false;
    }
  });

export type TeacherModelType =
  & mongoose.Document
  & Omit<Teacher, "id" | "subjects">
  & { subjectsID: Array<mongoose.Types.ObjectId> };

export const TeacherModel = mongoose.model<TeacherModelType>(
  "Teacher",
  teacherSchema,
);
