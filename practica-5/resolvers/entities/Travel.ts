import { TravelModelType } from "../../db/travel/travel.ts";
import { ClientModel, ClientModelType } from "../../db/client/client.ts";
import { DriverModel, DriverModelType } from "../../db/driver/driver.ts";

export const Travel = {
  client: async (parent: TravelModelType): Promise<ClientModelType | null> => {
    const client = await ClientModel.findById(parent.clientID);
    return client;
  },
  driver: async (parent: TravelModelType): Promise<DriverModelType | null> => {
    const driver = await DriverModel.findById(parent.driverID);
    return driver;
  },
};
