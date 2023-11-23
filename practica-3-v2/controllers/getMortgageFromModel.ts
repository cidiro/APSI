import { MortgageModelType } from "../db/mortgage.ts";
import { ClientModel } from "../db/client.ts";
import { ManagerModel } from "../db/manager.ts";
import { Mortgage } from "../types.ts";

export const getMortgageFromModel = async (
  mortgage: MortgageModelType
): Promise<Mortgage> => {
  const { _id, amount, terms, terms_remaining, clientID, managerID } = mortgage;

  const client = await ClientModel.findById(clientID);
  if (!client) throw new Error("Manager not found");

  const manager = await ManagerModel.findById(managerID);
  if (!manager) throw new Error("Manager not found");

  return {
    id: _id.toString(),
    amount,
    terms,
    terms_remaining,
    client: {
      id: client._id.toString(),
      name: client.name,
      email: client.email,
      phone: client.phone,
      balance: client.balance,
    },
    manager: {
      id: manager._id.toString(),
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
    },
  };
};
