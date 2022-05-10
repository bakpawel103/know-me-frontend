import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Question } from '../game-card/game-card.component';
import { QuestionService } from '../services/question.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  questions: Question[] = [];

  snackbarConfig: MatSnackBarConfig = {
    duration: 2000,
    verticalPosition: 'top',
    horizontalPosition: 'end',
  };

  gridColumns = 6;

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 6 ? 5 : 6;
  }

  constructor(
    private questionService: QuestionService,
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/signin']);
      return;
    }

    this.questionService.getQuestions().subscribe((response) => {
      this.questions = response as Question[];
      this.questions = this.questions.sort((a, b) => a.id - b.id);
    });
  }

  cardClicked(index: number): void {
    const question = this.questions[index];

    if (question.answered === false) {
      question.answered = true;
    } else if (question.answered === true) {
      question.answered = false;
    }

    this.questionService
      .updateQuestion(question.id, question)
      .subscribe((response) => {
        setTimeout(() => {
          this.questions[index] = response;
          this.questions = this.questions.sort((a, b) => a.id - b.id);
        }, 400);

        if (
          this.questions.filter((question) => question.answered).length ==
          this.questions.length
        ) {
          this.snackBar.open(
            '🥰 Brawo! Odpowiedzieliśmy na wszystkie pytania! 🥰',
            undefined,
            this.snackbarConfig
          );
        }
      });
  }

  getAnsweredQuestions(): Question[] {
    return this.questions.filter((question) => question.answered);
  }
}
