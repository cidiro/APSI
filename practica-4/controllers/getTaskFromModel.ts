import { TaskModelType } from "../db/task/task.ts";
import { WorkerModel } from "../db/worker/worker.ts";
import { BusinessModel } from "../db/business/business.ts";
import { Task, Business, Worker } from "../types.ts";

export const getTaskFromModel = async (
  task: TaskModelType,
): Promise<Task> => {
  const { _id, name, state, workerID, businessID } = task;

  let business : Omit<Business, "workers" | "tasks"> | null = null;
  if (businessID) {
    const _business = await BusinessModel.findById(businessID);
    if (!_business) throw new Error("Business not found");

    business = {
      id: _business._id.toString(),
      name: _business.name,
    };
  }

  let worker : Omit<Worker, "business" | "tasks"> | null = null;
  if (workerID) {
    const _worker = await WorkerModel.findById(workerID);
    if (!_worker) throw new Error("Worker not found");

    worker = {
      id: _worker._id.toString(),
      name: _worker.name,
    };
  }

  return {
    id: _id.toString(),
    name,
    state,
    worker,
    business,
  };
};
