import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../game-card/game-card.component';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private BASE_SERVER = "https://know-me-backend.herokuapp.com/api/v1/";

  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService) { }

  public getQuestions(): Observable<any> {
    return this.httpClient.get(`${this.BASE_SERVER}questions`, { headers: this.tokenService.getBearerHeader() });
  }
  
  public getQuestionById(id: number): Observable<any> {
    return this.httpClient.get(`${this.BASE_SERVER}questions/${id}`, { headers: this.tokenService.getBearerHeader() });
  }
  
  public createQuestion(question: Question): Observable<any> {
    return this.httpClient.post<Question>(`${this.BASE_SERVER}questions`, question, { headers: this.tokenService.getBearerHeader() });
  }
  
  public updateQuestion(id: number, question: Question): Observable<any> {
    return this.httpClient.put<Question>(`${this.BASE_SERVER}questions/${id}`, question, { headers: this.tokenService.getBearerHeader() });
  }
  
  public deleteQuestion(id: number): Observable<any> {
    return this.httpClient.delete(`${this.BASE_SERVER}questions/${id}`, { headers: this.tokenService.getBearerHeader() });
  }
}
