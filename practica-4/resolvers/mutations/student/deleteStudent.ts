import { GraphQLError } from "graphql";
import { Student } from "../../../types.ts";
import { StudentModel } from "../../../db/student/student.ts";
import { getStudentFromModel } from "../../../controllers/getStudentFromModel.ts";

const deleteStudent = {
  Mutation: {
    deleteStudent: async (_: unknown, args: { id: string }): Promise<Student> => {
      const student = await StudentModel.findByIdAndDelete(args.id).exec();
      if (!student) {
        throw new GraphQLError(`No student found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return getStudentFromModel(student);
    },
  },
};

export default deleteStudent;
