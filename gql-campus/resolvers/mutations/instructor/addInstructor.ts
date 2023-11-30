import { Instructor } from "../../../types.ts";
import { InstructorModel } from "../../../db/instructor/instructor.ts";
import { getInstructorFromModel } from "../../../controllers/getInstructorFromModel.ts";

const addInstructor = {
  Mutation: {
    addInstructor: async (
      _: unknown,
      args: { name: string; officeHours: string; courseIDs: string[] }
    ): Promise<Instructor> => {
      const instructor = new InstructorModel({
        name: args.name,
        officeHours: args.officeHours,
        courseIDs: args.courseIDs,
      });
      await instructor.save();
      return await getInstructorFromModel(instructor);
    },
  },
};

export default addInstructor;
