import { Course } from "../../../types.ts";
import { CourseModel } from "../../../db/course/course.ts";
import { getCourseFromModel } from "../../../controllers/getCourseFromModel.ts";

const filterCourses = {
  Query: {
    filterCourses: async ( _: unknown, args: { credits: number }, ): Promise<Course[]> => {
      const courses = await CourseModel.find({ credits: args.credits }).exec();
      return await Promise.all(
        courses.map((course) => getCourseFromModel(course)),
      );
    },
  },
};

export default filterCourses;
