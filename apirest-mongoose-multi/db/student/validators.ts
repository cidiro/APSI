import mongoose from "mongoose";
import { SubjectModel } from "../subject/subject.ts";

// Validate that all subjectIDs exist in the database
const subjectsExist = async (subjectsID: mongoose.Types.ObjectId[]) => {
  try {
    const subjects = await SubjectModel.find({ _id: { $in: subjectsID } });
    return subjects.length === subjectsID.length;
  } catch (_e) {
    return false;
  }
};

export const validators = {
  subjectsExist,
};
