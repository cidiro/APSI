import { GraphQLError } from "graphql";
import { PetModel } from "../../db/pet/pet.ts";
import { Pet } from "../../types.ts";
import getPetFromModel from "../../controllers/getPetFromModel.ts";


const updatePet = {
  Mutation: {
    updatePet: async (
      _: unknown,
      args: { id: string; name: string; breed: string },
    ): Promise<Pet> => {
      const pet = await PetModel.findByIdAndUpdate(
        args.id,
        { name: args.name, breed: args.breed },
        { new: true },
      ).exec();

      if (!pet) {
        throw new GraphQLError(`No pet found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return getPetFromModel(pet);
    },
  },
};

export default updatePet;
