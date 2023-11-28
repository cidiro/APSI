import { PetModel } from "../../db/pet/pet.ts";
import { Pet } from "../../types.ts";
import getPetFromModel from "../../controllers/getPetFromModel.ts";


const filterPets = {
  Query: {
    filterPets: async (_: unknown, args: { breed: string }): Promise<Pet[]> => {
      const pets = await PetModel.find({ breed: args.breed }).exec();
      return pets.map(getPetFromModel);
    },
  },
};

export default filterPets;
