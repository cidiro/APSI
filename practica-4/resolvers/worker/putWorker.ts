// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { WorkerModel, WorkerModelType } from "../../db/worker/worker.ts";

export const putWorker = async (
  req: Request<{ id: string }, {}, WorkerModelType>,
  res: Response<WorkerModelType | { error: unknown }>
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
    res.status(200).send(worker);
  } catch (error) {
    res.status(500).send(error);
  }
};
