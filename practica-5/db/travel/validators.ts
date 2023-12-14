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

// Validate that the last travel of the client is not ongoing
const clientHasNoOngoingTravel = async (clientID: mongoose.Types.ObjectId) => {
  try {
    const client = ClientModel.findOne({ _id: clientID });
    const travelID = client?.travelIDs[-1];
    const travel = await TravelModel.findOne({
      _id: travelID,
    });
    return travel?.status !== "ONGOING";
  } catch (_e) {
    return false;
  }
};

// Validate that the last travel of the driver is not ongoing
const driverHasNoOngoingTravel = async (driverID: mongoose.Types.ObjectId) => {
  try {
    const client = DriverModel.findOne({ _id: driverID });
    const travelID = client?.travelIDs[-1];
    const travel = await TravelModel.findOne({
      _id: travelID,
    });
    return travel?.status !== "ONGOING";
  } catch (_e) {
    return false;
  }
};

export const validators = {
  clientExists,
  driverExists,
  clientHasNoOngoingTravel,
  driverHasNoOngoingTravel
};
