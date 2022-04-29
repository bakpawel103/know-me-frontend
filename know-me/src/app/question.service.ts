import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from './game-card/game-card.component';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private BASE_SERVER = "https://know-me-backend.herokuapp.com/api/v1/";

  constructor(private httpClient: HttpClient) { }

  public getQuestions() {
    return this.httpClient.get(`${this.BASE_SERVER}questions`);
  }
  
  public getQuestionById(id: number) {
    return this.httpClient.get(`${this.BASE_SERVER}questions/${id}`);
  }
  
  public createQuestion(question: Question) {
    return this.httpClient.post<Question>(`${this.BASE_SERVER}questions`, question);
  }
  
  public updateQuestion(id: number, question: Question) {
    return this.httpClient.put<Question>(`${this.BASE_SERVER}questions/${id}`, question);
  }
  
  public deleteQuestion(id: number) {
    return this.httpClient.delete(`${this.BASE_SERVER}questions/${id}`);
  }
}
