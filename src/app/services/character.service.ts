import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CharacterAdapter } from '@app/adapters';
import { Character, CharacterInfo } from '@app/models';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/character';
  http = inject(HttpClient)

  getAllCharacters(): Observable<Character[]> {
    return this.http.get<CharacterInfo>(this.baseUrl).pipe(map(info => CharacterAdapter(info)))
  }

  addCharacter(character: Omit<Character, "id">): Observable<void> {
    return this.http.post<void>(this.baseUrl, { character }).pipe(
      catchError(() => {
        console.info("error prevented for testing")
        return Promise.resolve()
      })
    )
  }

  removeCharacter(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<void>(url).pipe(
      catchError(() => {
        console.info("error prevented for testing")
        return Promise.resolve()
      })
    )
  }

  updateCharacter(character: Character): Observable<void> {
    return this.http.put<void>(this.baseUrl, { character }).pipe(
      catchError(() => {
        console.info("error prevented for testing")
        return Promise.resolve()
      })
    )
  }
}
