import { GraphQLError } from "graphql";
import { TravelModel, TravelModelType } from "../../../db/travel/travel.ts";

const updateTravel = {
  Mutation: {
    updateTravel: async (
      _: unknown,
      args: { id: string, money: number, distance: number, date: string, status: string, clientID: string, driverID: string },
    ): Promise<TravelModelType> => {
      const travel = await TravelModel.findByIdAndUpdate(
        args.id,
        { money: args.money, distance: args.distance, date: args.date, status: args.status, clientID: args.clientID, driverID: args.driverID },
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

export default updateTravel;
