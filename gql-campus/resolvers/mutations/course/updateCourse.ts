import { GraphQLError } from "graphql";
import { Course } from "../../../types.ts";
import { CourseModel } from "../../../db/course/course.ts";
import { getCourseFromModel } from "../../../controllers/getCourseFromModel.ts";

const updateCourse = {
  Mutation: {
    updateCourse: async (
      _: unknown,
      args: { id: string; name: string; credits: number; instructorID: string; studentIDs: string[]; }
    ): Promise<Course> => {
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
      return await getCourseFromModel(course);
    },
  },
};

export default updateCourse;
