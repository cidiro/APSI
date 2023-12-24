import mongoose from "mongoose";
import { TravelModelType } from "./travel.ts";
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
    const client = await ClientModel.findOne({ _id: clientID });
    return !client?.hasOngoingTravel;
  } catch (_e) {
    return false;
  }
};

// Validate that the last travel of the driver is not ongoing
const driverHasNoOngoingTravel = async (driverID: mongoose.Types.ObjectId) => {
  try {
    const driver = await DriverModel.findOne({ _id: driverID });
    return !driver?.hasOngoingTravel;
  } catch (_e) {
    return false;
  }
};

// Validate that the client has enough money to pay for the travel
const clientHasEnoughMoney = async (clientID: mongoose.Types.ObjectId, validatorProperties?: any) => {
  try {
    const client = await ClientModel.findOne({ _id: clientID });
    return client?.cards?.some((card) => card.money >= validatorProperties?.money);
  } catch (_e) {
    return false;
  }
};

export const validators = {
  clientExists,
  driverExists,
  clientHasNoOngoingTravel,
  driverHasNoOngoingTravel,
  clientHasEnoughMoney,
};
