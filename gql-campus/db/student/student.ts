import mongoose from "mongoose";
import { Student } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { studentPostDelete, studentPostSave, studentPostUpdate } from "./middleware.ts";

export type StudentModelType =
  & mongoose.Document
  & Omit<Student, "id" | "courses">
  & { courseIDs: mongoose.Types.ObjectId[] };


const studentSchema = new mongoose.Schema(
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

    major: {
      type: String,
      required: true,
      validate: [
        {
          validator: globalValidators.majorIsValid,
          message: "Major must be between 3 and 50 characters"
        }
      ]
    },

    year: {
      type: Number,
      required: true,
      validate: [
        {
          validator: globalValidators.yearIsValid,
          message: "Enrollment year must be between 1 and 5"
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
          validator: validators.coursesExist,
          message: "Some courses don't exist in the database"
        },
      ],
    }]
  },

  { timestamps: true }
);

// on save: update related documents
studentSchema.post("save", studentPostSave);

// on update: update related documents
studentSchema.post("findOneAndUpdate", studentPostUpdate);

// on delete: update related documents
studentSchema.post("deleteOne", studentPostDelete);

export const StudentModel = mongoose.model<StudentModelType>(
  "Student",
  studentSchema
);
