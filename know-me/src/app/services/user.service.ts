import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'https://know-me-backend.herokuapp.com/api/v1/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) {}

  public getDecks(id: number): Observable<any> {
    return this.http.get(`${API_URL}users/${id}/decks`, {
      headers: this.tokenService.getBearerHeader(),
    });
  }

  public addUserDeck(userId: number, secretId: String): Observable<any> {
    return this.http.put(`${API_URL}users/${userId}/decks`, secretId, {
      headers: this.tokenService.getBearerHeader(),
    });
  }

  public deleteUserDeck(userId: number, secretId: String): Observable<any> {
    return this.http.delete(`${API_URL}users/${userId}/decks`, {
      headers: this.tokenService.getBearerHeader(),
      body: secretId,
    });
  }
}
