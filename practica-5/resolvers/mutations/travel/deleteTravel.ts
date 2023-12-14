import { GraphQLError } from "graphql";
import { TravelModel, TravelModelType } from "../../../db/travel/travel.ts";

const deleteTravel = {
  Mutation: {
    deleteTravel: async (_: unknown, args: { id: string }): Promise<TravelModelType> => {
      const travel = await TravelModel.findByIdAndDelete(args.id).exec();
      if (!travel) {
        throw new GraphQLError(`No travel found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return travel;
    },
  },
};

export default deleteTravel;
