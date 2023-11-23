// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";

import { Manager } from "../types.ts";
import { ManagerModel, ManagerModelType } from "../db/manager.ts";
import { getManagerFromModel } from "../controllers/getManagerFromModel.ts";

export const putManager = async (
  req: Request<{ id: string }, {}, ManagerModelType>,
  res: Response<Manager | { error: unknown }>
) => {
  const id = req.params.id;
  const { name, email, phone, clientsID } = req.body;
  try {
    const manager = await ManagerModel.findByIdAndUpdate(
      id,
      { name, email, phone, clientsID },
      { new: true, runValidators: true }
    );

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
