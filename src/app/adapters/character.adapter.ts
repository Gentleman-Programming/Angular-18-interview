import { Character, CharacterInfo } from "@app/models";

export const CharacterAdapter = (characterInfo: CharacterInfo): Character[] => ([...characterInfo.results])
