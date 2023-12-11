import { GraphQLError } from "graphql";
import { InstructorModel, InstructorModelType } from "../../../db/instructor/instructor.ts";

const updateInstructor = {
  Mutation: {
    updateInstructor: async (
      _: unknown,
      args: { id: string; name: string; officeHours: string; courseIDs: string[] }
    ): Promise<InstructorModelType> => {
      const instructor = await InstructorModel.findByIdAndUpdate(
        args.id,
        { name: args.name, officeHours: args.officeHours, courseIDs: args.courseIDs },
        { new: true, runValidators: true },
      ).exec();

      if (!instructor) {
        throw new GraphQLError(`No instructor found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return instructor;
    },
  },
};

export default updateInstructor;
