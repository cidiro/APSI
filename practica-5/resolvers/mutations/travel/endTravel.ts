import { GraphQLError } from "graphql";
import { TravelModel, TravelModelType } from "../../../db/travel/travel.ts";
import { Status } from "../../../types.ts";

const endTravel = {
  Mutation: {
    endTravel: async (
      _: unknown,
      args: { id: string },
    ): Promise<TravelModelType> => {
      const travel = await TravelModel.findByIdAndUpdate(
        args.id,
		{ status: Status.COMPLETED },
        { new: true, runValidators: true },
      ).exec();

      if (!travel) {
        throw new GraphQLError(`No travel found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return travel;
    },
  },
};

export default endTravel;
