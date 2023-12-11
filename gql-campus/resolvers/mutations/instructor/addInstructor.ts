import { InstructorModel, InstructorModelType } from "../../../db/instructor/instructor.ts";

const addInstructor = {
  Mutation: {
    addInstructor: async (
      _: unknown,
      args: { name: string; officeHours: string; courseIDs: string[] }
    ): Promise<InstructorModelType> => {
      const instructor = new InstructorModel({
        name: args.name,
        officeHours: args.officeHours,
        courseIDs: args.courseIDs,
      });

      await instructor.save();
      return instructor;
    },
  },
};

export default addInstructor;
