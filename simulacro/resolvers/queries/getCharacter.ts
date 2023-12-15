import { GraphQLError } from "graphql";
import { CharacterType } from "../../types.ts";

const getCharacter = async (_: unknown, args: { id: string }): Promise<CharacterType> => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${args.id}`
  );

  if (!response.ok)
    throw new GraphQLError("Error fetching character");

  const character: CharacterType = await response.json();
  return character;
}

export default getCharacter;
