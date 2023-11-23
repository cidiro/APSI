// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";

import { Client } from "../types.ts";
import { ClientModel, ClientModelType } from "../db/client.ts";
import { getClientFromModel } from "../controllers/getClientFromModel.ts";

export const putClient = async (
  req: Request<{ id: string }, {}, ClientModelType>,
  res: Response<Client | { error: unknown }>
) => {
  const id = req.params.id;
  const { name, email, phone, balance, mortgagesID, managerID } = req.body;
  try {
    const client = await ClientModel.findByIdAndUpdate(
      id,
      { name, email, phone, balance, mortgagesID, managerID },
      { new: true, runValidators: true }
    );

    if (!client) {
      res.status(404).send({ error: "Client not found" });
      return;
    }
    const clientResponse: Client = await getClientFromModel(client);
    res.status(200).json(clientResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
