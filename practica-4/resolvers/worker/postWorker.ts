// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { WorkerModel, WorkerModelType } from "../../db/worker/worker.ts";

export const postWorker = async (
  req: Request<{}, {}, WorkerModelType>,
  res: Response<WorkerModelType | { error: unknown }>
) => {
  try {
    const { name, businessID, taskIDs } = req.body;
    const worker = new WorkerModel({
      name,
      businessID,
      taskIDs,
    });
    await worker.save();

    res.status(201).send(worker);
  } catch (error) {
    res.status(500).send(error);
  }
};
