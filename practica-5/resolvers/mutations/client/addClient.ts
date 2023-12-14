import { ClientModel, ClientModelType } from "../../../db/client/client.ts";

const addClient = {
  Mutation: {
    addClient: async (
      _: unknown,
      args: { name: string, email: string, cards: string, travelIDs: string[] }
    ): Promise<ClientModelType> => {
      const client = new ClientModel({
        name: args.name, email: args.email, cards: args.cards, travelIDs: args.travelIDs
      });

      await client.save();
      return client;
    },
  },
};

export default addClient;
