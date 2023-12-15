import { GraphQLError } from "graphql";
import { CharacterType } from "../../types.ts";

const getCharacterByIds = async (_: unknown, args: { ids: string[] }): Promise<CharacterType[]> => {
  return await Promise.all(args.ids.map(async (id) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    if (!response.ok)
      throw new GraphQLError("Error fetching character");

    const character: CharacterType = await response.json();
    return character;
  }));
}

export default getCharacterByIds;
