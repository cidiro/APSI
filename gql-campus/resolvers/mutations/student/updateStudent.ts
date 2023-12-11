import { GraphQLError } from "graphql";
import { StudentModel, StudentModelType } from "../../../db/student/student.ts";

const updateStudent = {
  Mutation: {
    updateStudent: async (
      _: unknown,
      args: { id: string; name: string; email: string; major: string; year: number; courseIDs: string[] },
    ): Promise<StudentModelType> => {
      const student = await StudentModel.findByIdAndUpdate(
        args.id,
        { name: args.name, email: args.email, major: args.major, year: args.year, courseIDs: args.courseIDs },
        { new: true, runValidators: true },
      ).exec();

      if (!student) {
        throw new GraphQLError(`No student found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return student;
    },
  },
};

export default updateStudent;
