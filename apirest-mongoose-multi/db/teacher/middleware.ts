import { TeacherModelType } from "./teacher.ts";
import { SubjectModel } from "../subject/subject.ts";

export const teacherPostSave = async function (doc: TeacherModelType) {
  if (doc.subjectsID.length) {
    try {
      await SubjectModel.updateMany(
        { _id: { $in: doc.subjectsID } },
        { teacherID: doc._id },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const teacherPostUpdate = async function (doc: TeacherModelType) {
  try {
    const oldSubjects = await SubjectModel.find({
      teacherID: doc._id,
    });
    const oldSubjectsID = oldSubjects.map((subject) => subject._id);

    const subjectIDsRemoved = oldSubjectsID.filter(
      (subjectID) => !doc.subjectsID.includes(subjectID),
    );
    const subjectIDsAdded = doc.subjectsID.filter(
      (subjectID) => !oldSubjectsID.includes(subjectID),
    );

    await SubjectModel.updateMany(
      { _id: { $in: subjectIDsRemoved } },
      { teacherID: null },
    );
    await SubjectModel.updateMany(
      { _id: { $in: subjectIDsAdded } },
      { teacherID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
}

export const teacherPostDelete = async function (doc: TeacherModelType) {
  if (doc.subjectsID.length) {
    try {
      await SubjectModel.updateMany(
        { _id: { $in: doc.subjectsID } },
        { teacherID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
