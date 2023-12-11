import { GraphQLError } from "graphql";
import { InstructorModel, InstructorModelType } from "../../../db/instructor/instructor.ts";

const getInstructor = {
  Query: {
    getInstructor: async (_: unknown, args: { id: string }): Promise<InstructorModelType> => {
      const instructor = await InstructorModel.findById(args.id).exec();
      if (!instructor) {
        throw new GraphQLError(`No instructor found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return instructor;
    },
  },
};

export default getInstructor;
