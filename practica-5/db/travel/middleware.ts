import { TravelModelType } from "./travel.ts";
import { ClientModel } from "../client/client.ts";
import { DriverModel } from "../driver/driver.ts";


export const travelPostSave = async function (doc: TravelModelType) {
  try {
    // Update travelIDs in related client
    await ClientModel.updateOne(
      { _id: doc.clientID },
      { $push: { travelIDs: doc._id } },
    );

    // Update travelIDs in related driver
    await DriverModel.updateOne(
      { _id: doc.driverID },
      { $push: { travelIDs: doc._id } },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const travelPostUpdate = async function (doc: TravelModelType) {
  try {
    // clientID got updated: update travelIDs in related client
    const client = await ClientModel.findOne({
      travelIDs: { $elemMatch: { $eq: doc._id } },
    });

    if (client?._id !== doc.clientID) {
      await ClientModel.updateOne(
        { _id: client?._id },
        { $pull: { travelIDs: doc._id } },
      );
      await ClientModel.updateOne(
        { _id: doc.clientID },
        { $push: { travelIDs: doc._id } },
      );
    }

    // driverID got updated: update travelIDs in related driver
    const driver = await DriverModel.findOne({
      travelIDs: { $elemMatch: { $eq: doc._id } },
    });

    if (driver?._id !== doc.driverID) {
      await DriverModel.updateOne(
        { _id: driver?._id },
        { $pull: { travelIDs: doc._id } },
      );
      await DriverModel.updateOne(
        { _id: doc.driverID },
        { $push: { travelIDs: doc._id } },
      );
    }
  } catch (_e) {
    console.log(_e);
  }
};

export const travelPostDelete = async function (doc: TravelModelType) {
  try {
    // Update travelIDs in related client
    await ClientModel.updateOne(
      { _id: doc.clientID },
      { $pull: { travelIDs: doc._id } },
    );

    // Update travelIDs in related driver
    await DriverModel.updateOne(
      { _id: doc.driverID },
      { $pull: { travelIDs: doc._id } },
    );
  } catch (_e) {
    console.log(_e);
  }
};
