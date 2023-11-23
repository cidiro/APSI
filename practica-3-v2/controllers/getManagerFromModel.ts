import { ManagerModelType } from "../db/manager.ts";
import { ClientModel, ClientModelType } from "../db/client.ts";
import { Manager } from "../types.ts";

export const getManagerFromModel = async (
  manager: ManagerModelType
): Promise<Manager> => {
  const { _id, name, email, phone, clientsID } = manager;

  const clients = await ClientModel.find({ _id: { $in: clientsID } });

  return {
    id: _id.toString(),
    name,
    email,
    phone,
    clients: clients.map((client: ClientModelType) => ({
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      balance: client.balance,
    })),
  };
};
