import { GraphQLError } from "graphql";
import { PetModel } from "../../db/pet/pet.ts";
import { Pet } from "../../types.ts";
import getPetFromModel from "../../controllers/getPetFromModel.ts";


const deletePet = {
  Mutation: {
    deletePet: async (_: unknown, args: { id: string }): Promise<Pet> => {
      const pet = await PetModel.findByIdAndDelete(args.id).exec();
      if (!pet) {
        throw new GraphQLError(`No pet found with id ${args.id}`, {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return getPetFromModel(pet);
    },
  },
};

export default deletePet;
