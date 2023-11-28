import addPet from "./addPet.ts";
import updatePet from "./updatePet.ts";
import deletePet from "./deletePet.ts";


const mutationResolvers = {
  Mutation: {
    ...addPet.Mutation,
    ...deletePet.Mutation,
    ...updatePet.Mutation,
  },
};

export default mutationResolvers;
