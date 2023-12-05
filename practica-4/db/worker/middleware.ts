import { WorkerModelType } from "./worker.ts";
import { BusinessModel } from "../business/business.ts";
import { TaskModel } from "../task/task.ts";

export const workerPostSave = async function (doc: WorkerModelType) {
  try {
    // Update workerIDs in related business
    await BusinessModel.updateOne(
      { _id: doc.businessID },
      { $push: { workerIDs: doc._id } },
    );
    // Update workerID in related tasks
    await TaskModel.updateMany(
      { _id: { $in: doc.taskIDs } },
      { workerID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const workerPostUpdate = async function (doc: WorkerModelType) {
  try {
    // businessID got updated: update workerIDs in related business
    const business = await BusinessModel.findOne({
      workerIDs: { $elemMatch: { $eq: doc._id } },
    });
    if (business?._id !== doc.businessID) {
      await BusinessModel.updateOne(
        { _id: business?._id },
        { $pull: { workerIDs: doc._id } },
      );
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $push: { workerIDs: doc._id } },
      );
    }

    // taskIDs got updated: update workerID in related tasks
    const oldTasks = await TaskModel.find({ workerID: doc._id });
    const oldTaskIDs = oldTasks.map((task) => task._id);

    const taskIDsRemoved = oldTaskIDs.filter(
      (taskID) => !doc.taskIDs.includes(taskID),
    );
    const taskIDsAdded = doc.taskIDs.filter(
      (taskID) => !oldTaskIDs.includes(taskID),
    );

    await TaskModel.updateMany(
      { _id: { $in: taskIDsRemoved } },
      { workerID: null },
    );
    await TaskModel.updateMany(
      { _id: { $in: taskIDsAdded } },
      { workerID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const workerPostDelete = async function (doc: WorkerModelType) {
    try {
      // Update workerIDs in related business
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $pull: { workerIDs: doc._id } },
      );
      // Update workerID in related tasks
      await TaskModel.updateMany(
        { _id: { $in: doc.taskIDs } },
        { workerID: null },
      );
    } catch (_e) {
      console.log(_e);
    }
};
