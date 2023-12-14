import { GraphQLError } from "graphql";
import { DriverModel, DriverModelType } from "../../../db/driver/driver.ts";

const updateDriver = {
  Mutation: {
    updateDriver: async (
      _: unknown,
      args: { id: string, name: string, email: string, username: string, travelIDs: string[] },
    ): Promise<DriverModelType> => {
      const driver = await DriverModel.findByIdAndUpdate(
        args.id,
        { name: args.name, email: args.email, username: args.username, travelIDs: args.travelIDs },
        { new: true, runValidators: true },
      ).exec();

      if (!driver) {
        throw new GraphQLError(`No driver found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return driver;
    },
  },
};

export default updateDriver;
