import { TravelModel, TravelModelType } from "../../../db/travel/travel.ts";

const addTravel = {
  Mutation: {
    addTravel: async (
      _: unknown,
      args: { money: number, distance: number, date: string, status: string, clientID: string, driverID: string }
    ): Promise<TravelModelType> => {
      const travel = new TravelModel({
        money: args.money, distance: args.distance, date: args.date, status: args.status, clientID: args.clientID, driverID: args.driverID
      });

      await travel.save();
      return travel;
    },
  },
};

export default addTravel;
