import mongoose from "mongoose";
import { TravelModel } from "../travel/travel.ts";

// Validate that travelIDs exists in the database
const travelsExist = async (travelIDs: mongoose.Types.ObjectId[]) => {
  try {
    const travels = await TravelModel.find({ _id: { $in: travelIDs } });
    return travels.length === travelIDs.length;
  } catch (_e) {
    return false;
  }
};

// Validate that the driver has no more than 1 ongoing travel
const onlyOneTravelIsOngoing = async (travelIDs: mongoose.Types.ObjectId[]) => {
  try {
    const travels = await TravelModel.find({ _id: { $in: travelIDs } });
    return travels.filter((travel) => travel.status === "ONGOING").length <= 1;
  } catch (_e) {
    return false;
  }
};

export const validators = {
  travelsExist,
  onlyOneTravelIsOngoing,
};
