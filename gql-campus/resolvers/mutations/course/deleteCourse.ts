import { GraphQLError } from "graphql";
import { Course } from "../../../types.ts";
import { CourseModel } from "../../../db/course/course.ts";
import { getCourseFromModel } from "../../../controllers/getCourseFromModel.ts";

const deleteCourse = {
  Mutation: {
    deleteCourse: async (_: unknown, args: { id: string }): Promise<Course> => {
      const course = await CourseModel.findByIdAndDelete(args.id).exec();
      if (!course) {
        throw new GraphQLError(`No course found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return await getCourseFromModel(course);
    }
  }
};

export default deleteCourse;
