import { DriverModel, DriverModelType } from "../../../db/driver/driver.ts";

const addDriver = {
  Mutation: {
    addDriver: async (
      _: unknown,
      args: { name: string, email: string, username: string, travelIDs: string[] }
    ): Promise<DriverModelType> => {
      const driver = new DriverModel({
        name: args.name, email: args.email, username: args.username, travelIDs: args.travelIDs
      });

      await driver.save();
      return driver;
    },
  },
};

export default addDriver;
