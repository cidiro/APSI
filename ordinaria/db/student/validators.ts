import mongoose from "mongoose";
import { CourseModel } from "../course/course.ts";

// Validate that all courseIDs exist in the database
const coursesExist = async (courseIDs: mongoose.Types.ObjectId[]) => {
  try {
    const courses = await CourseModel.find({ _id: { $in: courseIDs } });
    return courses.length === courseIDs.length;
  } catch (_e) {
    return false;
  }
};

export const validators = {
  coursesExist,
};
