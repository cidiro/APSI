import { Student } from "../../../types.ts";
import { StudentModel } from "../../../db/student/student.ts";
import { getStudentFromModel } from "../../../controllers/getStudentFromModel.ts";

const getStudents = {
  Query: {
    getStudents: async (): Promise<Student[]> => {
      const students = await StudentModel.find({}).exec();
      return await Promise.all(
        students.map((student) => getStudentFromModel(student))
      );
    },
  },
};

export default getStudents;
