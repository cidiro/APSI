import { ClientModelType } from "../../db/client/client.ts";
import { TravelModel, TravelModelType } from "../../db/travel/travel.ts";

export const Client = {
  travels: async (parent: ClientModelType): Promise<Array<TravelModelType>> => {
    const travels = await TravelModel.find({ _id: { $in: parent.travelIDs } });
    return travels;
  },
};
