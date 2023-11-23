// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Client } from "../types.ts";

import { ClientModel } from "../db/client.ts";
import { getClientFromModel } from "../controllers/getClientFromModel.ts";

export const getClients = async (
  _req: Request,
  res: Response<Client[] | { error: unknown }>
) => {
  try {
    const clients = await ClientModel.find({}).exec();
    const clientsResponse: Client[] = await Promise.all(
      clients.map((client: Client) => getClientFromModel(client))
    );
    res.status(200).json(clientsResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
