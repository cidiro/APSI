import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../../db/client/client.ts";

const updateClient = {
  Mutation: {
    updateClient: async (
      _: unknown,
      args: { id: string, name: string, email: string, cards: string, travelIDs: string[] },
    ): Promise<ClientModelType> => {
      const client = await ClientModel.findByIdAndUpdate(
        args.id,
        { name: args.name, email: args.email, cards: args.cards, travelIDs: args.travelIDs },
        { new: true, runValidators: true },
      ).exec();

      if (!client) {
        throw new GraphQLError(`No client found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return client;
    },
  },
};

export default updateClient;
