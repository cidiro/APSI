import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../../db/client/client.ts";

const getClient = {
  Query: {
    getClient: async (_: unknown, args: { id: string }): Promise<ClientModelType> => {
      const client = await ClientModel.findById(args.id).exec();
      if (!client) {
        throw new GraphQLError(`No client found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return client;
    },
  },
};

export default getClient;
