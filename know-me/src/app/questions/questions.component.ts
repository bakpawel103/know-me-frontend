import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../game-card/game-card.component';
import { Deck } from '../game-deck/game-deck.component';
import { DeckService } from '../services/deck.service';
import { QuestionService } from '../services/question.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  deck: Deck = {} as Deck;

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
    private deckService: DeckService,
    private snackBar: MatSnackBar,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigate(['/sign-in']);
      return;
    }

    let deckId = this.route.snapshot.queryParams['secret_id'];
    if (deckId != undefined && deckId != null) {
      this.deckService.getDeckBySecretId(deckId).subscribe((response) => {
        this.deck = response as Deck;
        this.deck.questions = this.deck.questions.sort((a, b) => a.id - b.id);
      });
    }
  }

  cardClicked(index: number): void {
    const question = this.deck.questions[index];

    if (question.answered === false) {
      question.answered = true;
    } else if (question.answered === true) {
      question.answered = false;
    }

    this.questionService
      .updateQuestion(question.id, question)
      .subscribe((response) => {
        setTimeout(() => {
          this.deck.questions[index] = response;
          this.deck.questions = this.deck.questions.sort((a, b) => a.id - b.id);
        }, 400);

        if (
          this.deck.questions.filter((question) => question.answered).length ==
          this.deck.questions.length
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
    if (this.deck == undefined || this.deck.questions == undefined) {
      return [];
    }

    return this.deck.questions.filter((question) => question.answered);
  }
}
