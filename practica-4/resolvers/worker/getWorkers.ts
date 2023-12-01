// @deno-types="npm:@types/express@4"
import { Request, Response } from "express";
import { Worker } from "../../types.ts";
import { WorkerModel } from "../../db/worker/worker.ts";
import { getWorkerFromModel } from "../../controllers/getWorkerFromModel.ts";

export const getWorkers = async (
  _req: Request,
  res: Response<Worker[] | { error: unknown }>
) => {
  try {
    const workers = await WorkerModel.find({}).exec();
    const workersResponse: Worker[] = await Promise.all(
      workers.map((worker) => getWorkerFromModel(worker))
    );
    res.status(200).json(workersResponse).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
