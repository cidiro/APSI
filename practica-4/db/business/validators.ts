import mongoose from "mongoose";
import { WorkerModel } from "../worker/worker.ts";
import { TaskModel } from "../task/task.ts";

// Validate that all workerIDs exist in the database
const workersExist = async (workerIDs: mongoose.Types.ObjectId[]) => {
  try {
    const workers = await WorkerModel.find({ _id: { $in: workerIDs } });
    return workers.length === workerIDs.length;
  } catch (_e) {
    return false;
  }
};

// Validate that none of the workers have a business assigned
const workersHaveNoBusiness = async (
  workerIDs: mongoose.Types.ObjectId[],
) => {
  try {
    const workers = await WorkerModel.find({ _id: { $in: workerIDs } });
    return !(workers.some((worker) => worker.businessID));
  } catch (_e) {
    return false;
  }
};

// Validate that all taskIDs exist in the database
const tasksExist = async (taskIDs: mongoose.Types.ObjectId[]) => {
  try {
    const tasks = await TaskModel.find({ _id: { $in: taskIDs } });
    return tasks.length === taskIDs.length;
  } catch (_e) {
    return false;
  }
};

// Validate that none of the tasks have a business assigned
const tasksHaveNoBusiness = async (
  taskIDs: mongoose.Types.ObjectId[],
) => {
  try {
    const tasks = await TaskModel.find({ _id: { $in: taskIDs } });
    return !(tasks.some((task) => task.businessID));
  } catch (_e) {
    return false;
  }
};

export const validators = {
  workersExist,
  workersHaveNoBusiness,
  tasksExist,
  tasksHaveNoBusiness,
};
