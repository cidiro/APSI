// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Client } from "../types.ts";

import { ClientModel } from "../db/client.ts";
import { getClientFromModel } from "../controllers/getClientFromModel.ts";

export const getClient = async (
  req: Request<{ id: string }>,
  res: Response<Client | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const client = await ClientModel.findById(id).exec();
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
