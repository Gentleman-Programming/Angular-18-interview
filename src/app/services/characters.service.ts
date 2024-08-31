import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Character, CharacterInfo } from '../models';
import { CharacterAdapter } from '@app/adapters';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private readonly baseUrl: string =
    'https://rickandmortyapi.com/api/character';
  http = inject(HttpClient)

  getAllCharacters(): Observable<Character[]> {
    return this.http
      .get<CharacterInfo>(this.baseUrl)
      .pipe(map((result) => CharacterAdapter(result)));
  }

  getCharacterInformation(id: number): Observable<Character> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Character>(url);
  }

  removeCharacter(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((_error) => {
        console.log('error prevented for testing');
        return Promise.resolve();
      }),
    );
  }

  addCharacter(character: Character): Observable<Character> {
    const url = `${this.baseUrl}`;
    return this.http.post<Character>(url, { character }).pipe(
      catchError((_error) => {
        console.log('error prevented for testing');
        return Promise.resolve(character);
      }),
    );
  }

  updateCharacter(character: Character): Observable<Character> {
    const url = `${this.baseUrl}`;
    return this.http.put<Character>(url, { character }).pipe(
      catchError((_error) => {
        console.log('error prevented for testing');
        return Promise.resolve(character);
      }),
    );
  }
}
