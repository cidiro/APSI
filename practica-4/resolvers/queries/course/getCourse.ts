import { GraphQLError } from "graphql";
import { Course } from "../../../types.ts";
import { CourseModel } from "../../../db/course/course.ts";
import { getCourseFromModel } from "../../../controllers/getCourseFromModel.ts";

const getCourse = {
  Query: {
    getInstructor: async (_: unknown, args: { id: string }): Promise<Course> => {
      const course = await CourseModel.findById(args.id).exec();
      if (!course) {
        throw new GraphQLError("Course not found");
      }
      return await getCourseFromModel(course);
    },
  },
};

export default getCourse;
