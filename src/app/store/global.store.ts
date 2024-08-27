import { inject, InjectionToken } from '@angular/core';
import { Character } from '@app/models';
import { CharactersService } from '@app/services';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { lastValueFrom } from 'rxjs';

type StoreState = {
  characters: Character[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: StoreState = {
  characters: [],
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
    getCharacter(characterId: number) {
      return store.characters().find((char) => char.id === characterId);
    },
    async addCharacter(character: Character): Promise<void> {
      try {
        patchState(store, { isLoading: true });

        await lastValueFrom(charactersService.addCharacter(character));

        patchState(store, ({ characters }) => ({
          characters: [...characters, character],
          isLoading: false,
        }));
      } catch (_error) {}
    },
    async removeCharacter(characterId: number): Promise<void> {
      try {
        patchState(store, { isLoading: true });

        await lastValueFrom(charactersService.removeCharacter(characterId));

        patchState(store, ({ characters }) => ({
          characters: characters.filter((char) => char.id !== characterId),
          isLoading: false,
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
          isLoading: false,
        }));
      } catch (_error) {}
    },
  })),
  withHooks({
    async onInit(store, charactersService = inject(CharactersService)) {
      patchState(store, { isLoading: true });

      const characters = await lastValueFrom(
        charactersService.getAllCharacters(),
      );

      patchState(store, { characters, isLoading: false });
    },
  }),
);
