import { InstructorModel, InstructorModelType } from "../../../db/instructor/instructor.ts";

const getInstructors = {
  Query: {
    getInstructors: async (): Promise<InstructorModelType[]> => {
      const instructors = await InstructorModel.find({}).exec();
      return instructors;
    },
  },
};

export default getInstructors;
