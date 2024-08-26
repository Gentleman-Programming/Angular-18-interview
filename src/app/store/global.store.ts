import { inject, InjectionToken } from '@angular/core';
import { Character, emptyCharacter } from '@app/models';
import { CharactersService } from '@app/services';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';

type StoreState = {
  characters: Character[];
  characterToEdit: Character;
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: StoreState = {
  characters: [],
  characterToEdit: emptyCharacter,
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

const STORE_STATE = new InjectionToken<StoreState>('CharacterState', {
  factory: () => initialState,
});

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withMethods((store, charactersService = inject(CharactersService)) => ({
    async loadCharacters(): Promise<void> {
      patchState(store, { isLoading: true });

      const characters = await lastValueFrom(
        charactersService.getAllCharacters(),
      );

      patchState(store, { characters, isLoading: false });
    },
    editCharacter(characterToEdit: Character): void {
      patchState(store, { characterToEdit });
    },
    async addCharacter(character: Character): Promise<void> {
      try {
        patchState(store, { isLoading: true });

        await lastValueFrom(charactersService.addCharacter(character));

        patchState(store, ({ characters }) => ({
          characters: [...characters, character],
        }));
      } catch (_error) {}
    },
    async removeCharacter(characterId: number): Promise<void> {
      try {
        patchState(store, { isLoading: true });

        await lastValueFrom(charactersService.removeCharacter(characterId));

        patchState(store, ({ characters }) => ({
          characters: characters.filter((char) => char.id !== characterId),
        }));
      } catch (_error) {}
    },
    async updateCharacter(updatedCharacter: Character): Promise<void> {
      // call api to remove a character and if success, remove it from the store
      try {
        patchState(store, { isLoading: true });

        await lastValueFrom(
          charactersService.updateCharacter(updatedCharacter),
        );

        patchState(store, ({ characters }) => ({
          characters: characters.map((char) =>
            char.id === updatedCharacter.id ? updatedCharacter : char,
          ),
        }));
      } catch (_error) {}
    },
  })),
);
