import { GraphQLError } from "graphql";
import { ClientModel, ClientModelType } from "../../../db/client/client.ts";

const addCard = {
  Mutation: {
    addCard: async (
      _: unknown,
      args: { id: string, number: string, cvv: string, expirity: string, money: number },
    ): Promise<ClientModelType> => {
      const client = await ClientModel.findByIdAndUpdate(
        args.id,
		{ $push: { cards:
			{ number: args.number, cvv: args.cvv, expirity: args.expirity, money: args.money }
		} },
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

export default addCard;
