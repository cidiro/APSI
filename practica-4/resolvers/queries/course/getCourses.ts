import { Course } from "../../../types.ts";
import { CourseModel } from "../../../db/course/course.ts";
import { getCourseFromModel } from "../../../controllers/getCourseFromModel.ts";

const getCourses = {
  Query: {
    getCourses: async (): Promise<Course[]> => {
      const courses = await CourseModel.find().exec();
      return await Promise.all(
        courses.map((course) => getCourseFromModel(course))
      );
    },
  },
};

export default getCourses;
