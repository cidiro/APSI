import { ClientModel, ClientModelType } from "../../../db/client/client.ts";

const getClients = {
  Query: {
    getClients: async (): Promise<ClientModelType[]> => {
      const clients = await ClientModel.find({}).exec();
      return clients;
    },
  },
};

export default getClients;
