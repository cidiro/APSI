// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Manager } from "../types.ts";

import { ManagerModel } from "../db/manager.ts";
import { getManagerFromModel } from "../controllers/getManagerFromModel.ts";

export const getManagers = async (
  _req: Request,
  res: Response<Manager[] | { error: unknown }>
) => {
  try {
    const managers = await ManagerModel.find({}).exec();
    const managersResponse: Manager[] = await Promise.all(
      managers.map((manager: Manager) => getManagerFromModel(manager))
    );
    res.status(200).json(managersResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
