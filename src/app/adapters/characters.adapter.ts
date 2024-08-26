import { CharacterInfo } from "@app/models";

export const CharacterAdapter = (characterInfo: CharacterInfo) => {
  return characterInfo.results;
};
