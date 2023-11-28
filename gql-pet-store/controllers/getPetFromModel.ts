import { PetModelType } from "../db/pet/pet.ts";
import { Pet } from "../types.ts";


const getPetFromModel = (
  pet: PetModelType
): Pet => {
  const { _id, name, breed } = pet;

  return {
    id: _id.toString(),
    name,
    breed,
  };
};

export default getPetFromModel;
