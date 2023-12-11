import { GraphQLError } from "graphql";
import { CourseModel, CourseModelType } from "../../../db/course/course.ts";

const updateCourse = {
  Mutation: {
    updateCourse: async (
      _: unknown,
      args: { id: string; name: string; credits: number; instructorID: string; studentIDs: string[]; }
    ): Promise<CourseModelType> => {
      const course = await CourseModel.findByIdAndUpdate(
        args.id,
        { name: args.name, credits: args.credits, instructorID: args.instructorID, studentIDs: args.studentIDs },
        { new: true, runValidators: true },
      ).exec();

      if (!course) {
        throw new GraphQLError(`No course found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return course;
    },
  },
};

export default updateCourse;
