import { GraphQLError } from "graphql";
import { InstructorModel, InstructorModelType } from "../../../db/instructor/instructor.ts";

const deleteInstructor = {
  Mutation: {
    deleteInstructor: async (_: unknown, args: { id: string }): Promise<InstructorModelType> => {
      const instructor = await InstructorModel.findByIdAndDelete(args.id).exec();
      if (!instructor) {
        throw new GraphQLError(`No instructor found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return instructor;
    },
  },
};

export default deleteInstructor;
