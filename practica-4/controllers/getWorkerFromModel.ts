import { WorkerModelType } from "../db/worker/worker.ts";
import { TaskModel } from "../db/task/task.ts";
import { BusinessModel } from "../db/business/business.ts";
import { Worker, Business } from "../types.ts";

export const getWorkerFromModel = async (
  worker: WorkerModelType,
): Promise<Worker> => {
  const { _id, name, businessID, taskIDs } = worker;

  let business : Omit<Business, "workers" | "tasks"> | null = null;
  if (businessID) {
    const _business = await BusinessModel.findById(businessID);
    if (!_business) throw new Error("Business not found");

    business = {
      id: _business._id.toString(),
      name: _business.name,
    };
  }

  const tasks = await TaskModel.find({ _id: { $in: taskIDs } });

  return {
    id: _id.toString(),
    name,
    business,
    tasks: tasks.map((task) => ({
      id: task._id.toString(),
      name: task.name,
      state: task.state,
    })),
  };
};
