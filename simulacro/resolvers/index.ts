import getCharacter from "./queries/getCharacter.ts";
import getCharacterByIds from "./queries/getCharacterByIds.ts";
import { Character } from "./entities/Character.ts";
import { Episode } from "./entities/Episode.ts";

const resolvers = {
  Query: {
    getCharacter,
    getCharacterByIds,
  },
  Character,
  Episode,
};

export default resolvers;
