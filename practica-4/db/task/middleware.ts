import { WorkerModel } from "../worker/worker.ts";
import { BusinessModel } from "../business/business.ts";
import { TaskModelType } from "./task.ts";

export const taskPostSave = async function (doc: TaskModelType) {
  if (doc.workerIDs.length) {
    try {
      await WorkerModel.updateMany(
        { _id: { $in: doc.workerIDs } },
        { $push: { taskIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }

  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $push: { taskIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};

export const taskPostUpdate = async function (doc: TaskModelType) {
  console.log("taskPostUpdate");
  try {
    // Update workers
    const oldWorkers = await WorkerModel.find({
      taskIDs: { $elemMatch: { $eq: doc._id } },
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
      { $pull: { taskIDs: doc._id } },
    );
    await WorkerModel.updateMany(
      { _id: { $in: workerIDsAdded } },
      { $push: { taskIDs: doc._id } },
    );

    // Update business
    const business = await BusinessModel.findOne({
      taskIDs: { $elemMatch: { $eq: doc._id } },
    });

    if (business?._id !== doc.businessID) {
      console.log("business changed !!");
      await BusinessModel.updateOne(
        { _id: business?._id },
        { $pull: { taskIDs: doc._id } },
      );
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $push: { taskIDs: doc._id } },
      );
    }
  } catch (_e) {
    console.log(_e);
  }
};

export const taskPostDelete = async function (doc: TaskModelType) {
  if (doc.workerIDs.length) {
    try {
      await WorkerModel.updateMany(
        { _id: { $in: doc.workerIDs } },
        { $pull: { taskIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }

  if (doc.businessID) {
    try {
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $pull: { taskIDs: doc._id } },
      );
    } catch (_e) {
      console.log(_e);
    }
  }
};
