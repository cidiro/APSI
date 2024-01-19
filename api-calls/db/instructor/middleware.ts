import { InstructorModelType } from "./instructor.ts";
import { CourseModel } from "../course/course.ts";

export const instructorPostSave = async function (doc: InstructorModelType) {
  try {
    // Update instructorID in related courses
    await CourseModel.updateMany(
      { _id: { $in: doc.courseIDs } },
      { instructorID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const instructorPostUpdate = async function (doc: InstructorModelType) {
  try {
    // courseIDs got updated: update instructorID in related courses
    const oldCourses = await CourseModel.find({
      instructorID: doc._id,
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
      { instructorID: null },
    );
    await CourseModel.updateMany(
      { _id: { $in: courseIDsAdded } },
      { instructorID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const instructorPostDelete = async function (doc: InstructorModelType) {
  try {
    // Update instructorID in related courses
    await CourseModel.updateMany(
      { _id: { $in: doc.courseIDs } },
      { instructorID: null },
    );
  } catch (_e) {
    console.log(_e);
  }
};
