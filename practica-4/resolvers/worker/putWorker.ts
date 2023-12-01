// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Worker } from "../../types.ts";
import { WorkerModel, WorkerModelType } from "../../db/worker/worker.ts";
import { getWorkerFromModel } from "../../controllers/getWorkerFromModel.ts";

export const putWorker = async (
  req: Request<{ id: string }, {}, WorkerModelType>,
  res: Response<Worker | { error: unknown }>
) => {
  const id = req.params.id;
  const { name, businessID, taskIDs } = req.body;
  try {
    const worker = await WorkerModel.findByIdAndUpdate(
      id,
      { name, businessID, taskIDs },
      { new: true, runValidators: true },
    );

    if (!worker) {
      res.status(404).send({ error: "Worker not found" });
      return;
    }
    const workerResponse: Worker = await getWorkerFromModel(worker);
    res.status(200).json(workerResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
