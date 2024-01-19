import { StudentModel, StudentModelType } from "../../../db/student/student.ts";

const getStudents = {
  Query: {
    getStudents: async (): Promise<StudentModelType[]> => {
      const students = await StudentModel.find({}).exec();
      return students;
    },
  },
};

export default getStudents;
