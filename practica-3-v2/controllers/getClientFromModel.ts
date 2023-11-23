import { ClientModelType } from "../db/client.ts";
import { MortgageModel, MortgageModelType } from "../db/mortgage.ts";
import { ManagerModel } from "../db/manager.ts";
import { Client } from "../types.ts";

export const getClientFromModel = async (
  client: ClientModelType
): Promise<Client> => {
  const { _id, name, email, phone, balance, mortgagesID, managerID } = client;

  const mortgages = await MortgageModel.find({ _id: { $in: mortgagesID } });

  const manager = await ManagerModel.findById(managerID);
  if (!manager) throw new Error("Manager not found");

  return {
    id: _id.toString(),
    name,
    email,
    phone,
    balance,
    mortgages: mortgages.map((mortgage: MortgageModelType) => ({
      id: mortgage._id.toString(),
      amount: mortgage.amount,
      terms: mortgage.terms,
      terms_remaining: mortgage.terms_remaining,
    })),
    manager: {
      id: manager._id.toString(),
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
    },
  };
};
