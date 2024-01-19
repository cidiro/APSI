import { StudentModelType } from "../../db/student/student.ts";
import { CourseModel, CourseModelType } from "../../db/course/course.ts";

export const Student = {
  courses: async (parent: StudentModelType): Promise<Array<CourseModelType>> => {
    const courses = await CourseModel.find({ _id: { $in: parent.courseIDs } });
    return courses;
  },
};
