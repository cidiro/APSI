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

// Validate that none of the courses have a instructor assigned
const coursesHaveNoInstructor = async (
  courseIDs: mongoose.Types.ObjectId[],
) => {
  try {
    const courses = await CourseModel.find({ _id: { $in: courseIDs } });
    return !(courses.some((course) => course.instructorID));
  } catch (_e) {
    return false;
  }
};

export const validators = {
  coursesExist,
  coursesHaveNoInstructor,
};
