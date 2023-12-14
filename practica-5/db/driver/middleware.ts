import { DriverModelType } from "./driver.ts";
import { TravelModel } from "../travel/travel.ts";


export const driverPostSave = async function (doc: DriverModelType) {
  try {
    // Update driverID in related travels
    await TravelModel.updateMany(
      { _id: { $in: doc.travelIDs } },
      { driverID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const driverPostUpdate = async function (doc: DriverModelType) {
  try {
    // travelIDs got updated: update driverID in related travels
    const oldTravels = await TravelModel.find({
      driverID: doc._id,
    });
    const oldTravelsID = oldTravels.map((travel) => travel._id);

    const travelIDsRemoved = oldTravelsID.filter(
      (travelID) => !doc.travelIDs.includes(travelID),
    );
    const travelIDsAdded = doc.travelIDs.filter(
      (travelID) => !oldTravelsID.includes(travelID),
    );

    await TravelModel.updateMany(
      { _id: { $in: travelIDsRemoved } },
      { driverID: null },
    );
    await TravelModel.updateMany(
      { _id: { $in: travelIDsAdded } },
      { driverID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const driverPostDelete = async function (doc: DriverModelType) {
  try {
    // Update driverID in related travels
    await TravelModel.updateMany(
      { _id: { $in: doc.travelIDs } },
      { driverID: null },
    );
  } catch (_e) {
    console.log(_e);
  }
};
