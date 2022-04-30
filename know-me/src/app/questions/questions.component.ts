import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Question } from '../game-card/game-card.component';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];

  snackbarConfig: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'end'
  };
  
  constructor(private questionService : QuestionService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe(response => {
      this.questions = response as Question[];
      this.questions = this.questions.sort((a, b) => a.id - b.id);
    });
  }

  cardClicked(index: number): void {
    const question = this.questions[index];

    if (question.answered === false)   {
      question.answered = true;
    } else if (question.answered === true) {
      question.answered = false;
    }

    this.questionService.updateQuestion(question.id, question).subscribe(response => {
      setTimeout(() => {
        this.questions[index] = response;
        this.questions = this.questions.sort((a, b) => a.id - b.id);
      }, 400);
      
      if(this.questions.filter(question => question.answered).length == this.questions.length) {
        this.snackBar.open('🥰 Brawo! Oprowiedzieliśmy na wszystkie pytania! 🥰', undefined, this.snackbarConfig);
      }
    })
  }
}
