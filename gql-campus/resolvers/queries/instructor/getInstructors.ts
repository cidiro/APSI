import { Instructor } from "../../../types.ts";
import { InstructorModel } from "../../../db/instructor/instructor.ts";
import { getInstructorFromModel } from "../../../controllers/getInstructorFromModel.ts";

const getInstructors = {
  Query: {
    getInstructors: async (): Promise<Instructor[]> => {
      const instructors = await InstructorModel.find({}).exec();
      return await Promise.all(
        instructors.map((instructor) => getInstructorFromModel(instructor))
      );
    },
  },
};

export default getInstructors;
