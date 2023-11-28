import { StudentModelType } from "./student.ts";
import { SubjectModel } from "../subject/subject.ts";

export const studentPostSave = async function (doc: StudentModelType) {
  if (doc.subjectsID.length) {
    try {
      await SubjectModel.updateMany(
        { _id: { $in: doc.subjectsID } },
        { $push: { studentsID: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const studentPostUpdate = async function (doc: StudentModelType) {
  try {
    const oldSubjects = await SubjectModel.find({
      studentsID: { $elemMatch: { $eq: doc._id } },
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
      { $pull: { studentsID: doc._id } },
    );
    await SubjectModel.updateMany(
      { _id: { $in: subjectIDsAdded } },
      { $push: { studentsID: doc._id } },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const studentPostDelete = async function (doc: StudentModelType) {
  if (doc.subjectsID.length) {
    try {
      await SubjectModel.updateMany(
        { _id: { $in: doc.subjectsID } },
        { $pull: { studentsID: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
