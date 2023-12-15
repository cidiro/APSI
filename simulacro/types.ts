export type CharacterType = {
  id: string;
  name: string;
  episode: Array<Omit<EpisodeType, "characters">>;
};

export type EpisodeType = {
  id: string;
  name: string;
  characters: Array<Omit<CharacterType, "episode">>;
};
