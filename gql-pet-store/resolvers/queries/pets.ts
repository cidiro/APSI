import { PetModel } from "../../db/pet.ts";
import { Pet } from "../../types.ts";
import getPetFromModel from "../../controllers/getPetFromModel.ts";


const pets = {
  Query: {
    pets: async (): Promise<Pet[]> => {
      const pets = await PetModel.find({}).exec();
      return pets.map(getPetFromModel);
    },
  },
};

export default pets;
