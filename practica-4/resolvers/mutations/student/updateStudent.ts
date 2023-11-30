import { GraphQLError } from "graphql";
import { Student } from "../../../types.ts";
import { StudentModel } from "../../../db/student/student.ts";
import { getStudentFromModel } from "../../../controllers/getStudentFromModel.ts";

const updateStudent = {
  Mutation: {
    updateStudent: async (
      _: unknown,
      args: { id: string; name: string; email: string; major: string; year: number; courseIDs: string[] },
    ): Promise<Student> => {
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
      return getStudentFromModel(student);
    },
  },
};

export default updateStudent;
