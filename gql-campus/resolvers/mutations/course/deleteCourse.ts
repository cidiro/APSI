import { GraphQLError } from "graphql";
import { CourseModel, CourseModelType } from "../../../db/course/course.ts";

const deleteCourse = {
  Mutation: {
    deleteCourse: async (_: unknown, args: { id: string }): Promise<CourseModelType> => {
      const course = await CourseModel.findByIdAndDelete(args.id).exec();
      if (!course) {
        throw new GraphQLError(`No course found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return course;
    }
  }
};

export default deleteCourse;
