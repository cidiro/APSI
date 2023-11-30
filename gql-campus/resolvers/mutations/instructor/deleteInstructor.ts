import { GraphQLError } from "graphql";
import { Instructor } from "../../../types.ts";
import { InstructorModel } from "../../../db/instructor/instructor.ts";
import { getInstructorFromModel } from "../../../controllers/getInstructorFromModel.ts";

const deleteInstructor = {
  Mutation: {
    deleteInstructor: async (_: unknown, args: { id: string }): Promise<Instructor> => {
      const instructor = await InstructorModel.findByIdAndDelete(args.id).exec();
      if (!instructor) {
        throw new GraphQLError(`No instructor found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return await getInstructorFromModel(instructor);
    },
  },
};

export default deleteInstructor;
