import { TaskModelType } from "./task.ts";
import { WorkerModel } from "../worker/worker.ts";
import { BusinessModel } from "../business/business.ts";


export const taskPostSave = async function (doc: TaskModelType) {
  try {
    // Update taskIDs in related worker
    await WorkerModel.updateOne(
      { _id: doc.workerID },
      { $push: { taskIDs: doc._id } },
    );
    // Update taskIDs in related business
    await BusinessModel.updateOne(
      { _id: doc.businessID },
      { $push: { taskIDs: doc._id } },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const taskPostUpdate = async function (doc: TaskModelType) {
  try {
    // workerID got updated: update taskIDs in related worker
    const worker = await WorkerModel.findOne({
      taskIDs: { $elemMatch: { $eq: doc._id } },
    });
    if (worker?._id !== doc.workerID) {
      await WorkerModel.updateOne(
        { _id: worker?._id },
        { $pull: { taskIDs: doc._id } },
      );
      await WorkerModel.updateOne(
        { _id: doc.workerID },
        { $push: { taskIDs: doc._id } },
      );
    }

    // businessID got updated: update taskIDs in related business
    const business = await BusinessModel.findOne({
      taskIDs: { $elemMatch: { $eq: doc._id } },
    });
    if (business?._id !== doc.businessID) {
      await BusinessModel.updateOne(
        { _id: business?._id },
        { $pull: { taskIDs: doc._id } },
      );
      await BusinessModel.updateOne(
        { _id: doc.businessID },
        { $push: { taskIDs: doc._id } },
      );
    }

    // state got updated: check if task is done
    if (doc.state === "CLOSED") {
      await taskPostDelete(doc);
      await doc.deleteOne();
    }
  } catch (_e) {
    console.log(_e);
  }
};

export const taskPostDelete = async function (doc: TaskModelType) {
  try {
    // Update taskIDs in related worker
    await WorkerModel.updateOne(
      { _id: doc.workerID },
      { $pull: { taskIDs: doc._id } },
    );
    // Update taskIDs in related business
    await BusinessModel.updateOne(
      { _id: doc.businessID },
      { $pull: { taskIDs: doc._id } },
    );
  } catch (_e) {
    console.log(_e);
  }
};
