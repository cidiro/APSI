// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Manager } from "../types.ts";

import { ManagerModel, ManagerModelType } from "../db/manager.ts";
import { getManagerFromModel } from "../controllers/getManagerFromModel.ts";

export const postManager = async (
  req: Request<{}, {}, ManagerModelType>,
  res: Response<Manager | { error: unknown }>
) => {
  try {
    const { name, email, phone, clientsID } = req.body;
    const manager = new ManagerModel({
      name,
      email,
      phone,
      clientsID,
    });
    await manager.save();

    const managerResponse: Manager = await getManagerFromModel(manager);

    res.status(201).json(managerResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
