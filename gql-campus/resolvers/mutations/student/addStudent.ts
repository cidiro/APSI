import { StudentModel, StudentModelType } from "../../../db/student/student.ts";

const addStudent = {
  Mutation: {
    addStudent: async (
      _: unknown,
      args: { name: string, email: string, major: string, year: number, courseIDs: string[] }
    ): Promise<StudentModelType> => {
      const student = new StudentModel({
        name: args.name,
        email: args.email,
        major: args.major,
        year: args.year,
        courseIDs: args.courseIDs,
      });

      await student.save();
      return student;
    },
  },
};

export default addStudent;
