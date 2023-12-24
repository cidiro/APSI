import mongoose from "mongoose";
import { TravelModel } from "../travel/travel.ts";

// Validate that client's cards are valid
const cardsAreValid = (cards: any[]) => {
  return cards.every((card) => {
    return (
      card.number.length === 16 &&
      card.cvv.length === 3 &&
      /^\d{2}\/\d{4}$/.test(card.expirity) &&
      card.money >= 0
    );
  });
};

// Validate that travelIDs exists in the database
const travelsExist = async (travelIDs: mongoose.Types.ObjectId[]) => {
  try {
    const travels = await TravelModel.find({ _id: { $in: travelIDs } });
    return travels.length === travelIDs.length;
  } catch (_e) {
    return false;
  }
};

// Validate that the client has no more than 1 ongoing travel
const onlyOneTravelIsOngoing = async (travelIDs: mongoose.Types.ObjectId[]) => {
  try {
    const travels = await TravelModel.find({ _id: { $in: travelIDs } });
    return travels.filter((travel) => travel.status === "ONGOING").length <= 1;
  } catch (_e) {
    return false;
  }
};

export const validators = {
  cardsAreValid,
  travelsExist,
  onlyOneTravelIsOngoing,
};
