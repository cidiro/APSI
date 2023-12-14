import mongoose from "mongoose";
import { ClientModel } from "../client/client.ts";
import { DriverModel } from "../driver/driver.ts";

// Validate that clientID exists in the database
const clientExists = async (clientID: mongoose.Types.ObjectId) => {
  try {
    const client = await ClientModel.findById(clientID);
    return !!client;
  } catch (_e) {
    return false;
  }
};

// Validate that driverID exists in the database
const driverExists = async (driverID: mongoose.Types.ObjectId) => {
  try {
    const driver = await DriverModel.findById(driverID);
    return !!driver;
  } catch (_e) {
    return false;
  }
};

// Validate that the person (client or driver) has no travel with ongoing status
const personHasNoOngoingTravel = async (personID: mongoose.Types.ObjectId) => {
  // VALIDATOR NOT IMPLEMENTED
  return false;
};

export const validators = {
  clientExists,
  driverExists,
};
