import mongoose from "mongoose";
import { BusinessModel } from "../business/business.ts";
import { TaskModel } from "../task/task.ts";

// Validate that businessID exists in the database
const businessExists = async (businessID: mongoose.Types.ObjectId) => {
  try {
    const business = await BusinessModel.findById(businessID);
    return !!business;
  } catch (_e) {
    return false;
  }
};

// Validate that the worker has no more than 10 tasks
const tasksAreNoMoreThanTen = (
  taskIDs: mongoose.Types.ObjectId[],
) => {
  return taskIDs.length <= 10;
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

// Validate that none of the tasks have a worker assigned
const tasksHaveNoWorker = async (
  taskIDs: mongoose.Types.ObjectId[],
) => {
  try {
    const tasks = await TaskModel.find({ _id: { $in: taskIDs } });
    return !(tasks.some((task) => task.workerID));
  } catch (_e) {
    return false;
  }
};

export const validators = {
  businessExists,
  tasksAreNoMoreThanTen,
  tasksExist,
  tasksHaveNoWorker,
};
