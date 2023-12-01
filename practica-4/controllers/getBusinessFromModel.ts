import { BusinessModelType } from "../db/business/business.ts";
import { WorkerModel } from "../db/worker/worker.ts";
import { TaskModel } from "../db/task/task.ts";
import { Business } from "../types.ts";

export const getBusinessFromModel = async (
  business: BusinessModelType,
): Promise<Business> => {
  const { _id, name, workerIDs, taskIDs } = business;

  const workers = await WorkerModel.find({ _id: { $in: workerIDs } });
  const tasks = await TaskModel.find({ _id: { $in: taskIDs } });

  return {
    id: _id.toString(),
    name,
    workers: workers.map((worker) => ({
      id: worker._id.toString(),
      name: worker.name,
    })),
    tasks: tasks.map((task) => ({
      id: task._id.toString(),
      name: task.name,
      state: task.state,
    })),
  };
};
