import { CharacterType, EpisodeType } from "../../types.ts";

export const Episode = {
  characters: async (parent: EpisodeType): Promise<CharacterType[]> => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/episode/${parent.id}`,
    );
    const episode = await response.json();
    const characterURLs = episode.characters;

    return await Promise.all(
      characterURLs.map(async (url: string) => {
        const response = await fetch(url);
        const character: CharacterType = await response.json();
        return character;
      }),
    );
  },
};