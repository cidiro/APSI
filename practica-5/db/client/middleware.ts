import { ClientModelType } from "./client.ts";
import { TravelModel } from "../travel/travel.ts";


export const clientPostSave = async function (doc: ClientModelType) {
  try {
    // Update clientID in related travels
    await TravelModel.updateMany(
      { _id: { $in: doc.travelIDs } },
      { clientID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const clientPostUpdate = async function (doc: ClientModelType) {
  try {
    // travelIDs got updated: update clientID in related travels
    const oldTravels = await TravelModel.find({
      clientID: doc._id,
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
      { clientID: null },
    );
    await TravelModel.updateMany(
      { _id: { $in: travelIDsAdded } },
      { clientID: doc._id },
    );
  } catch (_e) {
    console.log(_e);
  }
};

export const clientPostDelete = async function (doc: ClientModelType) {
  try {
    // Update clientID in related travels
    await TravelModel.updateMany(
      { _id: { $in: doc.travelIDs } },
      { clientID: null },
    );
  } catch (_e) {
    console.log(_e);
  }
};
