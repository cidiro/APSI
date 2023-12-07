// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Worker } from "../../types.ts";
import { WorkerModel } from "../../db/worker/worker.ts";
import { getWorkerFromModel } from "../../controllers/getWorkerFromModel.ts";
import { BusinessModel } from "../../db/business/business.ts";

export const hireWorker = async (
  req: Request<{ id: string; workerID: string }>,
  res: Response<Worker | { error: unknown }>,
) => {
  const id = req.params.id;
  const workerID = req.params.workerID;

  try {
    const business = await BusinessModel.findById(id).exec();
    if (!business) {
      res.status(404).send({ error: "Business not found" });
      return;
    }

    const worker = await WorkerModel.findByIdAndUpdate(
      workerID,
      { businessID: id },
      { new: true, runValidators: false },
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
