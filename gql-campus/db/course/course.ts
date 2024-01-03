import mongoose from "mongoose";
import { Course } from "../../types.ts";
import { validators } from "./validators.ts";
import { globalValidators } from "../globalValidators.ts";
import { coursePostDelete, coursePostSave, coursePostUpdate } from "./middleware.ts";

export type CourseModelType =
  & mongoose.Document
  & Omit<Course, "id" | "instructor" | "students">
  & {
    instructorID: mongoose.Types.ObjectId,
    studentIDs: mongoose.Types.ObjectId[]
  };


const courseSchema = new mongoose.Schema(
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

    credits: {
      type: Number,
      required: true,
      validate: [
        {
          validator: globalValidators.creditsIsValid,
          message: "Credits must be between 1 and 6"
        }
      ]
    },

    instructorID: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Instructor",
      validate: [
        {
          validator: globalValidators.idIsValid,
          message: "Invalid instructor ID"
        },
        {
          validator: validators.instructorExists,
          message: "Instructor doesn't exist in the database"
        }
      ]
    },

    studentIDs: [{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Student",
      validate: [
        {
          validator: globalValidators.idIsValid,
          message: "Invalid student IDs"
        },
        {
          validator: globalValidators.idsAreUnique,
          message: "Some student IDs are repeated"
        },
        {
          validator: validators.studentsExist,
          message: "Some students don't exist in the database"
        }
      ]
    }]
  },

  { timestamps: true }
);

// on save: update related documents
courseSchema.post("save", coursePostSave);

// on update: update related documents
courseSchema.post("findOneAndUpdate", coursePostUpdate);

// on delete: update related documents
courseSchema.post("deleteOne", coursePostDelete);

export const CourseModel = mongoose.model<CourseModelType>(
  "Course",
  courseSchema
);
