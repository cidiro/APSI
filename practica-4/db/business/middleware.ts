import { BusinessModelType } from "./business.ts";
import { TaskModel } from "../task/task.ts";
import { WorkerModel } from "../worker/worker.ts";

export const businessPostSave = async function (doc: BusinessModelType) {
  try {
    // Update businessID in related workers
    await WorkerModel.updateMany(
      { _id: { $in: doc.workerIDs } },
      { businessID: doc._id },
    );
    // Update businessID in related tasks
    await TaskModel.updateMany(
      { _id: { $in: doc.taskIDs } },
      { businessID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const businessPostUpdate = async function (doc: BusinessModelType) {
  try {
    // workerIDs got updated: update businessID in related workers
    const oldWorkers = await WorkerModel.find({
      businessID: doc._id,
    });
    const oldWorkerIDs = oldWorkers.map((worker) => worker._id);

    const workerIDsRemoved = oldWorkerIDs.filter(
      (workerID) => !doc.workerIDs.includes(workerID),
    );
    const workerIDsAdded = doc.workerIDs.filter(
      (workerID) => !oldWorkerIDs.includes(workerID),
    );

    await WorkerModel.updateMany(
      { _id: { $in: workerIDsRemoved } },
      { businessID: null },
    );
    await WorkerModel.updateMany(
      { _id: { $in: workerIDsAdded } },
      { businessID: doc._id },
    );

    // taskIDs got updated: update businessID in related tasks
    const oldTasks = await TaskModel.find({ businessID: doc._id });
    const oldTaskIDs = oldTasks.map((task) => task._id);

    const taskIDsRemoved = oldTaskIDs.filter(
      (taskID) => !doc.taskIDs.includes(taskID),
    );
    const taskIDsAdded = doc.taskIDs.filter(
      (taskID) => !oldTaskIDs.includes(taskID),
    );

    await TaskModel.updateMany(
      { _id: { $in: taskIDsRemoved } },
      { businessID: null },
    );
    await TaskModel.updateMany(
      { _id: { $in: taskIDsAdded } },
      { businessID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
}

export const businessPostDelete = async function (doc: BusinessModelType) {
  try {
    // Update businessID in related workers
    await WorkerModel.updateMany(
      { _id: { $in: doc.workerIDs } },
      { businessID: null },
    );
    // Update businessID in related tasks
    await TaskModel.updateMany(
      { _id: { $in: doc.taskIDs } },
      { businessID: null },
    );
  } catch (_e) {
    console.log(_e);
  }
};
