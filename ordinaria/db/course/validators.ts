import mongoose from "mongoose";
import { InstructorModel } from "../instructor/instructor.ts";
import { StudentModel } from "../student/student.ts";

// Validate that instructorID exists in the database
const instructorExists = async (instructorID: mongoose.Types.ObjectId) => {
  try {
    const instructor = await InstructorModel.findById(instructorID);
    return !!instructor;
  } catch (_e) {
    return false;
  }
};

// Validate that all studentIDs exist in the database
const studentsExist = async (studentIDs: mongoose.Types.ObjectId[]) => {
  try {
    const students = await StudentModel.find({ _id: { $in: studentIDs } });
    return students.length === studentIDs.length;
  } catch (_e) {
    return false;
  }
};

export const validators = {
  instructorExists,
  studentsExist,
};
