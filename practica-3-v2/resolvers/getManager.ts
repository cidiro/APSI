// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Manager } from "../types.ts";

import { ManagerModel } from "../db/manager.ts";
import { getManagerFromModel } from "../controllers/getManagerFromModel.ts";

export const getManager = async (
  req: Request<{ id: string }>,
  res: Response<Manager | { error: unknown }>
) => {
  const id = req.params.id;
  try {
    const manager = await ManagerModel.findById(id).exec();
    if (!manager) {
      res.status(404).send({ error: "Manager not found" });
      return;
    }
    const managerResponse: Manager = await getManagerFromModel(manager);
    res.status(200).json(managerResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
