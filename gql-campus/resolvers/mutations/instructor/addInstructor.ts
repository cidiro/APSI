import { InstructorModel, InstructorModelType } from "../../../db/instructor/instructor.ts";

const addInstructor = {
  Mutation: {
    addInstructor: async (
      _: unknown,
      args: { name: string, email: string, officeHours: string, courseIDs: string[] }
    ): Promise<InstructorModelType> => {
      const instructor = new InstructorModel({
        name: args.name,
        email: args.email,
        officeHours: args.officeHours,
        courseIDs: args.courseIDs,
      });

      await instructor.save();
      return instructor;
    },
  },
};

export default addInstructor;
