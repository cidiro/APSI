import { StudentModel } from "../student/student.ts";
import { InstructorModel } from "../instructor/instructor.ts";
import { CourseModelType } from "./course.ts";

export const coursePostSave = async function (doc: CourseModelType) {
  try {
    // Update courseIDs in related students
    await StudentModel.updateMany(
      { _id: { $in: doc.studentIDs } },
      { $push: { courseIDs: doc._id } },
    );
    // Update courseIDs in related instructor
    await InstructorModel.updateOne(
      { _id: doc.instructorID },
      { $push: { courseIDs: doc._id } },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const coursePostUpdate = async function (doc: CourseModelType) {
  try {
    // studentIDs got updated: update courseIDs in related students
    const oldStudents = await StudentModel.find({
      courseIDs: { $elemMatch: { $eq: doc._id } },
    });
    const oldStudentsID = oldStudents.map((student) => student._id);

    const studentIDsRemoved = oldStudentsID.filter(
      (studentID) => !doc.studentIDs.includes(studentID),
    );
    const studentIDsAdded = doc.studentIDs.filter(
      (studentID) => !oldStudentsID.includes(studentID),
    );

    await StudentModel.updateMany(
      { _id: { $in: studentIDsRemoved } },
      { $pull: { courseIDs: doc._id } },
    );
    await StudentModel.updateMany(
      { _id: { $in: studentIDsAdded } },
      { $push: { courseIDs: doc._id } },
    );

    // instructorID got updated: update courseIDs in related instructor
    const instructor = await InstructorModel.findOne({
      courseIDs: { $elemMatch: { $eq: doc._id } },
    });

    if (instructor?._id !== doc.instructorID) {
      console.log("instructor changed !!");
      await InstructorModel.updateOne(
        { _id: instructor?._id },
        { $pull: { courseIDs: doc._id } },
      );
      await InstructorModel.updateOne(
        { _id: doc.instructorID },
        { $push: { courseIDs: doc._id } },
      );
    }
  } catch (_e) {
    console.log(_e);
  }
};

export const coursePostDelete = async function (doc: CourseModelType) {
  try {
    // Update courseIDs in related students
    await StudentModel.updateMany(
      { _id: { $in: doc.studentIDs } },
      { $pull: { courseIDs: doc._id } },
    );
    // Update courseIDs in related instructor
    await InstructorModel.updateOne(
      { _id: doc.instructorID },
      { $pull: { courseIDs: doc._id } },
    );
  } catch (_e) {
    console.log(_e);
  }
};
