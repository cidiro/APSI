import { StudentModel } from "../student/student.ts";
import { TeacherModel } from "../teacher/teacher.ts";
import { SubjectModelType } from "./subject.ts";

export const subjectPostSave = async function (doc: SubjectModelType) {
  if (doc.studentsID.length) {
    try {
      await StudentModel.updateMany(
        { _id: { $in: doc.studentsID } },
        { $push: { subjectsID: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }

  if (doc.teacherID) {
    try {
      await TeacherModel.updateOne(
        { _id: doc.teacherID },
        { $push: { subjectsID: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const subjectPostUpdate = async function (doc: SubjectModelType) {
  console.log("subjectPostUpdate");
  try {
    // Update students
    const oldStudents = await StudentModel.find({
      subjectsID: { $elemMatch: { $eq: doc._id } },
    });
    const oldStudentsID = oldStudents.map((student) => student._id);

    const studentIDsRemoved = oldStudentsID.filter(
      (studentID) => !doc.studentsID.includes(studentID),
    );
    const studentIDsAdded = doc.studentsID.filter(
      (studentID) => !oldStudentsID.includes(studentID),
    );

    await StudentModel.updateMany(
      { _id: { $in: studentIDsRemoved } },
      { $pull: { subjectsID: doc._id } },
    );
    await StudentModel.updateMany(
      { _id: { $in: studentIDsAdded } },
      { $push: { subjectsID: doc._id } },
    );

    // Update teacher
    const teacher = await TeacherModel.findOne({
      subjectsID: { $elemMatch: { $eq: doc._id } },
    });

    if (teacher?._id !== doc.teacherID) {
      console.log("teacher changed !!");
      await TeacherModel.updateOne(
        { _id: teacher?._id },
        { $pull: { subjectsID: doc._id } },
      );
      await TeacherModel.updateOne(
        { _id: doc.teacherID },
        { $push: { subjectsID: doc._id } },
      );
    }
  } catch (_e) {
    console.log(_e);
  }
};

export const subjectPostDelete = async function (doc: SubjectModelType) {
  if (doc.studentsID.length) {
    try {
      await StudentModel.updateMany(
        { _id: { $in: doc.studentsID } },
        { $pull: { subjectsID: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }

  if (doc.teacherID) {
    try {
      await TeacherModel.updateOne(
        { _id: doc.teacherID },
        { $pull: { subjectsID: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
