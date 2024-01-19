import { StudentModel, StudentModelType } from "../../../db/student/student.ts";

const filterStudents = {
  Query: {
    filterStudents: async ( _: unknown, args: { major: string }, ): Promise<StudentModelType[]> => {
      const students = await StudentModel.find({ major: args.major }).exec();
      return students;
    },
  },
};

export default filterStudents;
