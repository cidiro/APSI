// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";

import { ManagerModel, ManagerModelType } from "../db/manager.ts";

export const deleteManager = async (
  req: Request<{ id: string }, {}>,
  res: Response<string | { error: unknown }>
) => {
  const id = req.params.id;
  const manager = await ManagerModel.findByIdAndDelete(id).exec();
  if (!manager) {
    res.status(404).send({ error: "Manager not found" });
    return;
  }
  res.status(200).send("Manager deleted");
};
