import { GraphQLError } from "graphql";
import { TravelModel, TravelModelType } from "../../../db/travel/travel.ts";

const getTravel = {
  Query: {
    getTravel: async (_: unknown, args: { id: string }): Promise<TravelModelType> => {
      const travel = await TravelModel.findById(args.id).exec();
      if (!travel) {
        throw new GraphQLError(`No travel found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return travel;
    },
  },
};

export default getTravel;
