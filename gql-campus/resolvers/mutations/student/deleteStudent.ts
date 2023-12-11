import { GraphQLError } from "graphql";
import { StudentModel, StudentModelType } from "../../../db/student/student.ts";

const deleteStudent = {
  Mutation: {
    deleteStudent: async (_: unknown, args: { id: string }): Promise<StudentModelType> => {
      const student = await StudentModel.findByIdAndDelete(args.id).exec();
      if (!student) {
        throw new GraphQLError(`No student found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return student;
    },
  },
};

export default deleteStudent;
