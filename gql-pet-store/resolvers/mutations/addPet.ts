import { GraphQLError } from "graphql";
import { PetModel } from "../../db/pet/pet.ts";
import { Pet } from "../../types.ts";
import getPetFromModel from "../../controllers/getPetFromModel.ts";


const addPet = {
  Mutation: {
    addPet: async (
      _: unknown,
      args: { id: string; name: string; breed: string },
    ): Promise<Pet> => {
      const petExists = await PetModel.findById(args.id).exec();
      if (petExists) {
        throw new GraphQLError(`Pet with id ${args.id} already exists`, {
          extensions: { code: "ALREADY_EXISTS" },
        });
      }

      const pet = new PetModel({
        name: args.name,
        breed: args.breed,
      });

      await pet.save();
      return getPetFromModel(pet);
    },
  },
};

export default addPet;
