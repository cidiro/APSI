import { TravelModel, TravelModelType } from "../../../db/travel/travel.ts";

const getTravels = {
  Query: {
    getTravels: async (): Promise<TravelModelType[]> => {
      const travels = await TravelModel.find({}).exec();
      return travels;
    },
  },
};

export default getTravels;
