import { GraphQLError } from "graphql";
import { DriverModel, DriverModelType } from "../../../db/driver/driver.ts";

const getDriver = {
  Query: {
    getDriver: async (_: unknown, args: { id: string }): Promise<DriverModelType> => {
      const driver = await DriverModel.findById(args.id).exec();
      if (!driver) {
        throw new GraphQLError(`No driver found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return driver;
    },
  },
};

export default getDriver;
