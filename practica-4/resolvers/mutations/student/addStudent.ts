import { Student } from "../../../types.ts";
import { StudentModel } from "../../../db/student/student.ts";
import { getStudentFromModel } from "../../../controllers/getStudentFromModel.ts";

const addStudent = {
  Mutation: {
    addStudent: async (
      _: unknown,
      args: { name: string; email: string, major: string, year: number, courseIDs: string[] }
    ): Promise<Student> => {
      const student = new StudentModel({
        name: args.name,
        email: args.email,
        major: args.major,
        year: args.year,
        courseIDs: args.courseIDs,
      });

      await student.save();
      return getStudentFromModel(student);
    },
  },
};

export default addStudent;
