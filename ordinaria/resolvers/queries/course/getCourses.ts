import { CourseModel, CourseModelType } from "../../../db/course/course.ts";

const getCourses = {
  Query: {
    getCourses: async (): Promise<CourseModelType[]> => {
      const courses = await CourseModel.find({}).exec();
      return courses;
    },
  },
};

export default getCourses;
