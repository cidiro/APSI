import { PetModelType } from "../db/pet.ts";
import { Pet } from "../types.ts";


export const getPetFromModel = (
  pet: PetModelType
): Pet => {
  const { _id, name, breed } = pet;

  return {
    id: _id.toString(),
    name,
    breed,
  };
};
