import pet from "./pet.ts";
import pets from "./pets.ts";
import filterPets from "./filterPets.ts";


const queryResolvers = {
  Query: {
	...pets.Query,
	...filterPets.Query,
	...pet.Query,
  },
};

export default queryResolvers;
