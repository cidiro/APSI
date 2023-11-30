import { GraphQLError } from "graphql";
import { Instructor } from "../../../types.ts";
import { InstructorModel } from "../../../db/instructor/instructor.ts";
import { getInstructorFromModel } from "../../../controllers/getInstructorFromModel.ts";

const getInstructor = {
  Query: {
    getInstructor: async (_: unknown, args: { id: string }): Promise<Instructor> => {
      const instructor = await InstructorModel.findById(args.id).exec();
      if (!instructor) {
        throw new GraphQLError("Instructor not found");
      }
      return await getInstructorFromModel(instructor);
    },
  },
};

export default getInstructor;
