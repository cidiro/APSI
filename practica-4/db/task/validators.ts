import mongoose from "mongoose";
import { WorkerModel } from "../worker/worker.ts";
import { BusinessModel } from "../business/business.ts";

// Validate that businessID exists in the database
const businessExists = async (businessID: mongoose.Types.ObjectId) => {
  try {
    const business = await BusinessModel.findById(businessID);
    return !!business;
  } catch (_e) {
    return false;
  }
};

// Validate that workerID exists in the database
const workerExists = async (workerID: mongoose.Types.ObjectId) => {
  try {
    const worker = await WorkerModel.findById(workerID);
    return !!worker;
  } catch (_e) {
    return false;
  }
}

export const validators = {
  businessExists,
  workerExists,
};
