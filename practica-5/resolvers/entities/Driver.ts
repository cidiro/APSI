import { DriverModelType } from "../../db/driver/driver.ts";
import { TravelModel, TravelModelType } from "../../db/travel/travel.ts";

export const Driver = {
  travels: async (parent: DriverModelType): Promise<Array<TravelModelType>> => {
    const travels = await TravelModel.find({ _id: { $in: parent.travelIDs } });
    return travels;
  },
};
