import { StudentModelType } from "./student.ts";
import { CourseModel } from "../course/course.ts";

export const studentPostSave = async function (doc: StudentModelType) {
  if (doc.courseIDs.length) {
    try {
      await CourseModel.updateMany(
        { _id: { $in: doc.courseIDs } },
        { $push: { studentIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const studentPostUpdate = async function (doc: StudentModelType) {
  try {
    const oldCourses = await CourseModel.find({
      studentIDs: { $elemMatch: { $eq: doc._id } },
    });
    const oldCoursesID = oldCourses.map((course) => course._id);

    const courseIDsRemoved = oldCoursesID.filter(
      (courseID) => !doc.courseIDs.includes(courseID),
    );
    const courseIDsAdded = doc.courseIDs.filter(
      (courseID) => !oldCoursesID.includes(courseID),
    );

    await CourseModel.updateMany(
      { _id: { $in: courseIDsRemoved } },
      { $pull: { studentIDs: doc._id } },
    );
    await CourseModel.updateMany(
      { _id: { $in: courseIDsAdded } },
      { $push: { studentIDs: doc._id } },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const studentPostDelete = async function (doc: StudentModelType) {
  if (doc.courseIDs.length) {
    try {
      await CourseModel.updateMany(
        { _id: { $in: doc.courseIDs } },
        { $pull: { studentIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
