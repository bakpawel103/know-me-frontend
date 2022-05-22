import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deck } from '../game-deck/game-deck.component';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DeckService {
  private BASE_SERVER = 'https://know-me-backend.herokuapp.com/api/v1/';

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  public getDecks(): Observable<any> {
    return this.httpClient.get<Deck[]>(`${this.BASE_SERVER}decks`, {
      headers: this.tokenService.getBearerHeader(),
    });
  }

  public getDeckById(id: number): Observable<any> {
    return this.httpClient.get<Deck>(`${this.BASE_SERVER}decks/${id}`, {
      headers: this.tokenService.getBearerHeader(),
    });
  }

  public getDeckBySecretId(secretId: String): Observable<any> {
    return this.httpClient.get<Deck>(
      `${this.BASE_SERVER}decks?secretId=${secretId}`,
      {
        headers: this.tokenService.getBearerHeader(),
      }
    );
  }

  public createDeck(deck: Deck): Observable<any> {
    return this.httpClient.post<Deck>(`${this.BASE_SERVER}decks`, deck, {
      headers: this.tokenService.getBearerHeader(),
    });
  }

  public updateDeck(id: number, deck: Deck): Observable<any> {
    return this.httpClient.put<Deck>(`${this.BASE_SERVER}decks/${id}`, deck, {
      headers: this.tokenService.getBearerHeader(),
    });
  }

  public deleteDeck(id: number): Observable<any> {
    return this.httpClient.delete(`${this.BASE_SERVER}decks/${id}`, {
      headers: this.tokenService.getBearerHeader(),
    });
  }
}
