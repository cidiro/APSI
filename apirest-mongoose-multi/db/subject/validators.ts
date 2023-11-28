import mongoose from "mongoose";
import { TeacherModel } from "../teacher/teacher.ts";
import { StudentModel } from "../student/student.ts";

// Validate that teacherID exists in the database
const teacherExists = async (teacherID: mongoose.Types.ObjectId) => {
  try {
    const teacher = await TeacherModel.findById(teacherID);
    return !!teacher;
  } catch (_e) {
    return false;
  }
};

// Validate that all studentIDs exist in the database
const studentsExist = async (studentsID: mongoose.Types.ObjectId[]) => {
  try {
    const students = await StudentModel.find({ _id: { $in: studentsID } });
    return students.length === studentsID.length;
  } catch (_e) {
    return false;
  }
};

export const validators = {
  teacherExists,
  studentsExist,
};
