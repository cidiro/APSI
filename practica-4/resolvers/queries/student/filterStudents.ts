import { Student } from "../../../types.ts";
import { StudentModel } from "../../../db/student/student.ts";
import { getStudentFromModel } from "../../../controllers/getStudentFromModel.ts";

const filterStudents = {
  Query: {
    filterStudents: async ( _: unknown, args: { major: string }, ): Promise<Student[]> => {
      const students = await StudentModel.find({ major: args.major }).exec();
      return await Promise.all(
        students.map((student) => getStudentFromModel(student)),
      );
    },
  },
};

export default filterStudents;
