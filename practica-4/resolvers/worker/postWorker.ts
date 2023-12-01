// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Worker } from "../../types.ts";
import { WorkerModel, WorkerModelType } from "../../db/worker/worker.ts";
import { getWorkerFromModel } from "../../controllers/getWorkerFromModel.ts";

export const postWorker = async (
  req: Request<{}, {}, WorkerModelType>,
  res: Response<Worker | { error: unknown }>
) => {
  try {
    const { name, businessID, taskIDs } = req.body;
    const worker = new WorkerModel({
      name,
      businessID,
      taskIDs,
    });
    await worker.save();

    const workerResponse: Worker = await getWorkerFromModel(worker);

    res.status(201).json(workerResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
