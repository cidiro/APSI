import mongoose from "mongoose";
import { Student } from "../types.ts";
import { SubjectModel } from "./subject.ts";

const Schema = mongoose.Schema;

const studentSchema = new Schema(
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
studentSchema
  .path("name")
  .validate((name: string) => name.length >= 3 && name.length <= 50);

// validate email
studentSchema
  .path("email")
  .validate((email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));

// validate subjectsID
studentSchema
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

export type StudentModelType =
  & mongoose.Document
  & Omit<Student, "id" | "subjects">
  & { subjectsID: Array<mongoose.Types.ObjectId> };

export const StudentModel = mongoose.model<StudentModelType>(
  "Student",
  studentSchema,
);
