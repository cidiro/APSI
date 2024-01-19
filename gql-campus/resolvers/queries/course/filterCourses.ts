import { CourseModel, CourseModelType } from "../../../db/course/course.ts";

const filterCourses = {
  Query: {
    filterCourses: async ( _: unknown, args: { credits: number }, ): Promise<CourseModelType[]> => {
      const courses = await CourseModel.find({ credits: args.credits }).exec();
      return courses;
    },
  },
};

export default filterCourses;
