import { CharacterType, EpisodeType } from "../../types.ts";

export const Character = {
  episode: async (parent: CharacterType): Promise<EpisodeType[]> => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${parent.id}`,
    );
    const character = await response.json();
    const episodeURLs = character.episode;

    return await Promise.all(
      episodeURLs.map(async (url: string) => {
        const response = await fetch(url);
        const episode: EpisodeType = await response.json();
        return episode;
      }),
    );
  },
};
